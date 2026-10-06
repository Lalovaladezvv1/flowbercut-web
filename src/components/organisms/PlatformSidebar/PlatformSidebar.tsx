import {
  BusinessRounded,
  ChevronLeftRounded,
  DashboardRounded,
  SettingsRounded,
  SubscriptionsRounded,
} from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutRounded } from '@mui/icons-material';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { clearSession } from '../../../features/auth/auth.slice';

import type { PlatformSidebarProps } from './PlatformSidebar.types';



export const DRAWER_WIDTH = 260;

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/platform/dashboard',
    icon: DashboardRounded,
  },
  {
    label: 'Barberías',
    path: '/platform/barberias',
    icon: BusinessRounded,
  },
  {
    label: 'Suscripciones',
    path: '/platform/suscripciones',
    icon: SubscriptionsRounded,
  },
  {
    label: 'Configuración',
    path: '/platform/configuracion',
    icon: SettingsRounded,
  },
];

export const PlatformSidebar = ({
  mobileOpen,
  onClose,
}: PlatformSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearSession());

    navigate('/login', {
      replace: true,
    });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };


  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background:
          'linear-gradient(180deg, rgba(16,17,22,0.82) 0%, rgba(5,5,7,0.94) 100%)',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 76,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Box
          component="img"
          src="/brand/flowbercut-logo.png"
          alt="FLOWBERCUT"
          sx={{
            width: 142,
            height: 'auto',
            display: 'block',
          }}
        />

        <IconButton
          onClick={onClose}
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: alpha('#F5F5F7', 0.7),
            backgroundColor: alpha('#FFFFFF', 0.04),
            border: '1px solid rgba(255,255,255,0.07)',
            '&:hover': {
              backgroundColor: alpha('#64D2FF', 0.08),
              color: '#64D2FF',
            },
          }}
        >
          <ChevronLeftRounded />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          px: 1.5,
          py: 2,
          overflowY: 'auto',
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            color: alpha('#F5F5F7', 0.32),
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Plataforma
        </Typography>

        <List disablePadding>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <Box key={item.path} sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  sx={{
                    minHeight: 46,
                    px: 1.5,
                    borderRadius: 2,
                    color: isActive
                      ? '#64D2FF'
                      : alpha('#F5F5F7', 0.62),
                    backgroundColor: isActive
                      ? alpha('#0A84FF', 0.11)
                      : 'transparent',
                    border: isActive
                      ? `1px solid ${alpha('#0A84FF', 0.18)}`
                      : '1px solid transparent',
                    transition: 'all 180ms ease',
                    '&:hover': {
                      backgroundColor: isActive
                        ? alpha('#0A84FF', 0.14)
                        : alpha('#64D2FF', 0.05),
                      color: '#F5F5F7',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: 'inherit',
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.88rem',
                          fontWeight: isActive ? 600 : 500,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </Box>
            );
          })}
        </List>
      </Box>

      {/* User */}
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2.5,
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                color: '#F5F5F7',
                fontSize: '0.88rem',
                fontWeight: 600,
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Eduardo Valadez
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                color: 'rgba(245,245,247,0.45)',
                fontSize: '0.72rem',
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Administrador de plataforma
            </Typography>
          </Box>

          <IconButton
            onClick={handleLogout}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            sx={{
              flexShrink: 0,
              width: 38,
              height: 38,
              color: 'rgba(245,245,247,0.55)',
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(255,255,255,0.025)',
              '&:hover': {
                color: '#FF375F',
                borderColor: 'rgba(255,55,95,0.35)',
                backgroundColor: 'rgba(255,55,95,0.08)',
              },
            }}
          >
            <LogoutRounded fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            color: '#F5F5F7',
            backgroundColor: '#050507',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '20px 0 60px rgba(0,0,0,0.35)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            color: '#F5F5F7',
            background:
              'linear-gradient(180deg, rgba(16,17,22,0.72) 0%, rgba(5,5,7,0.88) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRight: '1px solid rgba(255,255,255,0.07)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};