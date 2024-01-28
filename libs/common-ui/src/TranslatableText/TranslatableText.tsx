import { Typography } from '@mui/material';
import { TranslatableTextProps } from './TranslatableText.types';
import { useTranslation } from 'react-i18next';

export function TranslatableText({ children, ...rest }: TranslatableTextProps) {
  const { t } = useTranslation();
  return <Typography {...rest}>{t(children, children)}</Typography>;
}
