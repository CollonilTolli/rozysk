# Настройка внешних Cron сервисов для реинициализации бота

⚠️ **ВАЖНО**: Перед настройкой cron jobs убедитесь, что отключена **Deployment Protection** в настройках Vercel, иначе внешние сервисы не смогут получить доступ к API endpoints.

## Настройка Vercel (Обязательно!)

### Шаг 0: Отключение Deployment Protection
1. Зайдите в https://vercel.com/dashboard
2. Выберите проект `rozysk`
3. Перейдите в **Settings** → **Deployment Protection**
4. **Отключите** "Vercel Authentication" или настройте "Bypass for Automation"
5. Сохраните изменения

**Без этого шага cron jobs не будут работать!**

Поскольку Vercel Hobby план ограничивает cron jobs до ежедневного выполнения, для реинициализации бота каждые 3 часа можно использовать внешние сервисы.

## 1. Cron-job.org (Бесплатный) - Подробная инструкция

### Шаг 1: Регистрация
1. Перейдите на https://cron-job.org
2. Нажмите "Sign up" в правом верхнем углу
3. Заполните форму регистрации (email, пароль)
4. Подтвердите email адрес

### Шаг 2: Создание cron jobs для реинициализации бота (каждые 3 часа)

# Настройка внешних Cron сервисов для реинициализации бота

⚠️ **ВАЖНО**: Перед настройкой cron jobs убедитесь, что отключена **Deployment Protection** в настройках Vercel, иначе внешние сервисы не смогут получить доступ к API endpoints.

## Настройка Vercel (Обязательно!)

### Шаг 0: Отключение Deployment Protection
1. Зайдите в https://vercel.com/dashboard
2. Выберите проект `rozysk`
3. Перейдите в **Settings** → **Deployment Protection**
4. **Отключите** "Vercel Authentication" или настройте "Bypass for Automation"
5. Сохраните изменения

**Без этого шага cron jobs не будут работать!**

Поскольку Vercel Hobby план ограничивает cron jobs до ежедневного выполнения, для реинициализации бота каждые 3 часа можно использовать внешние сервисы.

## 1. Cron-job.org (Бесплатный) - Подробная инструкция

### Шаг 1: Регистрация
1. Перейдите на https://cron-job.org
2. Нажмите "Sign up" в правом верхнем углу
3. Заполните форму регистрации (email, пароль)
4. Подтвердите email адрес

### Шаг 2: Создание cron jobs для реинициализации бота (каждые 3 часа)

**Базовые настройки для всех задач:**
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Request method**: GET
- **Request timeout**: 30 seconds

**Заголовки (Headers) для всех задач:**
```
Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit
```

**Создайте 8 отдельных cron jobs:**

#### Задача 1: 00:00 UTC
- **Title**: "Bot Reinit 00:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 0 * * *`
- **Timezone**: UTC

#### Задача 2: 03:00 UTC
- **Title**: "Bot Reinit 03:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 3 * * *`
- **Timezone**: UTC

#### Задача 3: 06:00 UTC
- **Title**: "Bot Reinit 06:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 6 * * *`
- **Timezone**: UTC

#### Задача 4: 09:00 UTC
- **Title**: "Bot Reinit 09:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 9 * * *`
- **Timezone**: UTC

#### Задача 5: 12:00 UTC
- **Title**: "Bot Reinit 12:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 12 * * *`
- **Timezone**: UTC

#### Задача 6: 15:00 UTC
- **Title**: "Bot Reinit 15:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 15 * * *`
- **Timezone**: UTC

#### Задача 7: 18:00 UTC
- **Title**: "Bot Reinit 18:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 18 * * *`
- **Timezone**: UTC

#### Задача 8: 21:00 UTC
- **Title**: "Bot Reinit 21:00"
- **URL**: `https://www.розыск-мвд.рус/api/cron/reinit-bot`
- **Schedule**: `0 21 * * *`
- **Timezone**: UTC

