# Руководство по настройке React проекта

## Необходимые компоненты

Перед началом работы убедитесь, что у вас установлено:

- [Node.js](https://nodejs.org/) (версия 16.x или новее)
- [Git](https://git-scm.com/)
- (Опционально) [Yarn](https://yarnpkg.com/), если предпочитаете его вместо npm

## Начало работы

### 1. Клонирование репозитория

```bash
git clone https://github.com/Yerassylzh/FlashMath
cd FlashMath
cd frontend
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Установка зависимостей

## Создайте файл .env в корневой директории и поместите туда содержимое:

```env
VITE_API_KEY=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
VITE_API_BASE_URL=https://api.groq.com/openai/v1
```

### 4. Запуск сервера

```bash
npm run dev
```

## Сервер будет доступен по адресу localhost:3000
