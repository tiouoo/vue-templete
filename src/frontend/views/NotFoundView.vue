<template>
  <section class="not-found">
    <p class="code" aria-hidden="true">404</p>
    <h2>页面不存在</h2>
    <RouterLink :to="{ name: 'home' }">返回首页</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  display: grid;
  min-height: 100%;
  place-content: center;
  justify-items: center;
  gap: 12px;
  text-align: center;
}

.code {
  color: var(--accent);
  font-size: clamp(72px, 12vw, 120px);
  line-height: 1;
}

h2 {
  font-size: 22px;
}
</style>
