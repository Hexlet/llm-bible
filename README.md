# LLM Bible

Практическое руководство по работе с большими языковыми моделями для специалистов без опыта программирования. Сайт собирается на [VitePress](https://vitepress.dev) и публикуется на GitHub Pages: <https://llm.hexlet.io/>.

## Структура

[План руководства](PLAN.md) задаёт охват. [Оглавление сайта](docs/guide/index.md) связывает тематические разделы. Руководство пишется: пока на сайте есть страницы разделов с планируемыми материалами и глоссарий.

[Исследования и источники](docs/research/README.md) — рабочие подборки для подготовки и правки глав и метод проверки утверждений. На сайт не публикуются.

- `docs/basics/`, `prompting/`, `information/`, `creation/`, `assistants/`, `automation/`, `agents/`, `vibecoding/`, `quality/`, `safety/`, `adoption/`, `roles/` — разделы руководства. Все пути находятся внутри `docs/`.
- `docs/tools/` — справочник инструментов.
- `docs/techniques/` — каталог приёмов.
- `docs/glossary.md` — термины.

## Локальный запуск

Нужен [mise](https://mise.jdx.dev): он ставит Node и линтеры тех же версий, что в CI.

```sh
mise install
mise run setup   # npm-зависимости и git-хуки
npm run dev
```

## Проверки

```sh
mise run check   # всё, что проверяет CI
mise run fix     # безопасные автоисправления
mise run links   # внешние ссылки
```

Git-хуки запускают быстрые проверки при коммите и полные при пуше.

## Как добавить страницу

1. Создайте `.md`-файл в нужном разделе внутри `docs/`.
2. Добавьте ссылку в соответствующий массив меню в `docs/.vitepress/config.mts`: `guideSidebar`, `toolsSidebar`, `techniquesSidebar` или `resourcesSidebar`.
3. Добавьте материал на страницу своего раздела и в оглавление `docs/guide/index.md`.
