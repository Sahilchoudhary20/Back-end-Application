import { Task } from '../models/task.model';
import { TaskRepository } from '../repositories/task.repository';

export class TaskService {
  constructor(private repo: TaskRepository) {}

  async create(payload: Task): Promise<Task> {
    return this.repo.create(payload);
  }

  async getById(id: string): Promise<Task> {
    const t = await this.repo.findById(id);
    if (!t) throw new Error('Task not found');
    return t;
  }

  async listByProject(projectId: string): Promise<Task[]> {
    return this.repo.findByProject(projectId);
  }

  async update(id: string, payload: Partial<Task>): Promise<Task> {
    const updated = await this.repo.update(id, payload);
    if (!updated) throw new Error('Task not found for update');
    return updated;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    await this.repo.delete(id);
    return { success: true };
  }
}
