import { Router } from 'express';
import projects from './projects.routes';

const router = Router();
router.use('/projects', projects);
export default router;
