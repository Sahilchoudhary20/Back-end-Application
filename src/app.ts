import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { swaggerRouter } from './docs/swagger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
const MAX = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
const limiter = rateLimit({ windowMs: WINDOW_MS, max: MAX });
app.use(limiter);

app.use('/api-docs', swaggerRouter);
app.use('/api', routes);

app.use(errorHandler);

export default app;
