import { APP_CONFIG } from '@/lib/constants';
import type { Post } from '@/lib/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://codestz.dev';

/**
 * Structured data (JSON-LD) generators for rich search results.
 * @see https://schema.org
 */

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: APP_CONFIG.author.name,
    email: `mailto:${APP_CONFIG.author.email}`,
    url: SITE_URL,
    image: `${SITE_URL}/me.jpg`,
    jobTitle: APP_CONFIG.author.role,
    worksFor: {
      '@type': 'Organization',
      name: APP_CONFIG.author.company,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: APP_CONFIG.author.location,
    },
    sameAs: [APP_CONFIG.social.github, APP_CONFIG.social.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: APP_CONFIG.name,
    url: SITE_URL,
    description: APP_CONFIG.description,
    author: { '@type': 'Person', name: APP_CONFIG.author.name },
  };
}

export function articleJsonLd(post: Post) {
  const url = `${SITE_URL}/experiments/${post.slug}`;
  const image = post.thumbnail
    ? `${SITE_URL}${post.thumbnail}`
    : `${SITE_URL}/experiments/${post.slug}/opengraph-image`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || APP_CONFIG.author.name,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: APP_CONFIG.author.name,
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };
}
