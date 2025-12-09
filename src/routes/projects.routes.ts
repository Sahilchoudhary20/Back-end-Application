import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { validate } from '../middleware/validation.middleware';
import { createProjectSchema, updateProjectSchema } from '../validators/project.validator';
import { firebaseAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();
const ctrl = new ProjectController();

router.get('/', firebaseAuth, ctrl.list.bind(ctrl));
router.get('/:id', firebaseAuth, ctrl.get.bind(ctrl));
router.post('/', firebaseAuth, validate(createProjectSchema), ctrl.create.bind(ctrl));
router.put('/:id', firebaseAuth, validate(updateProjectSchema), ctrl.update.bind(ctrl));
router.delete('/:id', firebaseAuth, requireRole(['admin']), ctrl.remove.bind(ctrl));

export default router;
