import gql from 'graphql-tag';
import { Project, ProjectListResponse } from '../definitions';
import { Environment } from '../environment';
import { Http, IHttp } from '../infrastructure';
import { IProjectsRepository } from './entities';

export class ProjectsRepository implements IProjectsRepository {
  private readonly http: IHttp;

  constructor() {
    this.http = new Http();
  }

  async getProjects(): Promise<Array<Project>> {
    return this.http
      .requestGraphQL<{
        projectsList: ProjectListResponse;
      }>({
        requestDocument: gql`
          query {
            projectsList {
              items {
                id
                name
                description
                leftImage {
                  downloadUrl
                }
                rightImage {
                  downloadUrl
                }
                link
              }
            }
          }
        `,
        url: Environment.baseURL,
      })
      .then((response) => response.projectsList.items)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
