<script setup>
import { computed, ref } from "vue";
import { ConfigProvider, theme } from "ant-design-vue";
import { appName } from "../config.js";

const themeStorageKey = `${appName}:theme`;
let saved;
try {
  saved = localStorage.getItem(themeStorageKey);
} catch {}
const dark = ref(
  saved
    ? saved === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches,
);
function applyTheme() {
  document.documentElement.dataset.theme = dark.value ? "dark" : "light";
}
function toggleTheme() {
  dark.value = !dark.value;
  applyTheme();
  try {
    localStorage.setItem(themeStorageKey, dark.value ? "dark" : "light");
  } catch {}
}
applyTheme();
const config = computed(() => {
  const isDark = dark.value;
  const styles = getComputedStyle(document.documentElement);
  const color = (name) => styles.getPropertyValue(name).trim();
  const background = color('--background');
  const surface = color('--surface');
  const hover = color('--hover');
  const selected = color('--selected');
  const accent = color('--accent');
  const text = color('--text');
  const muted = color('--muted');
  const border = color('--border');

  return {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: accent,
      colorPrimaryHover: color('--accent-hover'),
      colorPrimaryActive: color('--accent-active'),
      colorPrimaryBg: selected,
      colorPrimaryBgHover: hover,
      colorPrimaryBorder: border,
      colorPrimaryText: accent,
      colorLink: accent,
      colorBgBase: background,
      colorBgLayout: background,
      colorBgContainer: surface,
      colorBgElevated: color('--elevated'),
      colorBgContainerDisabled: surface,
      colorFillSecondary: hover,
      colorFillTertiary: hover,
      colorFillAlter: surface,
      colorText: text,
      colorTextHeading: text,
      colorTextSecondary: muted,
      colorTextTertiary: muted,
      colorTextQuaternary: color('--disabled'),
      colorTextDisabled: color('--disabled'),
      colorTextPlaceholder: muted,
      colorBorder: border,
      colorBorderSecondary: border,
      colorSplit: border,
      controlItemBgHover: hover,
      controlItemBgActive: selected,
      controlItemBgActiveHover: selected,
      borderRadius: 12,
      fontFamily: 'var(--app-font-family)',
      controlHeightLG: 46,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
      boxShadowSecondary: '0 8px 24px rgba(0, 0, 0, 0.14)',
    },
    components: {
      Button: {
        defaultBg: surface,
        defaultColor: muted,
        defaultBorderColor: border,
        defaultHoverBg: hover,
        defaultHoverColor: text,
        defaultHoverBorderColor: border,
        defaultActiveBg: selected,
        defaultActiveColor: text,
        defaultActiveBorderColor: border,
        defaultShadow: 'none',
        primaryShadow: 'none',
        primaryColor: isDark ? '#202023' : '#ffffff',
      },
      Menu: {
        itemBg: 'transparent',
        itemColor: muted,
        itemHoverBg: hover,
        itemHoverColor: text,
        itemSelectedBg: selected,
        itemSelectedColor: accent,
        itemActiveBg: selected,
        itemDisabledColor: color('--disabled'),
      },
    },
  };
});
</script>
<template>
  <ConfigProvider :theme="config">
    <RouterView v-slot="{ Component }"
      ><component :is="Component" :dark="dark" @toggle-theme="toggleTheme"
    /></RouterView>
  </ConfigProvider>
</template>
