import type { SvgIconComponent } from '@mui/icons-material';

export interface AnimatedBackgroundElement {
  id: string;
  icon: SvgIconComponent;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export interface AnimatedBackgroundProps {
  elements?: AnimatedBackgroundElement[];
  className?: string;
}