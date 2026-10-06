import { useState } from 'react';
import MenuRounded from '@mui/icons-material/MenuRounded';
import { Box, IconButton, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { AnimatedBackground } from '../../components/organisms/AnimatedBackground';
import { TenantSidebar } from '../../components/organisms/TenantSidebar';

const DRAWER_WIDTH = 260;

export const TenantLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100dvh',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        backgroundColor: '#050507',
      }}
    >
      <AnimatedBackground />

      {/* Layout principal */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          minWidth: 0,
          minHeight: 0,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* Sidebar */}
        <TenantSidebar
          mobileOpen={mobileOpen}
          onClose={handleMobileClose}
        />

        {/* Área principal */}
        <Box
          component="main"
          sx={{
            flex: '1 1 auto',
            width: {
              xs: '100%',
              md: `calc(100% - ${DRAWER_WIDTH}px)`,
            },
            maxWidth: {
              xs: '100%',
              md: `calc(100% - ${DRAWER_WIDTH}px)`,
            },
            minWidth: 0,
            minHeight: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {/* Header móvil */}
          <Box
            component="header"
            sx={{
              display: {
                xs: 'flex',
                md: 'none',
              },
              flex: '0 0 auto',
              width: '100%',
              minWidth: 0,
              height: 58,
              px: 1.5,
              alignItems: 'center',
              gap: 1,
              boxSizing: 'border-box',
              borderBottom:
                '1px solid rgba(255,255,255,0.07)',
              background:
                'linear-gradient(180deg, rgba(16,17,22,0.88), rgba(5,5,7,0.94))',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <IconButton
              onClick={handleMobileOpen}
              aria-label="Abrir menú"
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                color: '#F5F5F7',
                border:
                  '1px solid rgba(255,255,255,0.08)',
                backgroundColor:
                  'rgba(255,255,255,0.035)',
                '&:hover': {
                  color: '#64D2FF',
                  backgroundColor:
                    'rgba(100,210,255,0.07)',
                },
              }}
            >
              <MenuRounded />
            </IconButton>

            <Typography
              sx={{
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: 'rgba(245,245,247,0.68)',
                fontSize: '0.78rem',
                fontWeight: 500,
              }}
            >
              Administración de barbería
            </Typography>
          </Box>

          {/* Contenido */}
          <Box
            sx={{
              flex: '1 1 auto',
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              minHeight: 0,
              overflowX: 'hidden',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                minHeight: '100%',
                px: {
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                },
                py: {
                  xs: 1.5,
                  sm: 2,
                  md: 2.5,
                  lg: 3,
                },
                boxSizing: 'border-box',
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};