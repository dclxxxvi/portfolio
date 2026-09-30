# Инженерные стандарты репозитория

## Стек (предлагаемый)

| Слой             | Выбор                                                   | Почему                                                                |
| ---------------- | ------------------------------------------------------- | --------------------------------------------------------------------- |
| Фреймворк        | **Next.js (App Router) + static export**                | Индустриальный стандарт, React, отличный DX и SEO, статическая сборка |
| Язык             | **TypeScript (strict)**                                 | Типизированный контент и компоненты                                   |
| Стили            | **Tailwind CSS**                                        | Быстрая вёрстка, единая дизайн-система через токены                   |
| Анимации         | **Framer Motion** (`motion`)                            | Анимации появления, hover-эффекты, раскрытие кейсов                   |
| 3D               | **React Three Fiber + drei** (Three.js)                 | Интерактивная 3D-сцена в Hero, ленивая загрузка                       |
| i18n             | Словари в `src/content/{ru,en}` + маршруты `/` и `/en/` | Работает со static export, без серверной части                        |
| Иконки           | **lucide-react** + инлайн-SVG для GitHub и Telegram     | В lucide больше нет брендовых иконок                                  |
| Качество         | ESLint, Prettier, `tsc --noEmit`                        | Единый стиль и отсутствие ошибок типов                                |
| Git-хуки         | Husky + lint-staged + commitlint                        | Линт перед коммитом, Conventional Commits                             |
| CI/CD            | GitHub Actions → GitHub Pages                           | Автопроверка и автодеплой                                             |
| Менеджер пакетов | pnpm                                                    | Быстрый, детерминированный lock-файл                                  |

> Выбран Next.js: React — основной стек владельца, поэтому репозиторий сам по себе работает как пример кода.

## Структура проекта

```
portfolio/
├── .github/workflows/     # CI: lint, typecheck, build, deploy
├── docs/                  # требования и стандарты (этот файл)
├── public/                # статика: favicon, og-image, resume.pdf, логотипы
├── src/
│   ├── app/               # layout, page, metadata, sitemap, robots
│   ├── components/
│   │   ├── sections/      # Hero, About, Skills, Experience, Projects, Contacts
│   │   └── ui/            # переиспользуемые примитивы: Button, Card, Badge, Section
│   ├── content/           # ВЕСЬ контент: types.ts (модель), ru.ts, en.ts, site.ts
│   ├── lib/               # утилиты, хуки
├── README.md
└── ...configs
```

Принцип: **компоненты не содержат захардкоженных текстов** — только рендерят данные из `src/content/`.

## Модель данных (черновик)

```ts
interface Experience {
  company: string;
  companyUrl?: string;
  logo?: string;
  role: string;
  period: { start: string; end?: string }; // "2022-03"
  location?: string;
  summary: string; // о продукте и зоне ответственности
  achievements: string[]; // с цифрами
  stack: string[];
  caseStudies: CaseStudy[]; // сложные задачи
}

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  result: string; // желательно измеримый
  stack?: string[];
}

interface Project {
  name: string;
  description: string;
  role?: string;
  stack: string[];
  links: { demo?: string; repo?: string };
  image?: string;
}
```

## Стиль кода

- `strict: true`, без `any` (кроме обоснованных случаев с комментарием).
- Функциональные компоненты, именованные экспорты, один компонент — один файл.
- Именование: компоненты `PascalCase`, файлы компонентов `PascalCase.tsx`, утилиты `camelCase.ts`.
- Импорты через алиас `@/`.
- Комментарии — только там, где код не объясняет «почему».

## Git

- Основная ветка — `main` (текущую `master` переименовать).
- Коммиты — [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`.
- История чистая и осмысленная: каждый коммит — законченный логический шаг.

### Что НЕ попадает в git

- Файлы Claude: `CLAUDE.md`, `CLAUDE.local.md`, `.claude/`
- IDE: `.idea/`, `.vscode/`
- ОС: `.DS_Store`, `Thumbs.db`
- Сборка и зависимости: `node_modules/`, `.next/`, `out/`, `dist/`
- Секреты: `.env*` (кроме `.env.example`)

## CI

На каждый push и PR:

1. `install` (с кешем)
2. `lint`
3. `typecheck`
4. `build`

На push в `main` — дополнительно деплой.

## README репозитория

- Название + одна строка о проекте
- Бейджи: CI-статус, деплой, стек
- Скриншот / GIF сайта
- Ссылка на живой сайт
- Стек и ключевые решения
- Запуск локально (`install`, `dev`, `build`)
- Структура проекта и где редактировать контент
- Лицензия (MIT для кода; контент — © владельца)

## Версии и совместимость

- **ESLint 9**, а не 10: `eslint-plugin-react` из `eslint-config-next` пока не работает с ESLint 10.
- **TypeScript 6.0**, а не 7: `typescript-eslint` поддерживает TypeScript до версии 6.1.
- `pnpm typecheck` сначала запускает `next typegen`, потому что `next-env.d.ts` генерируется и в git не хранится.
