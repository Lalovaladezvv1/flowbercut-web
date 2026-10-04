import type { ButtonProps } from '@mui/material';

export interface GradientButtonProps extends Omit<
  ButtonProps,
  'variant'
> {
  children: React.ReactNode;
}