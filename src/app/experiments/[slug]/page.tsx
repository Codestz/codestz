import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { Section } from '@/components/sections';
import { Button, Badge } from '@/components/ui';
import { ReadingProgressBar, SeriesNav, SeriesPager } from '@/components/blog';
import { JsonLd } from '@/components/seo';
import { contentService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import type { Metadata } from 'next';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '../../../../mdx-components';
import { generateBlogPostMetadata, formatDate, articleJsonLd } from '@/lib/utils';
import type { BlogPostPageProps } from './page.types';

/**
 * Dynamic metadata generation for individual blog posts
 * Uses async function because metadata depends on the dynamic [slug] parameter
 * For static pages, use `export const metadata` instead
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postResult = await contentService.getPostBySlug(slug);

  if (!postResult.success || !postResult.data) {
    return {
      title: 'Post Not Found',
    };
  }

  const post = postResult.data;

  return generateBlogPostMetadata({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags,
    thumbnail: post.thumbnail,
  });
}

export async function generateStaticParams() {
  const postsResult = await contentService.getAllPosts();
  const posts = postsResult.success ? postsResult.data : [];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ExperimentPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const postResult = await contentService.getPostBySlug(slug);

  if (!postResult.success || !postResult.data) {
    notFound();
  }

  const post = postResult.data;

  const seriesResult = post.series ? await contentService.getPostsBySeries(post.series) : null;
  const seriesPosts = seriesResult?.success ? seriesResult.data : [];

  const currentIndex = seriesPosts.findIndex((p) => p.slug === post.slug);
  const previousPart = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPart =
    currentIndex >= 0 && currentIndex < seriesPosts.length - 1
      ? seriesPosts[currentIndex + 1]
      : null;

  return (
    <main>
      <JsonLd data={articleJsonLd(post)} />

      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Button
            as="a"
            href={ROUTES.experiments.index}
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="h-3 w-3" />}
            className="mb-8"
          >
            Back to Experiments
          </Button>

          {/* Article Header */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <header className="not-prose mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{post.category}</Badge>
                {post.featured && <Badge variant="primary">Featured</Badge>}
              </div>

              <h1 className="mb-3 sm:mb-4 font-mono text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight tracking-wider text-foreground">
                {post.title}
              </h1>

              {/* Thumbnail Image (Optional) */}
              {post.thumbnail && (
                <div className="mb-6 sm:mb-8 relative border-[4px] border-foreground shadow-[12px_12px_0px_0px] shadow-foreground overflow-hidden bg-bg-elevated">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/60">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="default" pill>
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Series Navigation */}
            {post.series && seriesPosts.length > 1 && (
              <SeriesNav
                series={post.series}
                posts={seriesPosts}
                currentSlug={post.slug}
                className="mb-8"
              />
            )}

            {/* Article Content */}
            <div className="mt-8">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                // Disable while i am the only one that can post.
                options={{
                  blockDangerousJS: false,
                  blockJS: false,
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>

            {/* Series part navigation */}
            {post.series && seriesPosts.length > 1 && (
              <SeriesPager previous={previousPart} next={nextPart} className="mt-12" />
            )}
          </article>
        </div>
      </Section>
    </main>
  );
}
