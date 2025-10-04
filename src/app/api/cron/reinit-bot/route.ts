import { NextRequest, NextResponse } from 'next/server';
import { reinitializeTelegramBot, getBotInfo } from '@/lib/telegram-bot';

export async function GET(request: NextRequest) {
  try {
    // Проверяем заголовок авторизации для безопасности
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
    
    if (!process.env.CRON_SECRET || authHeader !== expectedAuth) {
      console.log('Неавторизованная попытка доступа к cron endpoint');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Запуск ежедневной реинициализации Telegram бота...');
    
    // Получаем информацию о текущем состоянии бота
    const currentBotInfo = await getBotInfo();
    console.log('Текущее состояние бота:', currentBotInfo);

    // Принудительно реинициализируем бота
    const bot = reinitializeTelegramBot();
    
    if (bot) {
      // Получаем новую информацию о боте
      const newBotInfo = await getBotInfo();
      console.log('Бот успешно реинициализирован');
      
      return NextResponse.json({
        success: true,
        message: 'Telegram бот успешно реинициализирован (ежедневная задача)',
        timestamp: new Date().toISOString(),
        botInfo: newBotInfo
      });
    } else {
      console.error('Не удалось реинициализировать бота');
      return NextResponse.json({
        success: false,
        message: 'Не удалось реинициализировать бота',
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Ошибка при реинициализации бота:', error);
    return NextResponse.json({
      success: false,
      message: 'Ошибка при реинициализации бота',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Обработка POST запросов (альтернативный метод)
export async function POST(request: NextRequest) {
  return GET(request);
}