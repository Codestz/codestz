/**
 * Series grouping utilities
 * Pure functions for grouping posts into multi-part series
 */
import type { Post } from '@/lib/types';
import { slugify } from './string.utils';

export interface PostSeries {
  /** Series name (frontmatter `series`) */
  readonly name: string;
  /** URL slug derived from the series name */
  readonly slug: string;
  /** Parts ordered by `seriesOrder` ascending */
  readonly parts: readonly Post[];
  /** Sum of each part's reading time, in minutes */
  readonly totalMinutes: number;
}

/**
 * Group posts into series, ordered by seriesOrder.
 * Posts without a `series` field are ignored.
 */
export function groupPostsIntoSeries(posts: readonly Post[]): PostSeries[] {
  const map = new Map<string, Post[]>();

  for (const post of posts) {
    if (!post.series) continue;
    const list = map.get(post.series) ?? [];
    list.push(post);
    map.set(post.series, list);
  }

  return Array.from(map.entries()).map(([name, parts]) => {
    const sorted = [...parts].sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
    const totalMinutes = sorted.reduce((sum, p) => sum + (parseInt(p.readTime, 10) || 0), 0);
    return { name, slug: slugify(name), parts: sorted, totalMinutes };
  });
}
