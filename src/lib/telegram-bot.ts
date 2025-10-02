import TelegramBot from "node-telegram-bot-api";

let bot: TelegramBot | null = null;
let isInitialized = false;
// let webhookUrl: string | null = null;
// let isPollingActive = false;

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const WEBHOOK_URL = process.env.NEXTAUTH_URL
  ? `${process.env.NEXTAUTH_URL}/api/telegram`
  : "http://localhost:3000/api/telegram";
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

// Предустановленные ответы на ключевые слова
const responses: { [key: string]: string } = {
  занавеска: '',
  кружка: "Посмотри в окно и прочитай вслух",
  клавиатура:
    "под твоим балконом, на улице лежит папка. Забери и поймёшь что делать.",
  смысл:
    "https://www.youtube.com/shorts/TucTUJRsLKE \nСмысл жизни - найти смысл жизни, и не забывать о том, что жизнь - это не просто работа, а увлечение. Собирайся, тебе в парк победы. (Обязательно возьми костюм)",
  колонка: "Клюй зерно, оно приведёт тебя к следующей подсказке!",
  зерно: "Пока ты клевал, ты разбил клюв. Тебе стоит обратиться к ветеринару.",
  уголь:
    "Ветеринар тебе помог, теперь ты можешь клевать зерно. Не понятно нахуя оно тебе, но дальше тебе на соминку.",
};
const phrases = [
  "Мимо, блядь",
  "Не, нихуя",
  "Не угадал, долбоёб",
  "Опять в жопу пальцем",
  "Хуй там плавал",
  "Промах, ебана мать",
  "Да ты ебобо?",
  "Не судьба, нахуй",
  "Обосрался",
  "Эх, хуита вышла",
  "Хуйня какая-то",
  "Не тот ответ, епта",
  "Фиаско, братан",
  "Иди нахуй",
  "Опять хуйня",
  "Да ты ахуел?",
  "Не канает, чепушила",
  "Пошёл нахуй отсюда",
  "Серьёзно? Пиздец",
  "Ты долбоёб?",
  "Ну ты и лох",
  "Еблан, не то",
  "Соси хуй",
  "Обломись нахуй",
  "Мимо кассы, уёбок",
  "Пшик, нахуй",
  "Не ебу, но не так",
  "Провал, ебаный",
  "Промахнулся, хуле",
  "Да ты рофлишь?",
  "Хуй с маслом, не то",
  "Да блять нет",
  "Ты уёбок или где?",
  "Снова пиздец",
  "Не подходит, мудила",
  "Хуйня собачья",
  "Опять нет, долбоёб",
  "Промазал, бля",
  "В молоко хуйнул",
  "Не то пальто, сука",
  "Ебать ты кривой",
  "Ни хуя",
  "Да ну нахуй",
  "Пошёл на хуй с этой хуйнёй",
  "Серьёзно, блядь?",
  "Ты чё, ебанутый?",
  "Хуй угадал",
  "Мечтай, долбоёб",
  "Фальстарт нахуй",
  "Да ты просто конч",
  "Ну ты и пидор",
  "Соси залупу",
  "Не угадал, еблан",
  "Далеко, долбоёб",
  "Да ты обосрался",
  "Нетушки, мудозвон",
  "Печаль, ебаная",
  "Лохопидр",
  "Ты вообще дурак?",
  "В жопу себе засунь",
  "Опять хуёво",
  "Нихуя подобного",
  "Да хуй там",
  "Ты чё, дебил?",
  "Нет, хуйло",
  "Серьёзно? Нет нахуй",
  "Ну ты уёбище",
  "Обкакался",
  "Да неее, хуйню городишь",
  "Ты ебанутый? Точно",
  "Нет нахуй",
  "Промах, чепухан",
  "В пролёте, пидр",
  "Нихуя не совпало",
  "Опять обосрался",
  "Да ты инвалид угадываний",
  "Лошара ёбаная",
  "Нет, иди нахуй",
  "Совсем не то, еблан",
  "Ну и хуйню сказал",
  "Пиздец ты долбоёб",
  "Нихуя не верно",
  "Да пошёл ты нахуй",
  "Не подходит, мудень",
  "Ты чё, хуета?",
  "Опять мимо, епта",
  "Ноль очков, хули",
  "Обосрался по полной",
  "Ты в курсе, что ты уебан?",
  "Да ну нахуй, не так",
  "Ты сука лох",
  "Неа, епта",
  "Пиздец как мимо",
  "Ебать ты долбоёб",
  "Нихуя себе хуйню сказал",
  "Нет, чушка",
  "Хуй угадал, мудила",
  "Опять обосрался, пидор",
  "Мимо, хуйня",
];

