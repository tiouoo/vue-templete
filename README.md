# Vue Template

基于 Oink 项目结构的 Vue 3 模板，内置 Vue Router、Ant Design Vue、Hono 和 Vercel 配置。首页和空白页可直接填入业务内容。

## 本地运行

使用 Node.js 22.12 或更新的 22.x 版本。

~~~sh
npm ci
npm run dev
~~~

打开 http://localhost:5173 。访问 `/blank` 可以查看空白页，访问 `/api/health` 会返回 `{"status":"ok"}`。本地启动无需设置环境变量。

~~~sh
npm run build
npm run preview
~~~

## 修改模板

- 在 `src/config.js` 修改应用名称，在 `index.html` 同步修改 HTML 初始标题。
- 在 `src/frontend/router.js` 修改路由。给路由设置 `meta.navigation: true` 可将它加入导航。
- 在 `src/frontend/views/` 编辑页面，在 `src/frontend/assets/css/main.css` 调整全局样式和深浅色变量。阿里妈妈字体从指定 CDN 加载。
- 在 `public/favicon.svg` 替换默认闪电图标。侧边栏与浏览器标签页共用该文件，主题按钮图标位于 `src/frontend/assets/icons/`。
- 在 `src/backend/routes/` 新增接口，并在 `src/backend/api.js` 注册。前端可用 `src/frontend/api/request.js` 的 `request('/health')` 请求同源 JSON 接口。

## 部署到 Vercel

将仓库导入 Vercel 后使用根目录的 `vercel.json`。Vite 构建输出到 `dist/`，API 请求由 `api/index.js` 交给 Hono，页面路由由 Vue Router 处理。Vercel 的 Node.js 版本取自 `package.json`。

推送到 GitHub 后，可以在仓库的 **Settings → General → Template repository** 启用模板仓库。