### Шаг 3: Настройка Health Check (каждые 10 минут)

#### Health Check задача:
- **Title**: "Bot Health Check"
- **URL**: `https://www.розыск-мвд.рус/api/health-check`
- **Schedule**: `*/10 * * * *`
- **Request method**: GET
- **Request timeout**: 30 seconds
- **Timezone**: UTC

**Заголовки не требуются** (health-check endpoint публичный)

### Шаг 4: Настройка Keep Alive (каждые 5 минут)

#### Keep Alive задача:
- **Title**: "Server Keep Alive"
- **URL**: `https://www.розыск-мвд.рус/api/keep-alive`
- **Schedule**: `*/5 * * * *`
- **Request method**: GET
- **Request timeout**: 30 seconds
- **Timezone**: UTC

**Заголовки не требуются** (keep-alive endpoint публичный)

### Шаг 5: Проверка и активация

1. После создания всех задач, проверьте их в панели управления
2. Убедитесь, что все задачи имеют статус "Active"
3. Проверьте логи выполнения через несколько минут

### Тестирование endpoints:

**Проверьте доступность через браузер:**
- Health Check: https://www.розыск-мвд.рус/api/health-check
- Keep Alive: https://www.розыск-мвд.рус/api/keep-alive

**Если видите страницу аутентификации Vercel - отключите Deployment Protection!**

### Ожидаемые ответы от endpoints:

#### Успешная реинициализация (`/api/cron/reinit-bot`):
```json
{
  "success": true,
  "message": "Telegram бот успешно реинициализирован (ежедневная задача)",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "botInfo": { ... }
}
```

#### Health Check (`/api/health-check`):
```json
{
  "status": "healthy",
  "message": "Бот работает нормально",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "action": "none"
}
```

#### Keep Alive (`/api/keep-alive`):
```json
{
  "status": "active",
  "message": "Сервер активен, бот работает",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "botInitialized": true
}
```

## 2. EasyCron (Бесплатный план - 20 задач)

### Настройка:
1. Зайдите на https://www.easycron.com
2. Зарегистрируйтесь
3. Создайте cron jobs с теми же параметрами, что и для cron-job.org

## 3. UptimeRobot (Бесплатный мониторинг)

### Настройка HTTP мониторинга:
1. Зайдите на https://uptimerobot.com
2. Создайте новый монитор:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://www.розыск-мвд.рус/api/health-check`
   - **Monitoring Interval**: 5 minutes
   - **Monitor Timeout**: 30 seconds

## 4. Альтернативное решение: GitHub Actions

Создайте файл `.github/workflows/bot-maintenance.yml`:

```yaml
name: Bot Maintenance
on:
  schedule:
    - cron: '0 */3 * * *'  # Каждые 3 часа
    - cron: '*/10 * * * *' # Health check каждые 10 минут
  workflow_dispatch:

jobs:
  reinit-bot:
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 */3 * * *'
    steps:
      - name: Reinitialize Bot
        run: |
          curl -X GET \
            -H "Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit" \
            https://www.розыск-мвд.рус/api/cron/reinit-bot

  health-check:
    runs-on: ubuntu-latest
    if: github.event.schedule == '*/10 * * * *'
    steps:
      - name: Health Check
        run: |
          curl -X GET \
            https://www.розыск-мвд.рус/api/health-check
```

## 5. Устранение неполадок

### Проблема: "Authentication Required" или модалка с ошибкой
**Решение**: Отключите Deployment Protection в настройках Vercel проекта.

### Проблема: 401 Unauthorized для /api/cron/reinit-bot
**Решение**: Проверьте правильность заголовка Authorization.

### Проблема: Timeout или 500 ошибка
**Решение**: Проверьте логи Vercel и статус бота через /api/health-check.

## 6. Безопасность

⚠️ **Важно**: Endpoint `/api/cron/reinit-bot` защищен секретным ключом:
```
Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit
```

