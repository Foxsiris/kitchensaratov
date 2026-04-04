# Kitchen Sarovatov

Витрина каталога кухонь и смежных товаров: **React** (Create React App) + **Node.js** API (**Express**, **Prisma**, **PostgreSQL**). Админка для управления каталогом; публичный сайт ходит в API.

## Документация

| Документ | Описание |
|----------|----------|
| **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** | Установка, локальная разработка, Docker, тесты, CI, структура проекта |
| **[AGENTS.md](AGENTS.md)** | Контракт API, модель данных, Prisma, типичные команды (удобно и людям, и автоматизации) |
| **[.env.example](.env.example)** | Переменные окружения для Compose и подсказки для локальной БД |

## Быстрый старт (Docker)

```bash
cp .env.example .env
# задайте POSTGRES_PASSWORD и JWT_SECRET

docker compose up -d --build
```

Откройте в браузере: **http://localhost:8080** (или порт из `HTTP_PORT` в `.env`). Проверка API: `GET http://localhost:8080/api/health`.

## Скрипты (корень репозитория)

| Команда | Назначение |
|---------|------------|
| `npm start` | Dev-сервер CRA (прокси `/api` → `localhost:4000`) |
| `npm run build` | Продакшен-сборка в `build/` |
| `npm test` | Jest в watch-режиме |
| `npm run test:ci` | Jest один прогон (для CI и Docker build) |

Скрипты API — в каталоге **`server/`** (`npm test`, `npm run db:studio`, Prisma — см. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)).

## Лицензия и CRA

Проект изначально создан через [Create React App](https://github.com/facebook/create-react-app). Дополнительная документация CRA: [CRA — Getting Started](https://facebook.github.io/create-react-app/docs/getting-started).
