import { Box, alpha, keyframes } from '@mui/material';

import type {
  AnimatedBackgroundElement,
  AnimatedBackgroundProps,
} from './AnimatedBackground.types';
import {
  DEFAULT_ANIMATED_BACKGROUND_ELEMENTS,
} from './animatedBackground.constants';

const floatAnimation = keyframes`
  0% {
    transform:
      translate3d(0, 0, 0)
      rotate(0deg)
      scale(1);

    opacity: 0;
  }

  15% {
    opacity: 0.75;
  }

  50% {
    transform:
      translate3d(0, -35px, 0)
      rotate(180deg)
      scale(1.04);
  }

  85% {
    opacity: 0.75;
  }

  100% {
    transform:
      translate3d(0, -70px, 0)
      rotate(360deg)
      scale(1);

    opacity: 0;
  }
`;

const getIconColor = (
  element: AnimatedBackgroundElement,
): string => {
  return alpha(element.color, 0.58);
};

export const AnimatedBackground = ({
  elements = DEFAULT_ANIMATED_BACKGROUND_ELEMENTS,
  className,
}: AnimatedBackgroundProps) => {
  return (
    <Box
      aria-hidden="true"
      className={className}
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        contain: 'layout paint',
      }}
    >
      {elements.map((element) => {
        const Icon = element.icon;
        const color = getIconColor(element);

        return (
          <Box
            key={element.id}
            sx={{
              position: 'absolute',
              top: element.top,
              left: element.left,
              width: element.size,
              height: element.size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
              opacity: 0,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              animation: `${floatAnimation} ${element.duration}s ease-in-out ${element.delay}s infinite`,
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
                opacity: 0.12,
              },
            }}
          >
            <Icon
              sx={{
                width: '100%',
                height: '100%',
                color: 'inherit',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};