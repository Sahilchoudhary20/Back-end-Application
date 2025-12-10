import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export interface AuthRequest extends Request {
  uid?: string;
  claims?: any;
}

export async function firebaseAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.header('authorization') || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    if (!admin.apps.length) {
     
      return res.status(500).json({ message: 'Firebase not initialized' });
    }

   
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;
    req.claims = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function requireRole(roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRoles = req.claims?.roles || [];
    const has = roles.some((r) => userRoles.includes(r));
    if (!has) return res.status(403).json({ message: 'Forbidden' });
    return next();
  };
}
