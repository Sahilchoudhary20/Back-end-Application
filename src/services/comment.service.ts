import { Comment } from '../models/comment.model';
import { CommentRepository } from '../repositories/comment.repository';

export class CommentService {
  constructor(private repo: CommentRepository) {}

  async create(payload: Comment): Promise<Comment> {
    return this.repo.create(payload);
  }

  async listByResource(resourceType: string, resourceId: string): Promise<Comment[]> {
    return this.repo.findByResource(resourceType, resourceId);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    await this.repo.delete(id);
    return { success: true };
  }
}
