import { TrendingUpRounded } from '@mui/icons-material';
import {
  Box,
  Typography,
  alpha,
} from '@mui/material';

export const PlatformGrowthChart = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        maxWidth: '100%',
        boxSizing: 'border-box',

        minHeight: {
          xs: 300,
          sm: 330,
          md: 350,
        },

        p: {
          xs: 2.5,
          sm: 3,
        },

        borderRadius: 3,

        background:
          'linear-gradient(145deg, rgba(24,24,30,0.78), rgba(12,12,16,0.88))',

        border:
          '1px solid rgba(255,255,255,0.08)',

        boxShadow:
          '0 20px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.035)',

        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
          }}
        >
          <Typography
            sx={{
              color: '#F5F5F7',
              fontSize: {
                xs: '1rem',
                sm: '1rem',
              },
              fontWeight: 650,
              letterSpacing: '-0.02em',
            }}
          >
            Crecimiento
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: alpha('#F5F5F7', 0.4),
              fontSize: '0.74rem',
              lineHeight: 1.4,
            }}
          >
            Evolución de barberías y suscripciones
          </Typography>
        </Box>

        <Box
          sx={{
            flexShrink: 0,

            width: 38,
            height: 38,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            borderRadius: 2,

            color: '#64D2FF',

            backgroundColor:
              alpha('#64D2FF', 0.07),

            border:
              `1px solid ${alpha('#64D2FF', 0.14)}`,
          }}
        >
          <TrendingUpRounded fontSize="small" />
        </Box>
      </Box>

      {/* Chart placeholder */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          maxWidth: '100%',
          boxSizing: 'border-box',

          minHeight: {
            xs: 190,
            sm: 210,
            md: 225,
          },

          mt: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 2.5,

          background:
            'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))',

          border:
            '1px dashed rgba(255,255,255,0.08)',

          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '100%',
            minWidth: 0,
            px: {
              xs: 2,
              sm: 3,
            },

            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            sx={{
              color: alpha('#F5F5F7', 0.52),
              fontSize: {
                xs: '0.78rem',
                sm: '0.82rem',
              },
              fontWeight: 500,
            }}
          >
            Las métricas aparecerán aquí
          </Typography>

          <Typography
            sx={{
              mt: 0.6,
              color: alpha('#F5F5F7', 0.28),
              fontSize: {
                xs: '0.66rem',
                sm: '0.7rem',
              },
              lineHeight: 1.5,
            }}
          >
            Conectaremos esta sección con la API de plataforma.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};