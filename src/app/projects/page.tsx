import { AnimatedSection, ShowcaseGrid } from '@/components/sections';
import { contentService } from '@/lib/services';
import { generatePageMetadata } from '@/lib/utils';
import { Metadata } from 'next';

/**
 * Static metadata for the Projects (GitHub showcase) listing page
 */
export const metadata: Metadata = generatePageMetadata({
  title: 'Projects',
  description:
    'Open-source projects and tools I build — local-first apps, developer tooling, and AI infrastructure on GitHub',
  path: '/projects',
});

export default async function ProjectsPage() {
  const result = await contentService.getAllShowcase();
  const projects = result.success ? Array.from(result.data) : [];

  return (
    <main>
      <AnimatedSection
        title="Projects"
        description="Open-source projects and tools I build — local-first apps, developer tooling, and AI infrastructure"
      >
        {projects.length > 0 ? (
          <ShowcaseGrid projects={projects} />
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-lg text-foreground/60">No projects yet. Check back soon!</p>
          </div>
        )}
      </AnimatedSection>
    </main>
  );
}
