import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { AnimatedBackground } from '../../components/organisms/AnimatedBackground';
import { PlatformHeader } from '../../components/organisms/PlatformHeader';
import { PlatformSidebar } from '../../components/organisms/PlatformSidebar';

export const PlatformLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setMobileOpen(true);
  };

  const handleCloseMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
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

      <PlatformSidebar
        mobileOpen={mobileOpen}
        onClose={handleCloseMobileMenu}
      />

      {/* Área principal */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,

          /*
           * IMPORTANTE:
           * No usamos width: 100% + padding-left.
           * El sidebar ocupa 260px en desktop,
           * por lo que el contenido ocupa el espacio restante.
           */
          width: {
            xs: '100%',
            md: 'calc(100% - 260px)',
          },

          height: '100%',
          minWidth: 0,
          minHeight: 0,

          ml: {
            xs: 0,
            md: '260px',
          },

          display: 'flex',
          flexDirection: 'column',

          overflow: 'hidden',

          boxSizing: 'border-box',
        }}
      >
        <PlatformHeader
          onMenuClick={handleOpenMobileMenu}
        />

        {/* Área scrollable */}
        <Box
          component="main"
          sx={{
            flex: 1,

            width: '100%',
            minWidth: 0,
            minHeight: 0,

            overflowX: 'hidden',
            overflowY: 'auto',

            WebkitOverflowScrolling: 'touch',

            boxSizing: 'border-box',

            px: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
              lg: 4,
            },

            py: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              minWidth: 0,
              maxWidth: 1600,
              mx: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};