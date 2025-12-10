import { Router } from 'express';
import projects from './projects.routes';
import tasks from './tasks.routes';
import comments from './comments.routes';

const router = Router();
router.use('/projects', projects);
router.use('/tasks', tasks);
router.use('/comments', comments);

export default router;
