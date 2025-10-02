import { NextRequest, NextResponse } from 'next/server';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

// Конфигурация для больших файлов
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 минут

export async function POST(request: NextRequest) {
  try {
    console.log('Получен запрос на потоковую загрузку большого файла');
    
    // Получаем имя файла из заголовков
    const filename = request.headers.get('x-filename');
    if (!filename) {
      return NextResponse.json(
        { error: 'Не указано имя файла в заголовке x-filename' },
        { status: 400 }
      );
    }

    // Проверяем, что это exe файл
    if (!filename.endsWith('.exe')) {
      return NextResponse.json(
        { error: 'Разрешены только .exe файлы' },
        { status: 400 }
      );
    }

    console.log(`Начинаем потоковую загрузку файла: ${filename}`);

    // Определяем путь для сохранения в public
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, filename);

    // Создаем директорию public если она не существует
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // Создаем поток для записи файла
    const writeStream = createWriteStream(filePath);
    
    // Получаем тело запроса как поток
    if (!request.body) {
      return NextResponse.json(
        { error: 'Тело запроса пустое' },
        { status: 400 }
      );
    }

    // Конвертируем ReadableStream в Node.js Readable stream
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeStream = Readable.fromWeb(request.body as any);
    
    let totalBytes = 0;
    
    // Отслеживаем прогресс загрузки
    nodeStream.on('data', (chunk) => {
      totalBytes += chunk.length;
      if (totalBytes % (50 * 1024 * 1024) === 0) { // Логируем каждые 50MB
        console.log(`Загружено: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
      }
    });

    // Используем pipeline для потоковой передачи данных
    await pipeline(nodeStream, writeStream);
    
    console.log(`Файл успешно сохранен: ${filename}, размер: ${totalBytes} байт`);

    // Возвращаем успешный ответ
    return NextResponse.json({
      message: 'Файл успешно загружен',
      filename: filename,
      size: totalBytes,
      url: `/${filename}`,
      path: filePath
    });

  } catch (error) {
    console.error('Ошибка при потоковой загрузке файла:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера при загрузке файла' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API эндпоинт для потоковой загрузки больших exe файлов',
    method: 'POST',
    headers: {
      'x-filename': 'Имя файла (обязательно)',
      'content-type': 'application/octet-stream'
    },
    maxSize: 'Без ограничений (потоковая загрузка)',
    allowedExtensions: ['.exe']
  });
}