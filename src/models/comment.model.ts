export interface Comment {
  id?: string;
  resourceType: 'project' | 'task';
  resourceId: string;
  authorId: string;
  text: string;
  createdAt?: string;
}
