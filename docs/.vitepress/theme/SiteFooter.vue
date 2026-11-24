<script setup lang="ts">
// Подвал главной: кто делает руководство, зачем и на чём основана экспертиза.
// На страницах глав сайдбар закреплён слева, и полноширинный подвал лёг бы под него, поэтому только главная.
import { useData } from 'vitepress'

const { frontmatter } = useData()
const hexletUrl = 'https://ru.hexlet.io/?utm_source=llm-bible&utm_medium=referral&utm_campaign=footer'
const year = new Date().getFullYear()
</script>

<template>
  <footer v-if="frontmatter.layout === 'home'" class="site-footer">
    <div class="container">
      <div class="columns">
        <section>
          <h2 class="heading">Кто мы</h2>
          <p>
            LLM Bible делает <a :href="hexletUrl" target="_blank" rel="noopener">Хекслет</a>, онлайн-школа программирования, аналитики и ИИ. Школа работает по образовательной лицензии, у неё больше 4500 выпускников.
          </p>
        </section>
        <section>
          <h2 class="heading">Зачем это руководство</h2>
          <p>
            Чтобы у специалистов были общие правила работы с языковыми моделями: как ставить задачи, проверять результат, автоматизировать рутину и не рисковать данными. Руководство открыто для всех.
          </p>
        </section>
        <section>
          <h2 class="heading">Как мы проверяем материал</h2>
          <p>
            Сведения о моделях, тарифах и функциях сервисов мы сверяем с официальной документацией и указываем дату проверки. Заявления о пользе подкрепляем исследованиями и разобранными примерами.
          </p>
        </section>
      </div>
      <p class="copyright">© {{ year }} Хекслет</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 48px 24px 32px;
  border-top: 1px solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg-alt);
}

@media (min-width: 640px) {
  .site-footer {
    padding: 48px 48px 32px;
  }
}

@media (min-width: 960px) {
  .site-footer {
    padding: 56px 64px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.columns {
  display: grid;
  gap: 32px;
}

@media (min-width: 960px) {
  .columns {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--vp-c-text-2);
}

a {
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}

a:hover {
  color: var(--vp-c-brand-2);
}

.copyright {
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
