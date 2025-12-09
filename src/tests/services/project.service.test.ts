import { ProjectService } from '../../services/project.service';
import { ProjectRepository } from '../../repositories/project.repository';
import { Project } from '../../models/project.model';

jest.mock('../../src/repositories/project.repository');

const MockedRepo = ProjectRepository as jest.MockedClass<typeof ProjectRepository>;

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
    // @ts-ignore
    service = new ProjectService(repoMock);
  });

  it('creates project when name unique', async () => {
    const input: Project = { name: 'Unique', ownerId: 'u1' };
    repoMock.findAll.mockResolvedValue([]);
    repoMock.create.mockResolvedValue({ id: '1', ...input, createdAt: 'now', updatedAt: 'now' });
    const created = await service.create(input);
    expect(repoMock.create).toHaveBeenCalledWith(input);
    expect(created).toHaveProperty('id', '1');
  });

  it('throws on duplicate name', async () => {
    const input: Project = { name: 'Dup', ownerId: 'u1' };
    repoMock.findAll.mockResolvedValue([{ id: 'x', name: 'Dup', ownerId: 'u1', createdAt: 'n', updatedAt: 'n' }]);
    await expect(service.create(input)).rejects.toThrow('Project with same name already exists');
  });

  it('getById throws when not found', async () => {
    repoMock.findById.mockResolvedValue(null);
    await expect(service.getById('no')).rejects.toThrow('Project not found');
  });
});
