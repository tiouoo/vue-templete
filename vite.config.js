import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { getRequestListener } from '@hono/node-server';
import app from './src/backend/api.js';

function apiMiddleware(loadApp) {
  return async (request, response, next) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    if (pathname !== '/api' && !pathname.startsWith('/api/')) return next();

    try {
      const backend = await loadApp();
      await getRequestListener(backend.fetch)(request, response);
    } catch (error) {
      next(error);
    }
  };
}

function backendPlugin() {
  return {
    name: 'hono-backend',
    configureServer(server) {
      server.middlewares.use(apiMiddleware(async () => {
        const module = await server.ssrLoadModule('/src/backend/api.js');
        return module.default;
      }));
    },
    configurePreviewServer(server) {
      server.middlewares.use(apiMiddleware(async () => app));
    },
  };
}

export default defineConfig({
  resolve: { dedupe: ['vue', 'vue-router'] },
  plugins: [vue(), backendPlugin()],
});
