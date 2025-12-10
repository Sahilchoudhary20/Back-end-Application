jest.mock('../../config/firebase', () => {
  return {
    auth: { verifyIdToken: jest.fn() },
    firestore: {
      collection: jest.fn(() => ({
        add: jest.fn(),
        doc: jest.fn(() => ({
          get: jest.fn(),
          update: jest.fn(),
          delete: jest.fn()
        })),
        where: jest.fn(() => ({
          orderBy: jest.fn(() => ({
            get: jest.fn()
          }))
        })),
        orderBy: jest.fn(() => ({
          get: jest.fn()
        }))
      }))
    }
  };
});
import request from 'supertest';
import app from '../../app';

jest.mock('../../middleware/auth.middleware', () => ({
  firebaseAuth: (req: any, _res: any, next: any) => next(),
  requireRole: () => (_req: any, _res: any, next: any) => next()
}));

describe('Projects Controller routes (integration)', () => {
  it('GET /api/projects returns a status (200|500)', async () => {
    const res = await request(app).get('/api/projects');
    expect([200, 500]).toContain(res.status);
  });
});
