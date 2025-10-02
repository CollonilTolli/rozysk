const fs = require('fs');
const path = require('path');

// URL для загрузки (локальный сервер)
const deploymentUrl = 'https://www.xn----dtbgjpnkpl3h.xn--p1acf';

async function uploadLargeFile(filePath, filename) {
  try {
    console.log(`🔄 Начинаем загрузку ${filename} (размер: ${(fs.statSync(filePath).size / 1024 / 1024 / 1024).toFixed(2)} GB)...`);
    
    // Создаем поток для чтения файла
    const fileStream = fs.createReadStream(filePath);
    
    console.log(`📤 Отправляем файл ${filename} на сервер потоком...`);
    
    // Отправляем файл как поток с заголовком имени файла
     const response = await fetch(`${deploymentUrl}/api/upload-large`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/octet-stream',
         'x-filename': filename
       },
       body: fileStream,
       duplex: 'half', // Требуется для потоковой передачи
       // Увеличиваем таймаут до 10 минут
       signal: AbortSignal.timeout(10 * 60 * 1000)
     });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Файл ${filename} успешно загружен!`);
    console.log(`📁 Сохранен как: ${result.url}`);
    console.log(`📊 Размер: ${(result.size / 1024 / 1024).toFixed(2)} MB`);
    
    return result;
  } catch (error) {
    console.error(`❌ Ошибка загрузки ${filename}:`, error);
    throw error;
  }
}

async function uploadAllLargeFiles() {
  console.log('🚀 Начинаем загрузку больших файлов на локальный сервер...');
  console.log('🔧 Убедитесь, что сервер запущен на http://localhost:3000\n');

  const publicDir = path.join(__dirname, 'public');
  
  // Ищем только тестовый файл для проверки
  const testFiles = ['ROZYSK-Setup.exe'];
  
  for (const filename of testFiles) {
    const filePath = path.join(publicDir, filename);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeInGB = (stats.size / (1024 * 1024 * 1024)).toFixed(2);
      console.log(`📁 Найден файл: ${filename} (${sizeInGB} GB)`);
      
      try {
        const result = await uploadLargeFile(filePath, filename);
        console.log(`✅ ${filename} успешно загружен:`, result);
      } catch (error) {
        console.error(`❌ Ошибка загрузки ${filename}:`, error.message);
      }
      
      console.log(''); // Пустая строка для разделения
    } else {
      console.log(`⚠️ Файл ${filename} не найден в папке public`);
    }
  }
  
  console.log('🎉 Процесс загрузки завершен!');
}

// Запускаем загрузку
uploadAllLargeFiles().catch(console.error);