import { useState } from 'react';

import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import GroupRounded from '@mui/icons-material/GroupRounded';
import LocalOfferRounded from '@mui/icons-material/LocalOfferRounded';
import SpaRounded from '@mui/icons-material/SpaRounded';

import {
  Box,
  IconButton,
  Typography,
  alpha,
} from '@mui/material';

import {
  selectCurrentTenant,
} from '../../features/auth/auth.selectors';

import { useAppSelector } from '../../hooks/useAppSelector';

const kpiCards = [
  {
    label: 'Citas de hoy',
    description: 'Próximamente conectado',
    icon: CalendarMonthRounded,
    color: '#0A84FF',
  },
  {
    label: 'Clientes',
    description: 'Clientes registrados',
    icon: GroupRounded,
    color: '#64D2FF',
  },
  {
    label: 'Servicios',
    description: 'Servicios disponibles',
    icon: SpaRounded,
    color: '#BF5AF2',
  },
  {
    label: 'Promociones',
    description: 'Promociones activas',
    icon: LocalOfferRounded,
    color: '#FF375F',
  },
];

export const TenantDashboardPage = () => {
  const currentTenant = useAppSelector(
    selectCurrentTenant,
  );

  const [linkCopied, setLinkCopied] = useState(false);

  const tenantName =
    currentTenant?.nombre ?? 'Tu barbería';

  const tenantCode =
    currentTenant?.codigo ?? '—';

  const tenantSubdomain =
    currentTenant?.subdominio
      ? `${currentTenant.subdominio}.flowbercut.com`
      : '—';

  const appointmentUrl =
    currentTenant?.subdominio
      ? `https://${currentTenant.subdominio}.flowbercut.com/cita`
      : '';

  const handleCopyAppointmentUrl = async () => {
    if (!appointmentUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        appointmentUrl,
      );

      setLinkCopied(true);

      window.setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch {
      setLinkCopied(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: 720,
            md: 960,
            lg: 1180,
            xl: 1280,
          },
          minWidth: 0,
          mx: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <Box
          sx={{
            width: '100%',
            minWidth: 0,
            mb: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
            boxSizing: 'border-box',
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: '#F5F5F7',
              fontSize: {
                xs: '1.3rem',
                sm: '1.6rem',
                md: '1.9rem',
              },
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: '-0.035em',
              overflowWrap: 'anywhere',
            }}
          >
            Hola, {tenantName}
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              color: 'rgba(245,245,247,0.48)',
              fontSize: {
                xs: '0.75rem',
                sm: '0.84rem',
                md: '0.9rem',
              },
              lineHeight: 1.5,
              overflowWrap: 'break-word',
            }}
          >
            Bienvenido a FLOWBERCUT. Aquí tienes
            el resumen de tu barbería.
          </Typography>
        </Box>

        {/* ===================================================== */}
        {/* TENANT CARD */}
        {/* ===================================================== */}

        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            mb: {
              xs: 1.5,
              sm: 2,
              md: 2.5,
            },
            p: {
              xs: 1.5,
              sm: 2.25,
              md: 2.5,
            },
            boxSizing: 'border-box',
            borderRadius: {
              xs: 2,
              sm: 2.5,
            },
            border:
              '1px solid rgba(255,255,255,0.08)',
            background:
              'linear-gradient(145deg, rgba(20,22,30,0.82), rgba(12,13,18,0.88))',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.035)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
          }}
        >
          {/* Tenant info */}
          <Box
            sx={{
              width: '100%',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              sx={{
                color: '#64D2FF',
                fontSize: {
                  xs: '0.65rem',
                  sm: '0.7rem',
                },
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              {tenantCode}
            </Typography>

            <Typography
              sx={{
                mt: 0.55,
                color: '#F5F5F7',
                fontSize: {
                  xs: '0.95rem',
                  sm: '1rem',
                  md: '1.05rem',
                },
                lineHeight: 1.3,
                fontWeight: 650,
                overflowWrap: 'anywhere',
              }}
            >
              {tenantName}
            </Typography>

            <Typography
              sx={{
                mt: 0.45,
                color: 'rgba(245,245,247,0.38)',
                fontSize: {
                  xs: '0.65rem',
                  sm: '0.7rem',
                },
                lineHeight: 1.4,
                overflowWrap: 'anywhere',
              }}
            >
              {tenantSubdomain}
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: '100%',
              height: '1px',
              my: {
                xs: 1.5,
                sm: 1.75,
              },
              backgroundColor:
                'rgba(255,255,255,0.07)',
            }}
          />

          {/* Appointment link */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              sx={{
                mb: 0.9,
                color: 'rgba(245,245,247,0.5)',
                fontSize: {
                  xs: '0.62rem',
                  sm: '0.68rem',
                },
                fontWeight: 700,
                letterSpacing: '0.045em',
              }}
            >
              LINK PARA AGENDAR CITAS
            </Typography>

            <Box
              sx={{
                width: '100%',
                maxWidth: '100%',
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                gap: {
                  xs: 0.75,
                  sm: 1,
                },
                boxSizing: 'border-box',
              }}
            >
              {/* URL */}
              <Box
                sx={{
                  flex: '1 1 auto',
                  width: 0,
                  minWidth: 0,
                  maxWidth: '100%',
                  px: {
                    xs: 1,
                    sm: 1.5,
                  },
                  py: {
                    xs: 0.9,
                    sm: 1.1,
                  },
                  boxSizing: 'border-box',
                  borderRadius: 1.75,
                  border:
                    '1px solid rgba(100,210,255,0.12)',
                  backgroundColor:
                    'rgba(100,210,255,0.035)',
                  overflow: 'hidden',
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    width: '100%',
                    minWidth: 0,
                    color: '#64D2FF',
                    fontSize: {
                      xs: '0.65rem',
                      sm: '0.72rem',
                    },
                    fontWeight: 500,
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {appointmentUrl || '—'}
                </Typography>
              </Box>

              {/* Copy */}
              <IconButton
                onClick={handleCopyAppointmentUrl}
                disabled={!appointmentUrl}
                aria-label={
                  linkCopied
                    ? 'Link copiado'
                    : 'Copiar link para agendar citas'
                }
                title={
                  linkCopied
                    ? 'Link copiado'
                    : 'Copiar link'
                }
                sx={{
                  flex: '0 0 auto',
                  width: {
                    xs: 38,
                    sm: 42,
                  },
                  height: {
                    xs: 38,
                    sm: 42,
                  },
                  color: linkCopied
                    ? '#64D2FF'
                    : 'rgba(245,245,247,0.65)',
                  border:
                    '1px solid rgba(255,255,255,0.08)',
                  backgroundColor:
                    'rgba(255,255,255,0.035)',
                  '&:hover': {
                    color: '#64D2FF',
                    borderColor:
                      'rgba(100,210,255,0.28)',
                    backgroundColor:
                      'rgba(100,210,255,0.07)',
                  },
                  '&.Mui-disabled': {
                    color:
                      'rgba(245,245,247,0.2)',
                    borderColor:
                      'rgba(255,255,255,0.05)',
                  },
                }}
              >
                {linkCopied ? (
                  <CheckRounded fontSize="small" />
                ) : (
                  <ContentCopyRounded fontSize="small" />
                )}
              </IconButton>
            </Box>

            <Typography
              sx={{
                mt: 0.8,
                color: 'rgba(245,245,247,0.3)',
                fontSize: {
                  xs: '0.62rem',
                  sm: '0.67rem',
                },
                lineHeight: 1.45,
              }}
            >
              Comparte este enlace con tus clientes
              para que puedan reservar una cita.
            </Typography>
          </Box>
        </Box>

        {/* ===================================================== */}
        {/* KPI GRID */}
        {/* ===================================================== */}

        <Box
          sx={{
            width: '100%',
            minWidth: 0,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(4, minmax(0, 1fr))',
            },
            gap: {
              xs: 1.25,
              sm: 1.5,
              md: 1.75,
            },
            mb: {
              xs: 1.5,
              sm: 2,
              md: 2.25,
            },
            boxSizing: 'border-box',
          }}
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;

            return (
              <Box
                key={card.label}
                sx={{
                  width: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box',
                  p: {
                    xs: 1.5,
                    sm: 1.75,
                    md: 2,
                  },
                  borderRadius: {
                    xs: 1.75,
                    sm: 2,
                  },
                  border:
                    '1px solid rgba(255,255,255,0.07)',
                  background:
                    'linear-gradient(145deg, rgba(18,19,25,0.82), rgba(10,11,15,0.9))',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.025)',
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: {
                      xs: 36,
                      sm: 40,
                    },
                    height: {
                      xs: 36,
                      sm: 40,
                    },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1.5,
                    backgroundColor: alpha(
                      card.color,
                      0.1,
                    ),
                    border: `1px solid ${alpha(
                      card.color,
                      0.16,
                    )}`,
                    color: card.color,
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: {
                        xs: 17,
                        sm: 19,
                      },
                    }}
                  />
                </Box>

                {/* Label */}
                <Typography
                  sx={{
                    mt: {
                      xs: 1.1,
                      sm: 1.3,
                    },
                    color:
                      'rgba(245,245,247,0.52)',
                    fontSize: {
                      xs: '0.67rem',
                      sm: '0.72rem',
                    },
                    fontWeight: 500,
                    overflowWrap: 'break-word',
                  }}
                >
                  {card.label}
                </Typography>

                {/* Value */}
                <Typography
                  sx={{
                    mt: 0.45,
                    color: '#F5F5F7',
                    fontSize: {
                      xs: '1.05rem',
                      sm: '1.15rem',
                    },
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  —
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    mt: 0.85,
                    color:
                      'rgba(245,245,247,0.3)',
                    fontSize: {
                      xs: '0.61rem',
                      sm: '0.66rem',
                    },
                    lineHeight: 1.4,
                    overflowWrap: 'break-word',
                  }}
                >
                  {card.description}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* ===================================================== */}
        {/* BOTTOM GRID */}
        {/* ===================================================== */}

        <Box
          sx={{
            width: '100%',
            minWidth: 0,
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
            alignItems: 'stretch',
            boxSizing: 'border-box',
          }}
        >
          {/* Próximas citas */}
          <Box
            sx={{
              width: '100%',
              minWidth: 0,
              minHeight: {
                xs: 260,
                sm: 300,
                md: 330,
              },
              p: {
                xs: 1.5,
                sm: 2,
                md: 2.25,
              },
              boxSizing: 'border-box',
              borderRadius: {
                xs: 2,
                sm: 2.5,
              },
              border:
                '1px solid rgba(255,255,255,0.07)',
              background:
                'linear-gradient(145deg, rgba(18,19,25,0.82), rgba(10,11,15,0.9))',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.025)',
            }}
          >
            <Typography
              sx={{
                color: '#F5F5F7',
                fontSize: {
                  xs: '0.82rem',
                  sm: '0.9rem',
                },
                fontWeight: 650,
                letterSpacing: '-0.02em',
              }}
            >
              Próximas citas
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color:
                  'rgba(245,245,247,0.35)',
                fontSize: {
                  xs: '0.64rem',
                  sm: '0.7rem',
                },
                lineHeight: 1.5,
              }}
            >
              Aquí aparecerán las próximas citas
              de tu barbería.
            </Typography>
          </Box>

          {/* Actividad */}
          <Box
            sx={{
              width: '100%',
              minWidth: 0,
              minHeight: {
                xs: 220,
                sm: 260,
                md: 330,
              },
              p: {
                xs: 1.5,
                sm: 2,
                md: 2.25,
              },
              boxSizing: 'border-box',
              borderRadius: {
                xs: 2,
                sm: 2.5,
              },
              border:
                '1px solid rgba(255,255,255,0.07)',
              background:
                'linear-gradient(145deg, rgba(18,19,25,0.82), rgba(10,11,15,0.9))',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.025)',
            }}
          >
            <Typography
              sx={{
                color: '#F5F5F7',
                fontSize: {
                  xs: '0.82rem',
                  sm: '0.9rem',
                },
                fontWeight: 650,
                letterSpacing: '-0.02em',
              }}
            >
              Actividad
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color:
                  'rgba(245,245,247,0.35)',
                fontSize: {
                  xs: '0.64rem',
                  sm: '0.7rem',
                },
                lineHeight: 1.5,
              }}
            >
              Aquí mostraremos la actividad
              reciente.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};