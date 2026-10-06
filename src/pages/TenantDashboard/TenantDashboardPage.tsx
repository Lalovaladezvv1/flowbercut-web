import {
  Box,
  Typography,
} from '@mui/material';

import {
  selectCurrentTenant,
  selectCurrentUser,
  selectTenantId,
} from '../../features/auth/auth.selectors';

import {
  useAppSelector,
} from '../../hooks/useAppSelector';

export const TenantDashboardPage = () => {
  const user =
    useAppSelector(
      selectCurrentUser,
    );

  const tenant =
    useAppSelector(
      selectCurrentTenant,
    );

  const tenantId =
    useAppSelector(
      selectTenantId,
    );

  return (
    <Box>
      <Typography
        component="h1"
        sx={{
          color: '#F5F5F7',
          fontSize: '2rem',
          fontWeight: 700,
        }}
      >
        Administración de barbería
      </Typography>

      <Typography
        sx={{
          mt: 1,
          color:
            'rgba(245,245,247,0.55)',
        }}
      >
        Bienvenido,{' '}
        {user?.nombreUsuario}
      </Typography>

      <Typography
        sx={{
          mt: 2,
          color:
            'rgba(245,245,247,0.4)',
        }}
      >
        Tenant: {tenant?.nombre}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color:
            'rgba(100,210,255,0.8)',
        }}
      >
        TenantId: {tenantId}
      </Typography>
    </Box>
  );
};