# Документация для агентов (ИИ / автоматизация)

Этот файл задаёт контекст репозитория **kitchensaratov**: архитектуру, соглашения и типичные задачи. Его имеет смысл читать перед правками кода.

## Назначение проекта

Витрина мебели (кухни и смежный каталог) на React и отдельный **REST API** на Node.js с **PostgreSQL** (Prisma). Админка управляет каталогом; публичный сайт читает данные через API.

## Структура репозитория

| Путь | Роль |
|------|------|
| `src/` | Create React App: страницы, компоненты, `context/`, `config/api.js` |
| `server/` | Express API, `prisma/` (схема и миграции), `src/routes/` |
| `public/` | Статика CRA |
| `deploy/nginx.conf` | Конфиг nginx: SPA + прокси `/api/` → контейнер API |
| `Dockerfile` | Сборка фронта и nginx |
| `server/Dockerfile` | API: `ENTRYPOINT` через `sh -c` (migrate → seed → node), без отдельного `.sh` (устойчиво к CRLF на Windows) |
| `docker-compose.yml` | Сервисы `db`, `api`, `web` |
| `.env.example` | Шаблон переменных окружения |

## Стек

- **Фронт:** React 19, react-router-dom 7, styled-components, framer-motion; прокси в dev: `package.json` → `"proxy": "http://localhost:4000"`.
- **Бэкенд:** Node 20, Express, Prisma, JWT (админ), bcrypt (пароли админов).
- **БД:** PostgreSQL 16 (в Docker).

## Запуск

### Docker (как на сервере)

1. Скопировать `.env.example` в `.env`, задать как минимум `POSTGRES_PASSWORD`, `JWT_SECRET`, при необходимости `ADMIN_PASSWORD`.
2. `docker compose up -d --build`
3. Сайт: порт из `HTTP_PORT` (по умолчанию **8080**). API доступен с браузера только через nginx по пути **`/api/...`** (тот же origin).

Проверка с хоста (PowerShell): `Invoke-RestMethod http://localhost:8080/api/health` → `ok: true`; `Invoke-RestMethod http://localhost:8080/api/catalog` → массив категорий. Состояние контейнеров: `docker compose ps`; логи API: `docker compose logs api --tail 50`.

После `docker compose up` Postgres доступен на **`127.0.0.1:${POSTGRES_PORT:-15432}`** (см. `docker-compose.yml`), пользователь/БД/пароль — как в `.env` (`POSTGRES_*`).

### Просмотр БД