Endpoints `/api/health-check` и `/api/keep-alive` публичные и не требуют авторизации.

## 7. Рекомендуемая конфигурация

Для максимальной надежности рекомендуется использовать:
1. **Отключить Deployment Protection** в Vercel
2. **Cron-job.org**: 8 задач реинициализации каждые 3 часа
3. **UptimeRobot**: Мониторинг health-check каждые 5 минут
4. **Встроенная система**: Автоматическая реинициализация при ошибках

Это обеспечит работу бота 24/7 с тройной защитой от сбоев!
- **Request method**: GET
- **Request timeout**: 30 seconds

**Заголовки (Headers) для всех задач:**
```
Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit
```

**Создайте 8 отдельных cron jobs:**

#### Задача 1: 00:00 UTC
- **Title**: "Bot Reinit 00:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 0 * * *`
- **Timezone**: UTC

#### Задача 2: 03:00 UTC
- **Title**: "Bot Reinit 03:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 3 * * *`
- **Timezone**: UTC

#### Задача 3: 06:00 UTC
- **Title**: "Bot Reinit 06:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 6 * * *`
- **Timezone**: UTC

#### Задача 4: 09:00 UTC
- **Title**: "Bot Reinit 09:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 9 * * *`
- **Timezone**: UTC

#### Задача 5: 12:00 UTC
- **Title**: "Bot Reinit 12:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 12 * * *`
- **Timezone**: UTC

#### Задача 6: 15:00 UTC
- **Title**: "Bot Reinit 15:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 15 * * *`
- **Timezone**: UTC

#### Задача 7: 18:00 UTC
- **Title**: "Bot Reinit 18:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 18 * * *`
- **Timezone**: UTC

#### Задача 8: 21:00 UTC
- **Title**: "Bot Reinit 21:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 21 * * *`
- **Timezone**: UTC

### Шаг 3: Настройка Health Check (каждые 10 минут)

#### Health Check задача:
- **Title**: "Bot Health Check"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check`
- **Schedule**: `*/10 * * * *`
- **Request method**: GET
- **Request timeout**: 30 seconds
- **Timezone**: UTC

**Заголовки не требуются** (health-check endpoint публичный)

### Шаг 4: Настройка Keep Alive (каждые 5 минут)

#### Keep Alive задача:
- **Title**: "Server Keep Alive"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/keep-alive`
- **Schedule**: `*/5 * * * *`
- **Request method**: GET
- **Request timeout**: 30 seconds
- **Timezone**: UTC

**Заголовки не требуются** (keep-alive endpoint публичный)

### Шаг 5: Проверка и активация

1. После создания всех задач, проверьте их в панели управления
2. Убедитесь, что все задачи имеют статус "Active"
3. Проверьте логи выполнения через несколько минут

### Тестирование endpoints:

**Проверьте доступность через браузер:**
- Health Check: https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check
- Keep Alive: https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/keep-alive

**Если видите страницу аутентификации Vercel - отключите Deployment Protection!**

### Ожидаемые ответы от endpoints:

#### Успешная реинициализация (`/api/cron/reinit-bot`):
```json
{
  "success": true,
  "message": "Telegram бот успешно реинициализирован (ежедневная задача)",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "botInfo": { ... }
}
```

#### Health Check (`/api/health-check`):
```json
{
  "status": "healthy",
  "message": "Бот работает нормально",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "action": "none"
}
```

#### Keep Alive (`/api/keep-alive`):
```json
{
  "status": "active",
  "message": "Сервер активен, бот работает",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "botInitialized": true
}
```

## 2. EasyCron (Бесплатный план - 20 задач)

### Настройка:
1. Зайдите на https://www.easycron.com
2. Зарегистрируйтесь
3. Создайте cron jobs с теми же параметрами, что и для cron-job.org

## 3. UptimeRobot (Бесплатный мониторинг)

