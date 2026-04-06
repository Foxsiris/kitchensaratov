# Документация для разработчиков

Руководство по локальной разработке, тестам и развёртыванию монорепозитория **kitchensaratov**: React (CRA) + Express API + PostgreSQL (Prisma).

Подробный контракт API, модель данных и советы по изменениям — в **[AGENTS.md](../AGENTS.md)** (в т.ч. для ИИ-ассистентов; разделы про каталог и Prisma полезны всем).

---

## Требования

- **Node.js 20** (как в Docker-образах).
- **npm** (lock-файлы: `package-lock.json` в корне и в `server/`).
- **Docker Desktop** (или аналог) — для `docker compose`, если разрабатываете «как на сервере».
- **PostgreSQL 16+** — если поднимаете БД без Docker.

---

## Структура репозитория

| Путь | Назначение |
|------|------------|
| `src/` | Фронтенд: страницы, компоненты, `context/`, `config/api.js` |
| `public/` | Статика CRA |
| `server/` | API: `src/index.js`, `src/routes/`, Prisma |
| `server/prisma/` | `schema.prisma`, миграции, `seed.js` |
| `deploy/nginx.conf` | Nginx: SPA + прокси `/api/` |
| `Dockerfile` | Сборка фронта + nginx |
| `server/Dockerfile` | Сборка API (в образе — тесты, миграции, seed, старт) |
| `docker-compose.yml` | Сервисы `db`, `api`, `web` |
| `.github/workflows/deploy.yml` | Push в `main`: проверки (тесты, сборка фронта, тесты API) и деплой на сервер по SSH |

---

## Установка зависимостей

```bash
# корень — фронтенд
npm ci

# API
cd server
npm ci
cd ..
```

---

## Переменные окружения

Шаблон — **[.env.example](../.env.example)** в корне (для Docker Compose и подсказок по локальной БД).

Для **локального API** в каталоге `server/` удобно иметь свой `.env` с `DATABASE_URL` и `JWT_SECRET` (см. `.env.example` в `server/`, если есть, или комментарии в корневом `.env.example`).

Для **фронта без Docker** в корне обычно достаточно дефолтов; при необходимости задайте `REACT_APP_API_URL` (см. `src/config/api.js`): пустое значение — относительные запросы к `/api` (как за nginx).

---

## Локальная разработка (без Docker)

1. Поднимите PostgreSQL и создайте БД; пропишите `DATABASE_URL` для Prisma.
2. **API** (терминал 1):

   ```bash
   cd server
   npx prisma migrate deploy
   npx prisma db seed   # при необходимости начальных данных
   node src/index.js    # порт 4000 по умолчанию
   ```

3. **Фронт** (терминал 2, из корня репозитория):

   ```bash
   npm start
   ```

   В `package.json` задан `"proxy": "http://localhost:4000"` — запросы с CRA на `/api` уходят на локальный API.

Админка: `/admin`, вход паролем из `ADMIN_PASSWORD` (после seed).

---

## Docker Compose

Из **корня** репозитория:

```bash
cp .env.example .env
# отредактируйте POSTGRES_PASSWORD, JWT_SECRET, при необходимости ADMIN_PASSWORD

docker compose up -d --build
```

- Сайт: `http://localhost:${HTTP_PORT:-8080}`.
- API с браузера — через тот же origin: `/api/...`.
- Postgres на хост: `127.0.0.1:${POSTGRES_PORT:-15432}` (см. `docker-compose.yml`).

Проверка: `GET /api/health`, `GET /api/catalog`.

---

## Изображения в каталоге

Загруженные из админки файлы хранятся в таблице **`stored_images`** (байты в PostgreSQL). В полях вроде `image_url` у категории/товара или `logo_url` у производителя сохраняется путь **`/api/media/<uuid>`**; публичная выдача — **`GET /api/media/:id`** без JWT. Внешние URL (`https://...`) по-прежнему допустимы. Загрузка: **`POST /api/admin/upload`** (поле `file`), только для авторизованного админа.

## База данных и Prisma

- Схема: `server/prisma/schema.prisma`.
- Миграции: `server/prisma/migrations/`.
- Seed: `server/prisma/seed.js` (каталог из данных при пустой БД, первый админ).

Команды из каталога **`server/`** (нужен корректный `DATABASE_URL`):

```bash
npx prisma validate
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run db:studio    # Prisma Studio
```

Подробности подключения Studio к контейнеру БД — в **AGENTS.md** (раздел «Просмотр БД»).

---

## Тесты

**Фронт** (корень):

```bash
npm run test:ci
```

Интерактивно: `npm test`. В CI используется `CI=true` и отключён watch.

**Сервер** (`server/`):

```bash
npm test
```

Стек: Vitest + Supertest. Тесты: `server/src/**/*.test.js`.

При **сборке Docker-образов** тесты также выполняются (см. корневой `Dockerfile` и `server/Dockerfile`).

---

## CI / деплой

Файл **[.github/workflows/deploy.yml](../.github/workflows/deploy.yml)** запускается при **push в `main`**:

- job **check**: `npm ci` → тесты фронта (`test:ci`) → сборка фронта (`build`) → в `server/`: `npm ci` → `prisma generate` → `npm test`;
- job **deploy** (после успеха **check**): SSH → каталог **`~/kitchensaratov`** → `git pull` → `docker compose up -d --build`.

Секреты в GitHub Actions: **`SERVER_HOST`**, **`SERVER_USER`**, **`SERVER_SSH_KEY`** (приватный ключ). На сервере репозиторий должен лежать в `~/kitchensaratov` (или поправьте путь в `deploy.yml`).

---

## Сборка продакшена

```bash
npm run build
```

Артефакт — `build/`. В Docker фронт собирается внутри образа nginx (см. `Dockerfile`).

---

## Соглашения по коду

- Стиль и паттерны — как в существующих файлах: **styled-components**, контексты React, минимальный дифф под задачу.
- Провайдеры в `App.js`: **`AuthProvider` снаружи `CatalogProvider`** (каталог использует JWT).
- Изменения схемы БД — только через **Prisma + миграции**.
- Публичный формат каталога и slug-идентификаторы — не ломать без синхронного обновления роутов и админки (см. AGENTS.md).
- Страница **KitchenDetail** опирается на **локальные демо-данные**, не на `CatalogContext` — не смешивать с карточкой товара по API (`/product/:id`).

---

## Где смотреть код

| Задача | Файлы |
|--------|--------|
| Маршруты SPA | `src/App.js` |
| Каталог, админские запросы | `src/context/CatalogContext.js` |
| База URL API | `src/config/api.js` |
| Вход в админку | `src/pages/Admin/AdminLogin.js`, `server/src/routes/auth.js` |
| Админ CRUD каталога | `server/src/routes/admin.js` |
| Публичный каталог | `server/src/routes/public.js` |
| Формат ответа каталога | `server/src/lib/catalogFormat.js`, `catalogQueries.js` |

---

## Дополнительно

- **Смена пароля админа** в уже развёрнутом окружении:  
  `docker compose exec api node scripts/set-admin-password.mjs <новый_пароль>`
- Вопросы по контракту REST и полям JSON — **AGENTS.md**.