1. **Prisma Studio** (удобно под текущую схему): в каталоге `server/` задать `DATABASE_URL` на хостовый порт (пароль — как в `POSTGRES_PASSWORD`), затем `npm run db:studio` или `npx prisma studio` (браузер, обычно http://localhost:5555).

   Строка подключения (пример): `postgresql://kitchensaratov:ВАШ_ПАРОЛЬ@127.0.0.1:15432/kitchensaratov?schema=public`

   - **PowerShell:** `$env:DATABASE_URL = "postgresql://..."` затем `npm run db:studio` из `server/`.
   - **cmd.exe:** `set "DATABASE_URL=postgresql://..."` затем `cd server` и `npm run db:studio`. Синтаксис `$env:...` в cmd не работает.
   - Проще: скопировать `server/.env.example` → `server/.env`, подставить пароль из корневого `POSTGRES_PASSWORD`, затем из `server/` выполнить `npm run db:studio` (переменную вручную не задавать).

   Если Studio пишет **`Can't reach database server at 127.0.0.1:15432`**:
   1. Убедитесь, что Docker запущен и контейнер БД работает: `docker compose ps` (у `db` статус `Up`, в колонке **PORTS** должно быть `127.0.0.1:15432->5432/tcp`). Если порта нет — файл `docker-compose.yml` меняли после первого запуска: выполните **`docker compose up -d --force-recreate db`** (или `docker compose up -d`), чтобы применить проброс порта.
   2. Порт и пароль в `DATABASE_URL` должны совпадать с `POSTGRES_PORT` (по умолчанию 15432) и `POSTGRES_PASSWORD` в корневом `.env`.

2. **Только терминал**, без Studio:  
   `docker compose exec db psql -U kitchensaratov -d kitchensaratov`  
   (пароль из `POSTGRES_PASSWORD`).

3. **DBeaver / TablePlus / DataGrip**: подключение PostgreSQL к `127.0.0.1`, порт из `POSTGRES_PORT` (по умолчанию 15432), БД `kitchensaratov`, пользователь и пароль из `.env`.

### Локальная разработка без Docker

1. Поднять PostgreSQL, задать `DATABASE_URL` для Prisma (см. `.env.example`).
2. В каталоге `server`: `npm ci`, `npx prisma migrate deploy`, при пустой БД — `npx prisma db seed`, затем `node src/index.js` (порт **4000**).
3. В корне репозитория: `npm start` (CRA). Запросы на `/api/...` уходят на прокси → API.

База URL API на фронте: `src/config/api.js` — `REACT_APP_API_URL` (в Docker-сборке обычно пусто, используется относительный `/api`).

## Контексты React (важно для порядка провайдеров)

В `App.js`: **`AuthProvider` оборачивает `CatalogProvider`**. Каталог подставляет JWT для `GET /api/admin/catalog` и при 401 сбрасывает сессию.

- `AuthContext`: `login`/`logout`, токен в `sessionStorage`.
- `CatalogContext`: загрузка дерева каталога, CRUD через админ-эндпоинты; поля `loading`, `error`.

## Контракт API для фронтенда (каталог)

Ответы каталога строятся в **`server/src/lib/catalogFormat.js`**.

- У **категории** в JSON поле **`id` — это `slug` категории** (например `kitchens`), не UUID. Маршруты админки `/admin/categories/:id` рассчитывают на это.
- У **бренда** и **подкатегории** в JSON **`id` — витринный slug** внутри родителя.
- У **товара** **`id` = `publicId`** (URL `/product/:id`).
- При наличии глобальной сущности бренда добавляются поля **`entitySlug`**, **`entityName`**, опционально **`entityLogo`**, **`entityWebsite`**.
- В карточке товара (`GET /api/products/:publicId`) дополнительно могут быть **`categories`** (M:N с категориями, с флагом `isPrimary`) и **`images`** (массив URL галереи, если кроме обложки есть ещё файлы).

Публичные маршруты API (без JWT):

- `GET /api/health`
- `GET /api/catalog`
- `GET /api/products/:publicId`

Авторизация админа: `POST /api/auth/login` с телом `{ "password": "..." }` → `{ token }`. Пароль задаётся **`ADMIN_PASSWORD`** при **первом** создании записи в `admin_users` (seed). Переменная **`REACT_APP_ADMIN_PASSWORD`** не используется. Сменить пароль без пересоздания БД:  
`docker compose exec api node scripts/set-admin-password.mjs <новый_пароль>`

Админские маршруты: префикс **`/api/admin/`**, заголовок `Authorization: Bearer <token>`.

В путях вида `/api/admin/categories/:categoryId` параметр **`categoryId` — slug категории**, не UUID.

Справочник глобальных брендов:

- `GET /api/admin/brand-entities`
- `PATCH /api/admin/brand-entities/:slug`

## Модель данных (кратко)

См. `server/prisma/schema.prisma`.

- **Category:** PK UUID, уникальный **`slug`**; опционально **`parentId`** для дерева (по умолчанию плоский каталог).
- **BrandEntity:** канонический производитель, уникальный **`slug`**; лого, сайт, описание.
- **CategoryDisplayGroup:** витринная группа внутри категории (в JSON каталога по-прежнему уровень «бренд»); FK на категорию; опционально **`brandEntityId`**; уникальность `(categoryId, slug)`. Служебная группа **`slug === 'default'`** без `BrandEntity`.
- **DisplayGroupSection:** секция внутри группы (в JSON — «подкатегория»); уникальность `(displayGroupId, slug)`.
- **Product:** центр модели; **`publicId`** глобально уникален; FK **`sectionId`** на секцию; опционально **`brandEntityId`** (денормализация); **`specs`** — JSON; галерея — **`ProductImage`**.
- **ProductCategory:** M:N товар ↔ категория; ровно одна строка с **`isPrimary: true`** на товар (частичный уникальный индекс в БД).
- Таблицы в Postgres: `category_display_groups`, `display_group_sections` (миграция переименовывает бывшие `brands` / `subcategories`).

Миграции лежат в `server/prisma/migrations/`. Цепочка `init` → `brand_entities` → `product_centric_catalog` обновляет существующую БД без потери строк (переименование таблиц + заполнение `product_categories` / `product_images`).

## Сиды

`server/prisma/seed.js`: при пустом каталоге подтягивает дерево из `src/data/catalogData.js` (или копии в образе `server/seed/catalogData.js`). Админ создаётся, если нет пользователей.

## Рекомендации агентам при изменениях

1. **Не менять смысл полей `id` в JSON каталога** без синхронного обновления маршрутов и админки (slug категории, slug бренда/подкатегории, `publicId` товара).
2. **Правки API** — в `server/src/routes/`, общая логика формата ответа — в `catalogFormat.js` / `catalogQueries.js`.
3. **Схема БД** — только через Prisma + миграции; не править продакшен-данные скриптами без явного запроса.
4. **Секреты** не коммитить; для примера использовать `.env.example`.
5. Сохранять стиль существующего кода (styled-components, структура страниц, минимальный объём диффа под задачу).
6. Страница **`KitchenDetail`** использует **локальные демо-данные**, не `CatalogContext` — при задачах про каталог не путать с `/product/:id` и каталогом.

## Полезные команды

```bash
# Фронт
npm start
npm run build
npm test

# API (из server/)
npm ci
npx prisma validate
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
node src/index.js
```

## Файлы для быстрого входа в задачу

- Маршруты приложения: `src/App.js`
- Каталог и API с фронта: `src/context/CatalogContext.js`, `src/config/api.js`
- Админ-вход: `src/pages/Admin/AdminLogin.js`, `server/src/routes/auth.js`
- Админ CRUD каталога: `server/src/routes/admin.js`
- Публичный каталог: `server/src/routes/public.js`
