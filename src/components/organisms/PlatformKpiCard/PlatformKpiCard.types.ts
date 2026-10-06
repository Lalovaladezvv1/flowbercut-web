import type { ReactNode } from 'react';

export interface PlatformKpiCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  accent: string;
}