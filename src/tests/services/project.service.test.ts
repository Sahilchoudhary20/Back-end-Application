jest.mock('../../config/firebase');

import { ProjectService } from '../../services/project.service';
import { ProjectRepository } from '../../repositories/project.repository';
import { Project } from '../../models/project.model';

jest.mock('../../repositories/project.repository');

describe('ProjectService', () => {
  let repoMock: jest.Mocked<ProjectRepository>;
  let service: ProjectService;

  beforeEach(() => {
    repoMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    } as unknown as jest.Mocked<ProjectRepository>;

    service = new ProjectService(repoMock);
  });

  it('creates project when name unique', async () => {
    const input: Project = { name: 'Unique', ownerId: 'u1' } as any;
    (repoMock.findAll as jest.Mock).mockResolvedValue([]);
    (repoMock.create as jest.Mock).mockResolvedValue({ id: '1', ...input, createdAt: 'now', updatedAt: 'now' });
    const created = await service.create(input);
    expect(repoMock.create).toHaveBeenCalledWith(input);
    expect(created).toHaveProperty('id', '1');
  });

  it('duplicate name', async () => {
    const input: Project = { name: 'Dup', ownerId: 'u1' } as any;
    (repoMock.findAll as jest.Mock).mockResolvedValue([{ id: 'x', name: 'Dup', ownerId: 'u1', createdAt: 'n', updatedAt: 'n' }]);
    await expect(service.create(input)).rejects.toThrow('Project with same name already exists');
  });

  it('getById throws when not found', async () => {
    (repoMock.findById as jest.Mock).mockResolvedValue(null);
    await expect(service.getById('no')).rejects.toThrow('Project not found');
  });
});
