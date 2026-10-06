import {
  AttachMoneyRounded,
  BusinessRounded,
  PeopleRounded,
  StorefrontRounded,
} from '@mui/icons-material';

import {
  Box,
  Typography,
  alpha,
} from '@mui/material';

import { GradientButton } from '../../atoms/GradientButton';
import { PlatformGrowthChart } from '../../organisms/PlatformGrowthChart';
import { PlatformKpiCard } from '../../organisms/PlatformKpiCard';
import { RecentTenants } from '../../organisms/RecentTenants';

export interface PlatformDashboardTemplateProps {
  onManageTenants: () => void;
}

export const PlatformDashboardTemplate = ({
  onManageTenants,
}: PlatformDashboardTemplateProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        maxWidth: 1500,
        mx: 'auto',
        boxSizing: 'border-box',
        pb: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          mb: {
            xs: 2.5,
            sm: 3,
            md: 4,
          },
          display: 'flex',
          alignItems: {
            xs: 'flex-start',
            md: 'center',
          },
          justifyContent: 'space-between',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            width: {
              xs: '100%',
              md: 'auto',
            },
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: '#F5F5F7',
              fontSize: {
                xs: '1.55rem',
                sm: '1.9rem',
                md: '2.15rem',
                lg: '2.25rem',
              },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.045em',
              overflowWrap: 'break-word',
            }}
          >
            Hola
          </Typography>

          <Typography
            sx={{
              mt: 0.9,
              color: alpha('#F5F5F7', 0.45),
              fontSize: {
                xs: '0.8rem',
                sm: '0.88rem',
                md: '0.9rem',
              },
              lineHeight: 1.5,
            }}
          >
            Esto es lo que está pasando en FLOWBERCUT.
          </Typography>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            width: {
              xs: '100%',
              md: 'auto',
            },
          }}
        >
          <GradientButton
            onClick={onManageTenants}
          >
            Administrar barberías
          </GradientButton>
        </Box>
      </Box>

      {/* KPIs */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(4, minmax(0, 1fr))',
          },
          gap: {
            xs: 1.5,
            sm: 2,
            md: 2.25,
          },
        }}
      >
        <PlatformKpiCard
          title="Barberías"
          value="12"
          description="Registradas en plataforma"
          icon={
            <BusinessRounded fontSize="small" />
          }
          accent="#0A84FF"
        />

        <PlatformKpiCard
          title="Barberías activas"
          value="10"
          description="Actualmente operativas"
          icon={
            <StorefrontRounded fontSize="small" />
          }
          accent="#64D2FF"
        />

        <PlatformKpiCard
          title="Usuarios"
          value="24"
          description="Usuarios administradores"
          icon={
            <PeopleRounded fontSize="small" />
          }
          accent="#BF5AF2"
        />

        <PlatformKpiCard
          title="MXN"
          value="$1,990"
          description="Ingreso mensual recurrente"
          icon={
            <AttachMoneyRounded fontSize="small" />
          }
          accent="#FF375F"
        />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          mt: {
            xs: 1.5,
            sm: 2,
            md: 2.25,
          },
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            lg: 'minmax(0, 1.65fr) minmax(280px, 0.85fr)',
          },
          gap: {
            xs: 1.5,
            sm: 2,
            md: 2.25,
          },
          alignItems: 'start',
        }}
      >
        {/* Growth */}
        <Box
        sx={{
          width: '100%',
          minWidth: 0,
          minHeight: 330,
          display: 'flex',
        }}
      >
        <PlatformGrowthChart />
      </Box>

        {/* Platform status */}
        <Box
          sx={{
            width: '100%',
            minWidth: 0,
            minHeight: {
              xs: 'auto',
              lg: 330,
            },
            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
            boxSizing: 'border-box',
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
            Estado de plataforma
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: alpha('#F5F5F7', 0.4),
              fontSize: '0.74rem',
            }}
          >
            Resumen actual
          </Typography>

          <Box
            sx={{
              mt: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
              minWidth: 0,
            }}
          >
            <StatusRow
              label="Barberías activas"
              value="10"
              accent="#64D2FF"
            />

            <StatusRow
              label="Barberías inactivas"
              value="2"
              accent="#FF375F"
            />

            <StatusRow
              label="Suscripciones activas"
              value="10"
              accent="#BF5AF2"
            />
          </Box>

          <Box
            sx={{
              mt: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },
              p: {
                xs: 1.5,
                sm: 1.75,
              },
              minWidth: 0,
              boxSizing: 'border-box',
              borderRadius: 2.5,
              backgroundColor:
                alpha('#64D2FF', 0.045),
              border:
                `1px solid ${alpha('#64D2FF', 0.1)}`,
            }}
          >
            <Typography
              sx={{
                color: '#64D2FF',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              Plataforma operativa
            </Typography>

            <Typography
              sx={{
                mt: 0.45,
                color: alpha('#F5F5F7', 0.4),
                fontSize: '0.68rem',
                lineHeight: 1.5,
                overflowWrap: 'break-word',
              }}
            >
              Los datos mostrados serán conectados
              posteriormente con la API.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Recent tenants */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          mt: {
            xs: 1.5,
            sm: 2,
            md: 2.25,
          },
        }}
      >
        <RecentTenants />
      </Box>
    </Box>
  );
};

interface StatusRowProps {
  label: string;
  value: string;
  accent: string;
}

const StatusRow = ({
  label,
  value,
  accent,
}: StatusRowProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        px: {
          xs: 1.25,
          sm: 1.5,
        },
        py: 1.35,
        boxSizing: 'border-box',
        borderRadius: 2,
        backgroundColor:
          alpha('#FFFFFF', 0.025),
        border:
          '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Box
        sx={{
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: accent,
            boxShadow:
              `0 0 10px ${alpha(accent, 0.5)}`,
          }}
        />

        <Typography
          sx={{
            minWidth: 0,
            color: alpha('#F5F5F7', 0.58),
            fontSize: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
      </Box>

      <Typography
        sx={{
          flexShrink: 0,
          color: '#F5F5F7',
          fontSize: '0.82rem',
          fontWeight: 650,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};