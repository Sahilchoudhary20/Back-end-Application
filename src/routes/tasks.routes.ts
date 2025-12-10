import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { validate } from '../middleware/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator';
import { firebaseAuth } from '../middleware/auth.middleware';

const router = Router();
const ctrl = new TaskController();

router.post('/', firebaseAuth, validate(createTaskSchema), ctrl.create.bind(ctrl));
router.get('/:id', firebaseAuth, ctrl.get.bind(ctrl));
router.get('/project/:projectId', firebaseAuth, ctrl.listByProject.bind(ctrl));
router.put('/:id', firebaseAuth, validate(updateTaskSchema), ctrl.update.bind(ctrl));
router.delete('/:id', firebaseAuth, ctrl.remove.bind(ctrl));

export default router;