### Настройка HTTP мониторинга:
1. Зайдите на https://uptimerobot.com
2. Создайте новый монитор:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check`
   - **Monitoring Interval**: 5 minutes
   - **Monitor Timeout**: 30 seconds

## 4. Альтернативное решение: GitHub Actions

Создайте файл `.github/workflows/bot-maintenance.yml`:

```yaml
name: Bot Maintenance
on:
  schedule:
    - cron: '0 */3 * * *'  # Каждые 3 часа
    - cron: '*/10 * * * *' # Health check каждые 10 минут
  workflow_dispatch:

jobs:
  reinit-bot:
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 */3 * * *'
    steps:
      - name: Reinitialize Bot
        run: |
          curl -X GET \
            -H "Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit" \
            https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot

  health-check:
    runs-on: ubuntu-latest
    if: github.event.schedule == '*/10 * * * *'
    steps:
      - name: Health Check
        run: |
          curl -X GET \
            https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check
```

## 5. Устранение неполадок

### Проблема: "Authentication Required" или модалка с ошибкой
**Решение**: Отключите Deployment Protection в настройках Vercel проекта.

### Проблема: 401 Unauthorized для /api/cron/reinit-bot
**Решение**: Проверьте правильность заголовка Authorization.

### Проблема: Timeout или 500 ошибка
**Решение**: Проверьте логи Vercel и статус бота через /api/health-check.

## 6. Безопасность

⚠️ **Важно**: Endpoint `/api/cron/reinit-bot` защищен секретным ключом:
```
Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit
```

Endpoints `/api/health-check` и `/api/keep-alive` публичные и не требуют авторизации.

## 7. Рекомендуемая конфигурация

Для максимальной надежности рекомендуется использовать:
1. **Отключить Deployment Protection** в Vercel
2. **Cron-job.org**: 8 задач реинициализации каждые 3 часа
3. **UptimeRobot**: Мониторинг health-check каждые 5 минут
4. **Встроенная система**: Автоматическая реинициализация при ошибках

Это обеспечит работу бота 24/7 с тройной защитой от сбоев!

## 1. Cron-job.org (Бесплатный) - Подробная инструкция

### Шаг 1: Регистрация
1. Перейдите на https://cron-job.org
2. Нажмите "Sign up" в правом верхнем углу
3. Заполните форму регистрации (email, пароль)
4. Подтвердите email адрес

### Шаг 2: Создание cron jobs для реинициализации бота (каждые 3 часа)

**Базовые настройки для всех задач:**
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Request method**: GET
- **Request timeout**: 30 seconds

**Заголовки (Headers) для всех задач:**
```
Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit
```

**Создайте 8 отдельных cron jobs:**

#### Задача 1: 00:00 UTC
- **Title**: "Bot Reinit 00:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 0 * * *`
- **Timezone**: UTC

#### Задача 2: 03:00 UTC
- **Title**: "Bot Reinit 03:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 3 * * *`
- **Timezone**: UTC

#### Задача 3: 06:00 UTC
- **Title**: "Bot Reinit 06:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 6 * * *`
- **Timezone**: UTC

#### Задача 4: 09:00 UTC
- **Title**: "Bot Reinit 09:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 9 * * *`
- **Timezone**: UTC

#### Задача 5: 12:00 UTC
- **Title**: "Bot Reinit 12:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 12 * * *`
- **Timezone**: UTC

#### Задача 6: 15:00 UTC
- **Title**: "Bot Reinit 15:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 15 * * *`
- **Timezone**: UTC

#### Задача 7: 18:00 UTC
- **Title**: "Bot Reinit 18:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 18 * * *`
- **Timezone**: UTC

#### Задача 8: 21:00 UTC
- **Title**: "Bot Reinit 21:00"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot`
- **Schedule**: `0 21 * * *`
- **Timezone**: UTC

### Шаг 3: Настройка Health Check (каждые 10 минут)

#### Health Check задача:
- **Title**: "Bot Health Check"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check`
- **Schedule**: `*/10 * * * *`
- **Request method**: GET
- **Request timeout**: 30 seconds
- **Timezone**: UTC

