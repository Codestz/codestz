import { Project } from '../../definitions';

export interface IProjectsRepository {
  getProjects(): Promise<Array<Project>>;
}
