import express from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'Capstone API', version: '1.0.0' },
  servers: [{ url: '/api' }],
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } },
    schemas: {
      Project: {
        type: 'object',
        properties: { id: { type: 'string' }, name: { type: 'string' }, ownerId: { type: 'string' } }
      }
    }
  },
  security: [{ bearerAuth: [] }]
};

export const swaggerRouter = express.Router();
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
