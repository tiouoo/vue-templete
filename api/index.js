import { getRequestListener } from '@hono/node-server';
import app from '../src/backend/api.js';

export default getRequestListener(app.fetch);
