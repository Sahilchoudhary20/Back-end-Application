import { Request, Response, NextFunction } from 'express';
import { CommentService } from '../services/comment.service';
import { CommentRepository } from '../repositories/comment.repository';

const service = new CommentService(new CommentRepository());

export class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const comment = await service.create(payload);
      res.status(201).json(comment);
    } catch (err) {
      next(err);
    }
  }

  async listForResource(req: Request, res: Response, next: NextFunction) {
    try {
      const { resourceType, resourceId } = req.params;
      const comments = await service.listByResource(resourceType, resourceId);
      res.json(comments);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await service.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
