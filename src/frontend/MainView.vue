<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { appName } from '../config.js';
import { navigation } from './router.js';

const props = defineProps({ dark: Boolean });
defineEmits(['toggle-theme']);

const route = useRoute();
const themeLabel = computed(() => props.dark ? '切换浅色模式' : '切换深色模式');
</script>

<template>
  <div class="workspace">
    <aside class="sidebar">
      <RouterLink class="brand" :to="{ name: 'home' }">
        <img src="/favicon.svg" width="24" height="24" alt="" />
        <span>{{ appName }}</span>
      </RouterLink>
      <nav class="navigation" aria-label="主导航">
        <RouterLink v-for="page in navigation" :key="page.name" :to="{ name: page.name }">
          {{ page.title }}
        </RouterLink>
      </nav>
    </aside>

    <main class="workspace-content">
      <header class="content-header">
        <h1>{{ route.meta.title }}</h1>
        <button class="theme-button" type="button" :aria-label="themeLabel" :title="themeLabel" @click="$emit('toggle-theme')">
          <span class="theme-icon" :class="{ sun: dark }" aria-hidden="true" />
        </button>
      </header>
      <div class="page-viewport">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.workspace {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  min-height: 100vh;
  min-height: 100dvh;
}

.sidebar {
  padding: 16px 12px;
  border-inline-end: 1px solid var(--border);
  background: var(--surface);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin: 0 0 20px 8px;
  color: var(--text);
  font-size: 16px;
  text-decoration: none;
}

.navigation {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.navigation a {
  padding: 10px 12px;
  border-radius: 10px;
  color: var(--muted);
  text-decoration: none;
}

.navigation a:hover {
  background: var(--hover);
  color: var(--text);
}

.navigation a.router-link-exact-active {
  background: var(--selected);
  color: var(--accent);
}

.workspace-content {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.content-header {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 18px;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.content-header h1 {
  font-size: 18px;
  font-weight: 500;
}

.theme-button {
  display: grid;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--accent);
  cursor: pointer;
}

.theme-button:hover {
  background: var(--hover);
  color: var(--accent-hover);
}

.theme-icon {
  width: 18px;
  height: 18px;
  background: currentColor;
  mask: url("./assets/icons/moon.svg") center / contain no-repeat;
}

.theme-icon.sun {
  mask-image: url("./assets/icons/sun.svg");
}

.page-viewport {
  flex: 1;
  padding: clamp(16px, 3vw, 32px);
}

@media (max-width: 680px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }

  .sidebar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
    border-inline-end: 0;
    border-bottom: 1px solid var(--border);
  }

  .brand {
    margin: 0;
  }

  .navigation {
    flex-direction: row;
  }
}
</style>
