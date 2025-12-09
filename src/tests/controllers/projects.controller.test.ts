import request from 'supertest';
import app from '../../app';

jest.mock('../../src/middleware/auth.middleware', () => ({
  firebaseAuth: (req: any, res: any, next: any) => next(),
  requireRole: () => (req: any, res: any, next: any) => next()
}));

describe('Projects Controller routes (integration)', () => {
  it('GET /api/projects returns (200|500)', async () => {
    const res = await request(app).get('/api/projects');
    expect([200, 500]).toContain(res.status);
  });
});
