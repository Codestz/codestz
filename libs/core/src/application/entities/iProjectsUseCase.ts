import { IProjectEntity } from '../../domain';

export interface IProjectsUseCase {
  getProjects(): Promise<Array<IProjectEntity>>;
}
