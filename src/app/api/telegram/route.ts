import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';
import { getTelegramBot } from '@/lib/telegram-bot';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TARGET_USER_ID = 1078577340;
const TARGET_CHAT_ID = -4775187700;

// Предустановленные ответы на ключевые слова
const responses: { [key: string]: string } = {

};

export async function POST(request: NextRequest) {
  try {
    // Получаем экземпляр бота
    const bot = getTelegramBot();
    
    // Проверяем что бот инициализирован
    if (!bot) {
      console.error('Telegram bot не инициализирован');
      return NextResponse.json({ error: 'Bot not initialized' }, { status: 500 });
    }

    const body = await request.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userId = message.from.id;
    const text = message.text?.toLowerCase() || '';

    // Пересылка сообщений от целевого пользователя
    if (userId === TARGET_USER_ID) {
      await bot.forwardMessage(TARGET_CHAT_ID, chatId, message.message_id);
    }

    // Обработка команд
    if (text === '/start') {
      await bot.sendMessage(chatId, 'Дарова, Илюшка. Тебе на стрим https://www.twitch.tv/immoww');
      return NextResponse.json({ ok: true });
    }

    if (text === '/location' || text.includes('координаты')) {
      // Отправка координат (пример - Москва, Красная площадь)
      await bot.sendLocation(chatId, 55.7539, 37.6208);
      return NextResponse.json({ ok: true });
    }

    // Поиск ключевых слов и отправка соответствующих ответов
    let responseFound = false;
    for (const [keyword, response] of Object.entries(responses)) {
      if (text.includes(keyword)) {
        await bot.sendMessage(chatId, response);
        responseFound = true;
        break;
      }
    }

    // Если не найден подходящий ответ
    if (!responseFound && text) {
      await bot.sendMessage(chatId, 'Не, нихуя');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Telegram bot is running' });
}