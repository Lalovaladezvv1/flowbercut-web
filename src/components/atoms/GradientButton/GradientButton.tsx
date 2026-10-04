import { Button, alpha, useTheme } from '@mui/material';

import type { GradientButtonProps } from './GradientButton.types';

export const GradientButton = ({
  children,
  sx,
  ...props
}: GradientButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      {...props}
      variant="contained"
      sx={{
        width: 'fit-content',
        minWidth: 0,
        maxWidth: '100%',
        minHeight: 48,
        px: 2.75,
        borderRadius: 999,
        alignSelf: 'center',
        textTransform: 'none',
        fontSize: '0.92rem',
        fontWeight: 700,
        color: '#FFFFFF',
        background: `
          linear-gradient(
            135deg,
            #0A84FF 0%,
            #147EFB 45%,
            #BF5AF2 100%
          )
        `,
        boxShadow: `
          0 8px 28px ${alpha('#0A84FF', 0.22)},
          0 0 32px ${alpha('#BF5AF2', 0.08)}
        `,
        transition: theme.transitions.create(
          [
            'transform',
            'box-shadow',
            'background',
          ],
          {
            duration: 180,
          },
        ),
        '&:hover': {
          background: `
            linear-gradient(
              135deg,
              #2190FF 0%,
              #2789FF 45%,
              #C56BFF 100%
            )
          `,
          boxShadow: `
            0 10px 34px ${alpha('#0A84FF', 0.30)},
            0 0 40px ${alpha('#BF5AF2', 0.12)}
          `,
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};