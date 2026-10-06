import {
  MenuRounded,
  NotificationsNoneRounded,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  alpha,
} from '@mui/material';

import type { PlatformHeaderProps } from './PlatformHeader.types';

export const PlatformHeader = ({
  onMenuClick,
}: PlatformHeaderProps) => {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: 76,
        px: {
          xs: 2,
          sm: 3,
          lg: 4,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha('#050507', 0.62),
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: '#F5F5F7',
            backgroundColor: alpha('#FFFFFF', 0.04),
            border: '1px solid rgba(255,255,255,0.07)',
            '&:hover': {
              backgroundColor: alpha('#64D2FF', 0.07),
              color: '#64D2FF',
            },
          }}
        >
          <MenuRounded />
        </IconButton>

        <Box>
          <Typography
            sx={{
              color: '#F5F5F7',
              fontSize: {
                xs: '0.95rem',
                sm: '1rem',
              },
              fontWeight: 650,
              letterSpacing: '-0.02em',
            }}
          >
            Panel de plataforma
          </Typography>

          <Typography
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
              mt: 0.25,
              color: alpha('#F5F5F7', 0.4),
              fontSize: '0.73rem',
            }}
          >
            Administración global de FLOWBERCUT
          </Typography>
        </Box>
      </Box>

      <IconButton
        sx={{
          color: alpha('#F5F5F7', 0.62),
          backgroundColor: alpha('#FFFFFF', 0.035),
          border: '1px solid rgba(255,255,255,0.07)',
          '&:hover': {
            color: '#64D2FF',
            backgroundColor: alpha('#64D2FF', 0.06),
          },
        }}
      >
        <NotificationsNoneRounded />
      </IconButton>
    </Box>
  );
};