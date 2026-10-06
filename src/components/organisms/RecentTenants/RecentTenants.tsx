import {
  ArrowForwardRounded,
  BusinessRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const tenants = [
  {
    name: 'La Barbershop Arturia',
    code: 'ARTURIA',
    subdomain: 'arturia.flowbercut.com',
    active: true,
  },
  {
    name: 'Nueva barbería',
    code: 'PENDIENTE',
    subdomain: 'Pendiente de configuración',
    active: false,
  },
  {
    name: 'Barbería Demo',
    code: 'DEMO',
    subdomain: 'demo.flowbercut.com',
    active: true,
  },
];

export const RecentTenants = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: {
          xs: 2.5,
          sm: 3,
        },
        borderRadius: 3,
        background:
          'linear-gradient(145deg, rgba(24,24,30,0.78), rgba(12,12,16,0.88))',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow:
          '0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.035)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          justifyContent: 'space-between',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: '#F5F5F7',
              fontSize: '1rem',
              fontWeight: 650,
              letterSpacing: '-0.02em',
            }}
          >
            Barberías recientes
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: alpha('#F5F5F7', 0.4),
              fontSize: '0.74rem',
            }}
          >
            Últimos tenants registrados
          </Typography>
        </Box>

        <Button
          onClick={() => navigate('/platform/barberias')}
          endIcon={<ArrowForwardRounded fontSize="small" />}
          sx={{
            minWidth: 'auto',
            px: 1.5,
            color: '#64D2FF',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: alpha('#64D2FF', 0.06),
            },
          }}
        >
          Ver todas
        </Button>
      </Box>

      <Box
        sx={{
          mt: 2.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {tenants.map((tenant, index) => (
          <Box
            key={tenant.code}
            sx={{
              py: 1.75,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              borderTop:
                index === 0
                  ? '1px solid rgba(255,255,255,0.06)'
                  : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                color: tenant.active ? '#64D2FF' : '#BF5AF2',
                backgroundColor: tenant.active
                  ? alpha('#64D2FF', 0.07)
                  : alpha('#BF5AF2', 0.07),
                border: `1px solid ${
                  tenant.active
                    ? alpha('#64D2FF', 0.13)
                    : alpha('#BF5AF2', 0.13)
                }`,
              }}
            >
              <BusinessRounded fontSize="small" />
            </Box>

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  overflow: 'hidden',
                  color: '#F5F5F7',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {tenant.name}
              </Typography>

              <Typography
                sx={{
                  mt: 0.35,
                  overflow: 'hidden',
                  color: alpha('#F5F5F7', 0.35),
                  fontSize: '0.7rem',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {tenant.subdomain}
              </Typography>
            </Box>

            <Box
              sx={{
                flexShrink: 0,
                px: 1,
                py: 0.5,
                borderRadius: 999,
                color: tenant.active ? '#64D2FF' : '#BF5AF2',
                backgroundColor: tenant.active
                  ? alpha('#64D2FF', 0.06)
                  : alpha('#BF5AF2', 0.06),
                border: `1px solid ${
                  tenant.active
                    ? alpha('#64D2FF', 0.12)
                    : alpha('#BF5AF2', 0.12)
                }`,
                fontSize: '0.63rem',
                fontWeight: 600,
              }}
            >
              {tenant.active ? 'Activa' : 'Pendiente'}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};