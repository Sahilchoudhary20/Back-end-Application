import { Project } from '../models/project.model';
import { ProjectRepository } from '../repositories/project.repository';

export class ProjectService {
  constructor(private repo: ProjectRepository) {}

  async create(payload: Project): Promise<Project> {
    const projects = await this.repo.findAll();
    if (projects.some((p) => p.name === payload.name)) throw new Error('Project with same name already exists');
    return this.repo.create(payload);
  }

  async getById(id: string): Promise<Project> {
    const p = await this.repo.findById(id);
    if (!p) throw new Error('Project not found');
    return p;
  }

  async list(): Promise<Project[]> {
    return this.repo.findAll();
  }

  async update(id: string, payload: Partial<Project>): Promise<Project> {
    const updated = await this.repo.update(id, payload);
    if (!updated) throw new Error('Project not found for update');
    return updated;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    await this.repo.delete(id);
    return { success: true };
  }
}
