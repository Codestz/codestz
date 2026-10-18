export interface VideoProps {
  /** Video path under /public (mp4, H.264), e.g. /videos/blog/guildhall/trailer.mp4. */
  src: string;
  /** Still frame shown before the video loads. */
  poster?: string;
  /** What the clip shows, for screen readers. */
  title: string;
  /** Optional caption shown under the video. */
  caption?: string;
  /** Optional small label in the header bar. */
  label?: string;
  /** Show the browser's controls (default: false, a silent looping clip). */
  controls?: boolean;
  className?: string;
}
