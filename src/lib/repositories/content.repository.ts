import { PostRepository } from './post.repository';
import { ProjectRepository } from './project.repository';
import { ShowcaseRepository } from './showcase.repository';
import type {
  IContentRepository,
  IPostRepository,
  IProjectRepository,
  IShowcaseRepository,
} from './content.repository.interface';

/**
 * Content Repository
 * Facade pattern: Provides unified interface to post and project repositories
 * Dependency Inversion: Depends on abstractions (interfaces), not concrete implementations
 */
export class ContentRepository implements IContentRepository {
  readonly posts: IPostRepository;
  readonly projects: IProjectRepository;
  readonly showcase: IShowcaseRepository;

  constructor(
    postRepository: IPostRepository = new PostRepository(),
    projectRepository: IProjectRepository = new ProjectRepository(),
    showcaseRepository: IShowcaseRepository = new ShowcaseRepository()
  ) {
    this.posts = postRepository;
    this.projects = projectRepository;
    this.showcase = showcaseRepository;
  }
}

/**
 * Export singleton instance
 * Can be replaced with dependency injection if needed
 */
export const contentRepository = new ContentRepository();
