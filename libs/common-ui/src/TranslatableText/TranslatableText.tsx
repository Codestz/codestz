import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TranslatableTextProps } from './TranslatableText.types';

export function TranslatableText({ children, ...rest }: TranslatableTextProps) {
  const { t } = useTranslation();
  return <Typography {...rest}>{t(children, children)}</Typography>;
}
