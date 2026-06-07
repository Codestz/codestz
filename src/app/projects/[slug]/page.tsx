import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, GitFork, Github, Star } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { Section } from '@/components/sections';
import { Button, Badge } from '@/components/ui';
import { contentService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import type { Metadata } from 'next';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '../../../../mdx-components';
import { generateShowcaseMetadata } from '@/lib/utils';
import type { ProjectPageProps } from './page.types';

const STATUS_VARIANT = {
  active: 'success',
  wip: 'warning',
  archived: 'secondary',
} as const;

const STATUS_LABEL = {
  active: 'Active',
  wip: 'WIP',
  archived: 'Archived',
} as const;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await contentService.getShowcaseBySlug(slug);

  if (!result.success || !result.data) {
    return { title: 'Project Not Found' };
  }

  const project = result.data;

  return generateShowcaseMetadata({
    title: project.title,
    description: project.description,
    slug: project.slug,
    thumbnail: project.thumbnail,
    technologies: project.technologies,
  });
}

export async function generateStaticParams() {
  const result = await contentService.getAllShowcase();
  const projects = result.success ? result.data : [];

  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = await contentService.getShowcaseBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data;

  return (
    <main>
      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Button
            as="a"
            href={ROUTES.projects.index}
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="h-3 w-3" />}
            className="mb-8"
          >
            Back to Projects
          </Button>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <header className="not-prose mb-6 sm:mb-8">
              {/* Badges */}
              <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                <Badge variant={STATUS_VARIANT[project.status]}>
                  {STATUS_LABEL[project.status]}
                </Badge>
                {project.featured && <Badge variant="primary">Featured</Badge>}
              </div>

              {/* Title */}
              <h1 className="mb-3 sm:mb-4 font-mono text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight tracking-wider text-foreground">
                {project.title}
              </h1>

              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="mb-6 sm:mb-8 relative border-[4px] border-foreground shadow-[12px_12px_0px_0px] shadow-foreground overflow-hidden bg-bg-elevated">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              )}

              {/* Repo meta */}
              <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/70">
                <span className="font-mono">{project.repo}</span>
                {project.language && (
                  <span className="font-semibold text-primary">{project.language}</span>
                )}
                {typeof project.stars === 'number' && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4" /> {project.stars}
                  </span>
                )}
                {typeof project.forks === 'number' && project.forks > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-4 w-4" /> {project.forks}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mb-4 sm:mb-6 text-base sm:text-lg text-foreground/80">
                {project.description}
              </p>

              {/* Technologies */}
              {project.technologies.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="mb-2 sm:mb-3 text-xs sm:text-sm font-bold uppercase text-foreground/60">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="primary" pill>
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Button
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="md"
                  leftIcon={<Github className="h-4 w-4" />}
                >
                  View Code
                </Button>
                {project.liveUrl && (
                  <Button
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    leftIcon={<ExternalLink className="h-4 w-4" />}
                  >
                    View Live
                  </Button>
                )}
              </div>
            </header>

            {/* Content */}
            <div className="mt-8">
              <MDXRemote
                source={project.content}
                components={mdxComponents}
                // Disable while I am the only one that can post.
                options={{
                  blockDangerousJS: false,
                  blockJS: false,
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </article>
        </div>
      </Section>
    </main>
  );
}
