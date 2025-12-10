import { TaskService } from '../../services/task.service';
import { TaskRepository } from '../../repositories/task.repository';

jest.mock('../../repositories/task.repository');

describe('TaskService', () => {
  let repoMock: jest.Mocked<TaskRepository>;
  let service: TaskService;

  beforeEach(() => {
    repoMock = {
      create: jest.fn(),
      findById: jest.fn(),
      findByProject: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as unknown as jest.Mocked<TaskRepository>;
    // @ts-ignore
    service = new TaskService(repoMock);
  });

  it('creates task', async () => {
    const t = { projectId: 'p1', title: 't1' };
    (repoMock.create as jest.Mock).mockResolvedValue({ id: '1', ...t, createdAt: 'now' });
    const created = await service.create(t as any);
    expect(repoMock.create).toHaveBeenCalled();
    expect(created.id).toBe('1');
  });

  it('getById throws when missing', async () => {
    (repoMock.findById as jest.Mock).mockResolvedValue(null);
    await expect(service.getById('x')).rejects.toThrow('Task not found');
  });
});
