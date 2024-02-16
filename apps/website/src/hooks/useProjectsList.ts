import { useQuery } from '@tanstack/react-query';
import { IProjectEntity } from '@codestz/core';
import { UseCases } from '../di/useCases';

export function useProjectsList() {
  return useQuery<Array<IProjectEntity>, Error>({
    queryKey: ['PROJECTS_LIST'],
    queryFn: () => UseCases.projects.getProjects(),
  });
}
