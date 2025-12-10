import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';
import { validate } from '../middleware/validation.middleware';
import { createCommentSchema } from '../validators/comment.validator';
import { firebaseAuth } from '../middleware/auth.middleware';

const router = Router();
const ctrl = new CommentController();

router.post('/', firebaseAuth, validate(createCommentSchema), ctrl.create.bind(ctrl));
router.get('/:resourceType/:resourceId', firebaseAuth, ctrl.listForResource.bind(ctrl));
router.delete('/:id', firebaseAuth, ctrl.remove.bind(ctrl));

export default router;
