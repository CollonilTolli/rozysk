import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync, createWriteStream } from 'fs';
import path from 'path';

// Отключаем парсер тела запроса для обработки больших файлов
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 минут

export async function POST(request: NextRequest) {
  try {
    console.log('Получен запрос на загрузку файла');
    
    // Получаем Content-Type для проверки multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Требуется multipart/form-data' },
        { status: 400 }
      );
    }

    // Получаем данные из формы с увеличенным лимитом
    let formData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error('Ошибка парсинга FormData:', error);
      return NextResponse.json(
        { error: 'Ошибка обработки данных формы. Возможно, файл слишком большой.' },
        { status: 413 }
      );
    }
    
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      );
    }

    console.log(`Получен файл: ${file.name}, размер: ${file.size} байт`);

    // Проверяем, что это exe файл
    if (!file.name.endsWith('.exe')) {
      return NextResponse.json(
        { error: 'Разрешены только .exe файлы' },
        { status: 400 }
      );
    }

    // Проверяем размер файла (максимум 2GB)
    const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Файл слишком большой. Максимальный размер: 2GB' },
        { status: 400 }
      );
    }

    // Определяем путь для сохранения в public
    const publicDir = path.join(process.cwd(), 'public');
    const filePath = path.join(publicDir, file.name);

    // Создаем директорию public если она не существует
    if (!existsSync(publicDir)) {
      await mkdir(publicDir, { recursive: true });
    }

    console.log(`Сохраняем файл в: ${filePath}`);

    // Получаем буфер файла и сохраняем
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
      console.log(`Файл успешно сохранен: ${file.name}`);
    } catch (error) {
      console.error('Ошибка сохранения файла:', error);
      return NextResponse.json(
        { error: 'Ошибка сохранения файла' },
        { status: 500 }
      );
    }

    // Возвращаем успешный ответ
    return NextResponse.json({
      message: 'Файл успешно загружен',
      filename: file.name,
      size: file.size,
      url: `/${file.name}`,
      path: filePath
    });

  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API эндпоинт для загрузки exe файлов',
    method: 'POST',
    contentType: 'multipart/form-data',
    maxSize: '2GB',
    allowedExtensions: ['.exe']
  });
}