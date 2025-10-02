'use client';

import { useEffect, useRef } from 'react';

export default function TelegramBotInitializer() {
  const initializationAttempted = useRef(false);

  useEffect(() => {
    const initializeBot = async () => {
      // Предотвращаем множественные попытки инициализации
      if (initializationAttempted.current) {
        return;
      }
      
      initializationAttempted.current = true;

      try {
        console.log('Запуск инициализации Telegram бота...');
        const initResponse = await fetch('/api/bot-init', {
          method: 'POST',
        });
        
        if (initResponse.ok) {
          const result = await initResponse.json();
          console.log('Telegram бот успешно инициализирован:', result);
        } else {
          console.error('Ошибка при инициализации бота');
          initializationAttempted.current = false; // Разрешаем повторную попытку при ошибке
        }
      } catch (error) {
        console.error('Ошибка при инициализации бота:', error);
        initializationAttempted.current = false; // Разрешаем повторную попытку при ошибке
      }
    };

    // Инициализируем бота при загрузке компонента
    initializeBot();
  }, []);

  return null; // Компонент не рендерит ничего видимого
}