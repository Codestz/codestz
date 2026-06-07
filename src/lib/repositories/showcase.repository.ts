import { ShowcaseProject, Result } from '@/lib/types';
import { BaseRepository } from './base.repository';
import { FileSystemAdapter } from './file-system.adapter';
import type { IShowcaseRepository } from './content.repository.interface';

/**
 * Showcase Repository Implementation
 * Single Responsibility: Manages GitHub showcase project data access
 */
export class ShowcaseRepository
  extends BaseRepository<ShowcaseProject>
  implements IShowcaseRepository
{
  protected readonly directory = 'showcase';

  async findAll(): Promise<Result<readonly ShowcaseProject[]>> {
    const filesResult = FileSystemAdapter.getMDXFiles(this.directory);

    if (!filesResult.success) {
      return filesResult;
    }

    const projects: ShowcaseProject[] = [];

    for (const file of filesResult.data) {
      const projectResult = await this.findBySlug(file.replace('.mdx', ''));

      if (projectResult.success && projectResult.data) {
        projects.push(projectResult.data);
      }
    }

    // Sort by publishedAt date (newest first)
    const sorted = projects.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return { success: true, data: sorted };
  }

  async findBySlug(slug: string): Promise<Result<ShowcaseProject | null>> {
    const fileResult = FileSystemAdapter.readMDXFile(`${this.directory}/${slug}.mdx`);

    if (!fileResult.success) {
      return { success: true, data: null };
    }

    const { frontmatter, content } = fileResult.data;
    const repo = frontmatter.repo || '';

    const project: ShowcaseProject = {
      slug,
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      publishedAt: frontmatter.publishedAt || new Date().toISOString(),
      thumbnail: frontmatter.thumbnail,
      repo,
      githubUrl: frontmatter.githubUrl || (repo ? `https://github.com/${repo}` : ''),
      liveUrl: frontmatter.liveUrl,
      technologies: (frontmatter.technologies || []) as readonly string[],
      stars: typeof frontmatter.stars === 'number' ? frontmatter.stars : undefined,
      forks: typeof frontmatter.forks === 'number' ? frontmatter.forks : undefined,
      language: frontmatter.language,
      status: (frontmatter.status || 'active') as ShowcaseProject['status'],
      featured: frontmatter.featured || false,
      content,
    };

    return { success: true, data: project };
  }

  async findFeatured(limit?: number): Promise<Result<readonly ShowcaseProject[]>> {
    const allResult = await this.findAll();

    if (!allResult.success) {
      return allResult;
    }

    const featured = allResult.data.filter((project) => project.featured);
    const limited = limit ? featured.slice(0, limit) : featured;

    return { success: true, data: limited };
  }

  async findByTechnology(tech: string): Promise<Result<readonly ShowcaseProject[]>> {
    const allResult = await this.findAll();

    if (!allResult.success) {
      return allResult;
    }

    const filtered = allResult.data.filter((project) =>
      project.technologies.some((t) => t.toLowerCase() === tech.toLowerCase())
    );

    return { success: true, data: filtered };
  }
}
