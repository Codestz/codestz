import { ImageResponse } from 'next/og';
import { APP_CONFIG } from '@/lib/constants';

export const alt = 'codestz.dev — Esteban Estrada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PURPLE = '#7c3aed';
const BG = '#0a0a0a';
const FG = '#fafafa';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '24px',
        background: BG,
        color: FG,
        padding: '80px',
        border: `16px solid ${PURPLE}`,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '24px', height: '24px', background: PURPLE }} />
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '2px' }}>CODESTZ.DEV</div>
      </div>
      <div style={{ display: 'flex', fontSize: 88, fontWeight: 800, letterSpacing: '-2px' }}>
        {APP_CONFIG.author.name}
      </div>
      <div style={{ display: 'flex', fontSize: 34, color: PURPLE, fontWeight: 700 }}>
        {APP_CONFIG.author.role}
      </div>
      <div style={{ display: 'flex', fontSize: 28, color: '#a1a1aa', maxWidth: '900px' }}>
        Developer tools that make AI agents smarter — Rust, TypeScript, Go.
      </div>
    </div>,
    { ...size }
  );
}
