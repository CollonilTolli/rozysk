import { NextRequest, NextResponse } from 'next/server';
import { initializeTelegramBot, getBotInfo, isBotInitialized } from '@/lib/telegram-bot';

export async function POST() {
  try {
    console.log('Запуск инициализации Telegram бота...');
    
    const bot = initializeTelegramBot();
    
    if (!bot) {
      return NextResponse.json({ 
        error: 'Не удалось инициализировать бота. Проверьте TELEGRAM_BOT_TOKEN в .env.local' 
      }, { status: 500 });
    }

    // Получаем информацию о боте
    const botInfo = await getBotInfo();
    
    return NextResponse.json({
      success: true,
      message: 'Telegram бот инициализирован успешно',
      botInfo,
      isInitialized: isBotInitialized()
    });
  } catch (error) {
    console.error('Ошибка при инициализации бота:', error);
    return NextResponse.json({ 
      error: 'Ошибка при инициализации бота',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const botInfo = await getBotInfo();
    
    return NextResponse.json({
      isInitialized: isBotInitialized(),
      botInfo,
      status: isBotInitialized() ? 'Бот активен' : 'Бот не инициализирован'
    });
  } catch (error) {
    console.error('Ошибка при получении статуса бота:', error);
    return NextResponse.json({ 
      error: 'Ошибка при получении статуса бота',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}