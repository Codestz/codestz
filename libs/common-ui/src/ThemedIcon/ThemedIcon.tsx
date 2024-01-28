import { Box, useTheme } from '@mui/material';
import cn from 'classnames';
import { ThemedIconProps } from './ThemedIcon.types';
import styles from './ThemeIcon.module.scss';

export function ThemedIcon({
  icon,
  iconProps,
  link,
  action,
  target,
  animatedOnHover = true,
  className,
}: ThemedIconProps) {
  const { palette } = useTheme();
  const isExternalLink = !link?.startsWith('/');

  if (isExternalLink) {
    return (
      <a
        className={cn(styles['container'], className, {
          [styles['animated']]: animatedOnHover,
        })}
        href={link}
        target={target || '_blank'}
      >
        {icon({
          size: 32,
          color: palette.text.primary,
          ...iconProps,
        })}
      </a>
    );
  }

  return (
    <Box
      className={cn(styles['container'], className, {
        [styles['animated']]: animatedOnHover,
      })}
      onClick={action}
    >
      {icon({
        size: 32,
        color: palette.text.primary,
        ...iconProps,
      })}
    </Box>
  );
}
