import { ProjectsUseCase } from '@codestz/core';
import { IUseCases } from './iUseCases';

export const UseCases: IUseCases = {
  projects: new ProjectsUseCase(),
};
