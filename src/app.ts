import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/error.middleware';
import { swaggerRouter } from './docs/swagger';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerRouter);
app.use('/api', routes);

app.use(errorHandler);

export default app;
