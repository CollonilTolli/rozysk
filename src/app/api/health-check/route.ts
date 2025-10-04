import { NextRequest, NextResponse } from 'next/server';
import { getTelegramBot, getBotInfo, reinitializeTelegramBot, isBotInitialized } from '@/lib/telegram-bot';

export async function GET(request: NextRequest) {
  try {
    console.log('Health check: проверка состояния Telegram бота...');
    
    const bot = getTelegramBot();
    const isInitialized = isBotInitialized();
    
    // Если бот не инициализирован, пытаемся его инициализировать
    if (!bot || !isInitialized) {
      console.log('Health check: бот не инициализирован, запускаем реинициализацию...');
      const newBot = reinitializeTelegramBot();
      
      if (newBot) {
        const botInfo = await getBotInfo();
        return NextResponse.json({
          status: 'healthy',
          message: 'Бот был реинициализирован',
          timestamp: new Date().toISOString(),
          botInfo,
          action: 'reinitialized'
        });
      } else {
        return NextResponse.json({
          status: 'unhealthy',
          message: 'Не удалось инициализировать бота',
          timestamp: new Date().toISOString(),
          action: 'failed_initialization'
        }, { status: 500 });
      }
    }

    // Проверяем состояние бота
    try {
      const botInfo = await getBotInfo();
      
      if (botInfo && botInfo.bot) {
        return NextResponse.json({
          status: 'healthy',
          message: 'Бот работает нормально',
          timestamp: new Date().toISOString(),
          botInfo,
          action: 'none'
        });
      } else {
        // Если не удается получить информацию о боте, реинициализируем
        console.log('Health check: не удается получить информацию о боте, реинициализируем...');
        const newBot = reinitializeTelegramBot();
        
        if (newBot) {
          const newBotInfo = await getBotInfo();
          return NextResponse.json({
            status: 'healthy',
            message: 'Бот был реинициализирован из-за проблем с получением информации',
            timestamp: new Date().toISOString(),
            botInfo: newBotInfo,
            action: 'reinitialized_due_to_info_failure'
          });
        } else {
          return NextResponse.json({
            status: 'unhealthy',
            message: 'Не удалось реинициализировать бота',
            timestamp: new Date().toISOString(),
            action: 'failed_reinitialization'
          }, { status: 500 });
        }
      }
    } catch (error) {
      console.error('Health check: ошибка при проверке состояния бота:', error);
      
      // При ошибке пытаемся реинициализировать бота
      const newBot = reinitializeTelegramBot();
      
      if (newBot) {
        const newBotInfo = await getBotInfo();
        return NextResponse.json({
          status: 'healthy',
          message: 'Бот был реинициализирован из-за ошибки',
          timestamp: new Date().toISOString(),
          botInfo: newBotInfo,
          action: 'reinitialized_due_to_error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } else {
        return NextResponse.json({
          status: 'unhealthy',
          message: 'Критическая ошибка: не удалось реинициализировать бота',
          timestamp: new Date().toISOString(),
          action: 'critical_failure',
          error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
      }
    }
  } catch (error) {
    console.error('Health check: критическая ошибка:', error);
    return NextResponse.json({
      status: 'unhealthy',
      message: 'Критическая ошибка health check',
      timestamp: new Date().toISOString(),
      action: 'critical_error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Обработка POST запросов
export async function POST(request: NextRequest) {
  return GET(request);
}