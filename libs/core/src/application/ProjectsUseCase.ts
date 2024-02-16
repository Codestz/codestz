import { IProjectEntity, Project } from '../domain';
import { IProjectsRepository, ProjectsRepository } from '../repositories';
import { IProjectsUseCase } from './entities';

export class ProjectsUseCase implements IProjectsUseCase {
  private readonly projectsRepository: IProjectsRepository;

  constructor() {
    this.projectsRepository = new ProjectsRepository();
  }

  getProjects(): Promise<Array<IProjectEntity>> {
    try {
      return this.projectsRepository
        .getProjects()
        .then((projects) => projects.map((project) => new Project(project)));
    } catch (error) {
      throw new Error('Error occurred while trying to get projects');
    }
  }
}