**Заголовки не требуются** (health-check endpoint публичный)

### Шаг 4: Настройка Keep Alive (каждые 5 минут)

#### Keep Alive задача:
- **Title**: "Server Keep Alive"
- **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/keep-alive`
- **Schedule**: `*/5 * * * *`
- **Request method**: GET
- **Request timeout**: 30 seconds
- **Timezone**: UTC

**Заголовки не требуются** (keep-alive endpoint публичный)

### Шаг 5: Проверка и активация

1. После создания всех задач, проверьте их в панели управления
2. Убедитесь, что все задачи имеют статус "Active"
3. Проверьте логи выполнения через несколько минут

### Ожидаемые ответы от endpoints:

#### Успешная реинициализация (`/api/cron/reinit-bot`):
```json
{
  "success": true,
  "message": "Telegram бот успешно реинициализирован (ежедневная задача)",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "botInfo": { ... }
}
```

#### Health Check (`/api/health-check`):
```json
{
  "status": "healthy",
  "message": "Бот работает нормально",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "action": "none"
}
```

#### Keep Alive (`/api/keep-alive`):
```json
{
  "status": "active",
  "message": "Сервер активен, бот работает",
  "timestamp": "2025-10-04T06:48:46.000Z",
  "botInitialized": true
}
```

## 2. EasyCron (Бесплатный план - 20 задач)

### Настройка:
1. Зайдите на https://www.easycron.com
2. Зарегистрируйтесь
3. Создайте cron jobs с теми же параметрами, что и для cron-job.org

## 3. UptimeRobot (Бесплатный мониторинг)

### Настройка HTTP мониторинга:
1. Зайдите на https://uptimerobot.com
2. Создайте новый монитор:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check`
   - **Monitoring Interval**: 5 minutes
   - **Monitor Timeout**: 30 seconds

## 4. Альтернативное решение: GitHub Actions

Создайте файл `.github/workflows/bot-maintenance.yml`:

```yaml
name: Bot Maintenance
on:
  schedule:
    - cron: '0 */3 * * *'  # Каждые 3 часа
    - cron: '*/10 * * * *' # Health check каждые 10 минут
  workflow_dispatch:

jobs:
  reinit-bot:
    runs-on: ubuntu-latest
    if: github.event.schedule == '0 */3 * * *'
    steps:
      - name: Reinitialize Bot
        run: |
          curl -X GET \
            -H "Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit" \
            https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/cron/reinit-bot

  health-check:
    runs-on: ubuntu-latest
    if: github.event.schedule == '*/10 * * * *'
    steps:
      - name: Health Check
        run: |
          curl -X GET \
            https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check
```

## 5. Мониторинг и логирование

### Проверка работы через браузер:
- Health Check: https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/health-check
- Keep Alive: https://rozysk-kl4pq3nl3-colloniltollis-projects.vercel.app/api/keep-alive

### Логи Vercel:
Проверяйте логи выполнения в панели Vercel для отслеживания работы endpoints.

## 6. Безопасность

⚠️ **Важно**: Endpoint `/api/cron/reinit-bot` защищен секретным ключом:
```
Authorization: Bearer cron_secret_key_12345_telegram_bot_reinit
```

Endpoints `/api/health-check` и `/api/keep-alive` публичные и не требуют авторизации.

## 7. Рекомендуемая конфигурация

Для максимальной надежности рекомендуется использовать:
1. **Cron-job.org**: 8 задач реинициализации каждые 3 часа
2. **UptimeRobot**: Мониторинг health-check каждые 5 минут
3. **Встроенная система**: Автоматическая реинициализация при ошибках

Это обеспечит работу бота 24/7 с тройной защитой от сбоев!