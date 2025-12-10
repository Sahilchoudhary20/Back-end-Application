import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';

const service = new TaskService(new TaskRepository());

export class TaskController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const task = await service.create(payload);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await service.getById(id);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }

  async listByProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { projectId } = req.params;
      const tasks = await service.listByProject(projectId);
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const task = await service.update(id, payload);
      res.json(task);
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
