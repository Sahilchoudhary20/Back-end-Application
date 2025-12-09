import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';
import { ProjectRepository } from '../repositories/project.repository';

const service = new ProjectService(new ProjectRepository());

export class ProjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const project = await service.create(payload);
      res.status(201).json(project);
    } catch (err) {
      next(err);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await service.getById(id);
      res.json(project);
    } catch (err) {
      next(err);
    }
  }

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await service.list();
      res.json(projects);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const project = await service.update(id, payload);
      res.json(project);
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
