'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github, GitFork, Star } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { ROUTES } from '@/lib/constants';
import type { ShowcaseProject } from '@/lib/types';

export interface ShowcaseGridProps {
  projects: ShowcaseProject[];
}

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

/**
 * ShowcaseGrid Component
 * Client-side grid with search + technology filtering for GitHub showcase projects.
 */
export function ShowcaseGrid({ projects }: ShowcaseGridProps) {
  const [search, setSearch] = useState('');
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const technologies = useMemo(() => {
    const all = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => all.add(t)));
    return Array.from(all).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeTech && !p.technologies.includes(activeTech)) return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.repo.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      return true;
    });
  }, [projects, search, activeTech]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
          className="w-full border-[3px] border-foreground bg-bg-elevated px-4 py-3 font-mono text-sm text-foreground placeholder:text-foreground/40 shadow-[4px_4px_0px_0px] shadow-foreground focus:outline-none focus:-translate-y-0.5 transition-transform"
        />
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTech(null)}
              className={`border-2 border-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-tight transition-colors ${
                activeTech === null
                  ? 'bg-primary text-white'
                  : 'bg-transparent text-foreground/70 hover:bg-foreground/5'
              }`}
            >
              All
            </button>
            {technologies.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setActiveTech(activeTech === tech ? null : tech)}
                className={`border-2 border-foreground px-3 py-1 font-mono text-xs font-bold uppercase tracking-tight transition-colors ${
                  activeTech === tech
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-foreground/70 hover:bg-foreground/5'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Card key={project.slug} variant="elevated" hoverable as="article">
              {project.thumbnail && (
                <Link
                  href={ROUTES.projects.detail(project.slug)}
                  className="block border-b-[3px] border-foreground overflow-hidden bg-bg-elevated"
                  aria-label={`${project.title} details`}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </Link>
              )}
              <Card.Header>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant={STATUS_VARIANT[project.status]}>
                    {STATUS_LABEL[project.status]}
                  </Badge>
                  {project.featured && <Badge variant="primary">Featured</Badge>}
                </div>
                <h2 className="mb-1 font-mono text-xl font-bold text-foreground">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/60">
                  <span className="font-mono">{project.repo}</span>
                  {project.language && (
                    <span className="font-semibold text-primary">{project.language}</span>
                  )}
                  {typeof project.stars === 'number' && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" /> {project.stars}
                    </span>
                  )}
                  {typeof project.forks === 'number' && project.forks > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {project.forks}
                    </span>
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <p className="mb-4 text-foreground/70">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="primary" pill>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="flex w-full flex-wrap gap-2">
                  <Button
                    as="a"
                    href={ROUTES.projects.detail(project.slug)}
                    variant="secondary"
                    size="sm"
                    rightIcon={<ArrowRight className="h-3 w-3" />}
                  >
                    Details
                  </Button>
                  <Button
                    as="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="sm"
                    leftIcon={<Github className="h-3 w-3" />}
                  >
                    Code
                  </Button>
                  {project.liveUrl && (
                    <Button
                      as="a"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      size="sm"
                      leftIcon={<ExternalLink className="h-3 w-3" />}
                    >
                      Live
                    </Button>
                  )}
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-foreground/60">No projects match your filters.</p>
        </div>
      )}
    </div>
  );
}
