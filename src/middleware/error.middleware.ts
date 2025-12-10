import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err && typeof err.message === 'string' && err.message.includes('not found')) {
    return res.status(404).json({ message: err.message });
  }
  if (err && typeof err.message === 'string' && err.message.includes('already exists')) {
    return res.status(409).json({ message: err.message });
  }
  console.error(err);
  return res.status(err?.status || 500).json({ message: err?.message || 'Internal Server Error' });
}