const TARGET_USER_ID = 454007782;
const TARGET_CHAT_ID = -4775187700;
function getRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}
export function initializeTelegramBot() {
  if (!BOT_TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN не найден в переменных окружения");
    return null;
  }

  // Предотвращаем множественную инициализацию
  if (isInitialized && bot) {
    console.log("Бот уже инициализирован");
    return bot;
  }

  try {
    console.log("Инициализация Telegram бота...");

    // Останавливаем предыдущий экземпляр если он существует
    if (bot) {
      try {
        bot?.stopPolling();
        console.log("Предыдущий экземпляр бота остановлен");
      } catch (e) {
        console.log("Ошибка при остановке предыдущего экземпляра:", e);
      }
    }

    if (IS_DEVELOPMENT) {
      // В режиме разработки используем polling вместо webhook
      console.log("Режим разработки: используем polling");
      bot = new TelegramBot(BOT_TOKEN, { polling: true });

      // Настраиваем обработчики сообщений для polling режима
      setupMessageHandlers();

      // Удаляем webhook если он был установлен
      bot?.deleteWebHook().catch((err) => {
        console.log(
          "Webhook не был установлен или ошибка при удалении:",
          err.message
        );
      });
    } else {
      // В продакшене используем webhook
      console.log("Продакшен режим: используем webhook");
      bot = new TelegramBot(BOT_TOKEN, { polling: false });
      setupWebhook();
    }

    isInitialized = true;
    // isPollingActive = IS_DEVELOPMENT;
    console.log("Telegram бот инициализирован успешно");

    return bot;
  } catch (error) {
    console.error("Ошибка при инициализации Telegram бота:", error);
    isInitialized = false;
    // isPollingActive = false;
    return null;
  }
}

async function setupWebhook() {
  if (!bot) return;

  try {
    // Проверяем текущий webhook
    const webhookInfo = await bot?.getWebHookInfo();

    if (webhookInfo.url !== WEBHOOK_URL) {
      console.log(`Устанавливаем webhook: ${WEBHOOK_URL}`);

      // Удаляем старый webhook если есть
      if (webhookInfo.url) {
        await bot?.deleteWebHook();
      }

      // Устанавливаем новый webhook
      const result = await bot?.setWebHook(WEBHOOK_URL);

      if (result) {
        console.log("Webhook установлен успешно");
      } else {
        console.error("Не удалось установить webhook");
      }
    } else {
      console.log("Webhook уже установлен правильно");
    }
  } catch (error) {
    console.error("Ошибка при настройке webhook:", error);
  }
}

export function getTelegramBot() {
  return bot;
}

export function isBotInitialized() {
  return isInitialized;
}

// Функция для принудительной переинициализации
export function reinitializeTelegramBot() {
  isInitialized = false;
  bot = null;
  return initializeTelegramBot();
}

// Настройка обработчиков сообщений для polling режима
function setupMessageHandlers() {
  if (!bot) return;

  console.log("Настройка обработчиков сообщений...");

  // Обработчик всех сообщений
  bot?.on("message", async (msg) => {
    try {
      const chatId = msg.chat.id;
      const userId = msg.from?.id;
      const text = msg.text?.toLowerCase() || "";

      console.log(`Получено сообщение от ${userId}: ${text}`);

      // Пересылка сообщений от целевого пользователя
      if (userId === TARGET_USER_ID) {
        await bot?.forwardMessage(TARGET_CHAT_ID, chatId, msg.message_id);
      }

      // Обработка команд
      if (text.startsWith("/start")) {
        // Проверяем наличие deep-link параметра
        const startMatch = text.match(/\/start\s+(.+)/);
        const deepLinkParam = startMatch ? startMatch[1] : null;

        if (deepLinkParam === "dognal") {
          await bot?.sendMessage(
            chatId,
            "Молодец! Ты прошёл квест! Пароль unlock123"
          );
        } else {
          await bot?.sendMessage(
            chatId,
            "Дарова, Илюшка. Тебе на стрим https://www.twitch.tv/kedrovka69"
          );
        }
        return;
      }
     if (text.toLowerCase().includes("занавеска")) {
        // Отправка фото (пример - Москва, Красная площадь)
        await bot?.sendPhoto(chatId, "https://sun9-77.userapi.com/impg/c639118/v639118748/408ae/ZwBM3GPytgQ.jpg?size=520x0&quality=95&sign=77cc406790178a3642a8a1e450b77155");
        await bot?.sendMessage(chatId, "Хуя ты дурак, зачем Мишаню заебал?");
        return;
      }
      if (text.toLowerCase().includes("смысл")) {
        // Отправка координат (пример - Москва, Красная площадь)
        await bot?.sendLocation(chatId, 55.7539, 37.6208);
        await bot?.sendMessage(
          chatId,
          "Смысл жизни - найти смысл жизни, и не забывать о том, что жизнь - это не просто работа, а увлечение. Собирайся, тебе в парк победы. (Обязательно возьми костюм)"
        );
        return;
      }

      // Поиск ключевых слов и отправка соответствующих ответов
      let responseFound = false;
      for (const [keyword, response] of Object.entries(responses)) {
        if (text.toLowerCase().includes(keyword)) {
          await bot?.sendMessage(chatId, response);
          responseFound = true;
          break;
        }
      }

      // Если не найден подходящий ответ
      if (!responseFound && text) {
        await bot?.sendMessage(chatId, getRandomPhrase());
      }
    } catch (error) {
      console.error("Ошибка при обработке сообщения:", error);
    }
  });

  console.log("Обработчики сообщений настроены");
}

// Функция для получения информации о боте
export async function getBotInfo() {
  if (!bot) {
    return null;
  }

  try {
    const me = await bot?.getMe();
    const webhookInfo = await bot?.getWebHookInfo();

    return {
      bot: me,
      webhook: webhookInfo,
      isInitialized,
      webhookUrl: WEBHOOK_URL,
      mode: IS_DEVELOPMENT ? "polling" : "webhook",
    };
  } catch (error) {
    console.error("Ошибка при получении информации о боте:", error);
    return null;
  }
}
