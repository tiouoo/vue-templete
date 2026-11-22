import { Hono } from 'hono';
import healthRoutes from './routes/health.js';

const app = new Hono().basePath('/api');

app.route('/', healthRoutes);
app.notFound((context) => context.json({ message: '接口不存在' }, 404));

export default app;
