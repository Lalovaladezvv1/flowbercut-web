import {
  CalendarMonthRounded,
  ChevronLeftRounded,
  DashboardRounded,
  GroupRounded,
  LocalOfferRounded,
  LogoutRounded,
  ScheduleRounded,
  SettingsRounded,
  SpaRounded,
  StyleRounded,
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

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { clearSession } from '../../../features/auth/auth.slice';

import type { TenantSidebarProps } from './TenantSidebar.types';

export const TENANT_DRAWER_WIDTH = 260;

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/tenant/dashboard',
    icon: DashboardRounded,
  },
  {
    label: 'Citas',
    path: '/tenant/citas',
    icon: CalendarMonthRounded,
  },
  {
    label: 'Clientes',
    path: '/tenant/clientes',
    icon: GroupRounded,
  },
  {
    label: 'Servicios',
    path: '/tenant/servicios',
    icon: SpaRounded,
  },
  {
    label: 'Paquetes',
    path: '/tenant/paquetes',
    icon: StyleRounded,
  },
  {
    label: 'Promociones',
    path: '/tenant/promociones',
    icon: LocalOfferRounded,
  },
  {
    label: 'Horarios',
    path: '/tenant/horarios',
    icon: ScheduleRounded,
  },
];

export const TenantSidebar = ({
  mobileOpen,
  onClose,
}: TenantSidebarProps) => {
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
            display: {
              xs: 'flex',
              md: 'none',
            },
            color: alpha('#F5F5F7', 0.7),
            backgroundColor: alpha('#FFFFFF', 0.04),
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <ChevronLeftRounded />
        </IconButton>
      </Box>

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
          Mi barbería
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
                      ? '#F5F5F7'
                      : alpha('#F5F5F7', 0.52),
                    backgroundColor: isActive
                      ? alpha('#0A84FF', 0.10)
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(10,132,255,0.14)'
                      : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: alpha('#64D2FF', 0.07),
                      color: '#F5F5F7',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: isActive
                        ? '#64D2FF'
                        : alpha('#F5F5F7', 0.4),
                    }}
                  >
                    <Icon sx={{ fontSize: 21 }} />
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

      <Box
        sx={{
          px: 1.5,
          py: 1.5,
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <ListItemButton
          onClick={() => handleNavigate('/tenant/configuracion')}
          sx={{
            minHeight: 46,
            px: 1.5,
            borderRadius: 2,
            color: alpha('#F5F5F7', 0.5),
            '&:hover': {
              backgroundColor: alpha('#64D2FF', 0.07),
              color: '#F5F5F7',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 38,
              color: alpha('#F5F5F7', 0.4),
            }}
          >
            <SettingsRounded sx={{ fontSize: 21 }} />
          </ListItemIcon>

          <ListItemText
            primary="Configuración"
            slotProps={{
              primary: {
                sx: {
                  fontSize: '0.88rem',
                  fontWeight: 500,
                },
              },
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={handleLogout}
          sx={{
            minHeight: 46,
            px: 1.5,
            mt: 0.5,
            borderRadius: 2,
            color: alpha('#FF375F', 0.7),
            '&:hover': {
              backgroundColor: alpha('#FF375F', 0.07),
              color: '#FF375F',
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 38,
              color: 'inherit',
            }}
          >
            <LogoutRounded sx={{ fontSize: 21 }} />
          </ListItemIcon>

          <ListItemText
            primary="Cerrar sesión"
            slotProps={{
              primary: {
                sx: {
                  fontSize: '0.88rem',
                  fontWeight: 500,
                },
              },
            }}
          />
        </ListItemButton>
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
          display: {
            xs: 'block',
            md: 'none',
          },
          '& .MuiDrawer-paper': {
            width: TENANT_DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            background: '#050507',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          '& .MuiDrawer-paper': {
            width: TENANT_DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            background: '#050507',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};