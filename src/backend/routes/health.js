import { Hono } from 'hono';

const healthRoutes = new Hono();

healthRoutes.get('/', (context) => context.json({ status: 'ok' }));
healthRoutes.get('/health', (context) => context.json({ status: 'ok' }));

export default healthRoutes;
