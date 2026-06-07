import { ImageResponse } from 'next/og';
import { contentService } from '@/lib/services';
import { APP_CONFIG } from '@/lib/constants';

export const alt = 'Project on codestz.dev';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PURPLE = '#7c3aed';
const BG = '#0a0a0a';
const FG = '#fafafa';

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await contentService.getShowcaseBySlug(slug);
  const project = result.success ? result.data : null;

  const title = project?.title ?? 'codestz.dev';
  const tags = project?.technologies?.slice(0, 4) ?? [];
  const repo = project?.repo ?? '';
  const stars = typeof project?.stars === 'number' ? `★ ${project.stars}` : '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        color: FG,
        padding: '64px',
        border: `16px solid ${PURPLE}`,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '20px', height: '20px', background: PURPLE }} />
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '2px' }}>CODESTZ.DEV</div>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: title.length > 50 ? 64 : 78,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-1px',
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                fontSize: 24,
                color: PURPLE,
                border: `2px solid ${PURPLE}`,
                padding: '4px 16px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 28,
            color: '#a1a1aa',
          }}
        >
          <span>{[repo, stars].filter(Boolean).join('  ·  ')}</span>
          <span>{APP_CONFIG.author.name}</span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
