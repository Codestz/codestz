import { TypographyProps } from '@mui/material';

export interface TranslatableTextProps extends Omit<TypographyProps, 'children'> {
  children: string;
}
