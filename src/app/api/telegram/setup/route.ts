import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';

export async function POST(request: NextRequest) {
  try {
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Bot token not configured' }, { status: 400 });
    }

    const bot = new TelegramBot(BOT_TOKEN);
    const { webhookUrl } = await request.json();

    if (!webhookUrl) {
      return NextResponse.json({ error: 'Webhook URL is required' }, { status: 400 });
    }

    // Устанавливаем webhook
    const result = await bot.setWebHook(webhookUrl);
    
    if (result) {
      return NextResponse.json({ 
        success: true, 
        message: 'Webhook установлен успешно',
        webhookUrl 
      });
    } else {
      return NextResponse.json({ 
        error: 'Не удалось установить webhook' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Setup webhook error:', error);
    return NextResponse.json({ 
      error: 'Ошибка при установке webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Bot token not configured' }, { status: 400 });
    }

    const bot = new TelegramBot(BOT_TOKEN);
    const webhookInfo = await bot.getWebHookInfo();
    
    return NextResponse.json({
      webhookInfo,
      status: webhookInfo.url ? 'Webhook активен' : 'Webhook не установлен'
    });
  } catch (error) {
    console.error('Get webhook info error:', error);
    return NextResponse.json({ 
      error: 'Ошибка при получении информации о webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (!BOT_TOKEN) {
      return NextResponse.json({ error: 'Bot token not configured' }, { status: 400 });
    }

    const bot = new TelegramBot(BOT_TOKEN);
    const result = await bot.deleteWebHook();
    
    if (result) {
      return NextResponse.json({ 
        success: true, 
        message: 'Webhook удален успешно' 
      });
    } else {
      return NextResponse.json({ 
        error: 'Не удалось удалить webhook' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Delete webhook error:', error);
    return NextResponse.json({ 
      error: 'Ошибка при удалении webhook',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}