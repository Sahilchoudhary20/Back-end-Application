export interface Task {
  id?: string;
  projectId: string;
  title: string;
  description?: string;
  assigneeId?: string;
  status?: 'todo' | 'in-progress' | 'done';
  createdAt?: string;
  updatedAt?: string;
}
