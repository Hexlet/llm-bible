import { defineConfig, type DefaultTheme } from 'vitepress'
import { mermaidMarkdown } from '@mokevnin/vitepress-mermaid/markdown'

// Пока в разделах только страницы-оглавления. Главы добавляются в items своего раздела.
const guideSidebar: DefaultTheme.SidebarItem[] = [
  { text: 'Оглавление руководства', link: '/guide/' },
  { text: 'Основы', link: '/basics/' },
  { text: 'Постановка задач и работа с моделью', link: '/prompting/' },
  { text: 'Информация, исследования и данные', link: '/information/' },
  { text: 'Создание материалов', link: '/creation/' },
  { text: 'Ассистенты и персонализация', link: '/assistants/' },
  { text: 'Автоматизация', link: '/automation/' },
  { text: 'Агенты', link: '/agents/' },
  { text: 'Вайбкодинг', link: '/vibecoding/' },
  { text: 'Качество и оценка результата', link: '/quality/' },
  { text: 'Данные, безопасность и право', link: '/safety/' },
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

const base = '/llm-bible/'
// Полный адрес сайта: из него собираются sitemap, canonical и ссылки для превью в соцсетях.
const siteUrl = `https://mokevnin.github.io${base}`
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

  // robots.txt не добавляем: на github.io поисковики читают его только из корня домена, а не из /llm-bible/.
  sitemap: { hostname: siteUrl },

  // og:image не задан: обложки для превью пока нет.
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:locale', content: 'ru_RU' }],
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
          '^/(guide|basics|prompting|information|creation|assistants|automation|agents|vibecoding|quality|safety|adoption|roles)/',
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
      { icon: 'github', link: 'https://github.com/mokevnin/llm-bible' },
    ],

    editLink: {
      pattern: 'https://github.com/mokevnin/llm-bible/edit/main/docs/:path',
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
