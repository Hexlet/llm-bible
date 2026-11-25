import { defineConfig, type DefaultTheme } from 'vitepress'
import { mermaidMarkdown } from '@mokevnin/vitepress-mermaid/markdown'

// Пока в разделах только страницы-оглавления. Главы добавляются в items своего раздела.
const guideSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Оглавление руководства', link: '/guide/' },
  { text: 'Основы', link: '/basics/' },
  {
    text: 'Устройство моделей',
    collapsed: false,
    items: [
      { text: 'Токены, внимание, генерация', link: '/models/' },
      { text: 'Рассуждение', link: '/reasoning/' },
      { text: 'Агенты: как они устроены', link: '/agent-basics/' },
      { text: 'Токены и экономика', link: '/tokens/' },
      { text: 'Выбор модели и где смотреть', link: '/choosing/' },
    ],
  },
  { text: 'Постановка задач и работа с моделью', link: '/prompting/' },
  { text: 'Информация, исследования и данные', link: '/information/' },
  { text: 'Создание материалов', link: '/creation/' },
  { text: 'Качество и оценка результата', link: '/quality/' },
  { text: 'Данные, безопасность и право', link: '/safety/' },
  { text: 'Ассистенты и расширения', link: '/assistants/' },
  {
    text: 'Ветки',
    collapsed: false,
    items: [
      { text: 'Автоматизация', link: '/automation/' },
      { text: 'Агенты на практике', link: '/agents/' },
      { text: 'Вайбкодинг', link: '/vibecoding/' },
    ],
  },
  { text: 'Внедрение в работе и команде', link: '/adoption/' },
  { text: 'Сценарии по профессиям', link: '/roles/' },
]

const toolsSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Все инструменты', link: '/tools/' },
]

const techniquesSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Каталог приёмов', link: '/techniques/' },
]

const resourcesSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Глоссарий', link: '/glossary' },
]

const base = '/'
// Полный адрес сайта: из него собираются sitemap, canonical и ссылки для превью в соцсетях.
const siteUrl = `https://llm.hexlet.io${base}`
const siteTitle = 'LLM Bible'
const siteDescription = 'Практическое руководство по работе с LLM'

export default defineConfig({
  lang: 'ru-RU',
  title: siteTitle,
  description: siteDescription,
  base,
  cleanUrls: true,
  // Рабочие подборки источников для авторов, а не страницы для читателей. Ссылки в них проверяет rumdl.
  srcExclude: ['research/**'],
  lastUpdated: true,

  sitemap: { hostname: siteUrl },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:locale', content: 'ru_RU' }],
    ['meta', { property: 'og:image', content: `${siteUrl}images/og-cover.jpg` }],
    ['meta', { property: 'og:image:width', content: '960' }],
    ['meta', { property: 'og:image:height', content: '960' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
  ],

  // Теги, которые зависят от страницы, по рецепту из документации VitePress (transformPageData).
  transformPageData(pageData) {
    const url = siteUrl + pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const title = pageData.title || siteTitle
    const description = pageData.description || siteDescription
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
    )
  },

  markdown: {
    // Блоки ```mermaid превращаются в компонент темы, который рисует диаграмму в браузере.
    config(md) {
      md.use(mermaidMarkdown)
    },
  },

  themeConfig: {
    nav: [
      {
        text: 'Руководство',
        link: '/guide/',
        activeMatch:
          '^/(guide|basics|models|reasoning|agent-basics|tokens|choosing|prompting|information|creation|assistants|automation|agents|vibecoding|quality|safety|adoption|roles)/',
      },
      { text: 'Инструменты', link: '/tools/', activeMatch: '^/tools/' },
      { text: 'Приёмы', link: '/techniques/', activeMatch: '^/techniques/' },
      { text: 'Глоссарий', link: '/glossary', activeMatch: '^/glossary' },
    ],

    sidebar: {
      '/tools/': toolsSidebar,
      '/techniques/': techniquesSidebar,
      '/glossary': resourcesSidebar,
      '/': guideSidebar,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Hexlet/llm-bible' },
    ],

    editLink: {
      pattern: 'https://github.com/Hexlet/llm-bible/edit/main/docs/:path',
      text: 'Предложить правку',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
          modal: {
            noResultsText: 'Ничего не найдено',
            resetButtonTitle: 'Сбросить',
            footer: { selectText: 'выбрать', navigateText: 'перейти', closeText: 'закрыть' },
          },
        },
      },
    },

    outline: { level: [2, 3], label: 'На этой странице' },
    docFooter: { prev: 'Назад', next: 'Дальше' },
    lastUpdated: { text: 'Обновлено' },
    darkModeSwitchLabel: 'Тема',
    lightModeSwitchTitle: 'Светлая тема',
    darkModeSwitchTitle: 'Тёмная тема',
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Наверх',
    notFound: {
      title: 'Страница не найдена',
      quote: 'Возможно, её переместили или ещё не написали.',
      linkText: 'На главную',
    },
  },
})
