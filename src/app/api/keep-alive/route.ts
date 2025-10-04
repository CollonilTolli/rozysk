import { NextRequest, NextResponse } from 'next/server';
import { getTelegramBot, isBotInitialized, initializeTelegramBot } from '@/lib/telegram-bot';

export async function GET(request: NextRequest) {
  try {
    console.log('Keep-alive: поддержание активности сервера...');
    
    // Проверяем состояние бота
    const bot = getTelegramBot();
    const isInitialized = isBotInitialized();
    
    // Если бот не инициализирован, инициализируем его
    if (!bot || !isInitialized) {
      console.log('Keep-alive: инициализация бота...');
      const newBot = initializeTelegramBot();
      
      return NextResponse.json({
        status: 'active',
        message: 'Сервер активен, бот инициализирован',
        timestamp: new Date().toISOString(),
        botInitialized: !!newBot,
        action: 'bot_initialized'
      });
    }

    return NextResponse.json({
      status: 'active',
      message: 'Сервер активен, бот работает',
      timestamp: new Date().toISOString(),
      botInitialized: true,
      action: 'none'
    });
  } catch (error) {
    console.error('Keep-alive: ошибка:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Ошибка keep-alive',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Обработка POST запросов
export async function POST(request: NextRequest) {
  return GET(request);
}