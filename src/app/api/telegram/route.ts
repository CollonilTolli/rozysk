import { NextRequest, NextResponse } from 'next/server';
import { processWebhookUpdate } from '@/lib/telegram-bot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Получен webhook от Telegram:', JSON.stringify(body, null, 2));

    // Обрабатываем обновление через функцию из telegram-bot.ts
    const processed = await processWebhookUpdate(body);
    
    if (processed) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ ok: true, message: 'No message to process' });
    }
  } catch (error) {
    console.error('Ошибка при обработке webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Обработка GET запросов (для проверки работоспособности)
export async function GET() {
  return NextResponse.json({ 
    status: 'Telegram webhook endpoint is working',
    timestamp: new Date().toISOString()
  });
}