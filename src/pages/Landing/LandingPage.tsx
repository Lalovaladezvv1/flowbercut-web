import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArrowForward,
  AutoAwesome,
  Login,
} from '@mui/icons-material';

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Typography,
  alpha,
} from '@mui/material';

import { GradientButton } from '../../components/atoms/GradientButton';
import { AnimatedBackground } from '../../components/organisms/AnimatedBackground';

export const LandingPage = () => {
  const navigate = useNavigate();

  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleClientLogin = () => {
    navigate('/login');
  };

  const handleJoin = () => {
    setShowComingSoon(true);
  };

  const handleCloseComingSoon = () => {
    setShowComingSoon(false);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        background: `
          radial-gradient(
            circle at 15% 20%,
            ${alpha('#0A84FF', 0.16)} 0%,
            transparent 32%
          ),
          radial-gradient(
            circle at 85% 20%,
            ${alpha('#BF5AF2', 0.14)} 0%,
            transparent 30%
          ),
          radial-gradient(
            circle at 70% 85%,
            ${alpha('#64D2FF', 0.10)} 0%,
            transparent 28%
          ),
          linear-gradient(
            135deg,
            #050507 0%,
            #0B1020 38%,
            #111426 68%,
            #07141C 100%
          )
        `,
      }}
    >
      <AnimatedBackground />

      {/* Header */}
      <Box
        component="header"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          pt: {
            xs: 2,
            sm: 2.5,
          },
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Login />}
          onClick={handleClientLogin}
          sx={{
            minWidth: 0,
            minHeight: 40,
            px: 2,
            borderRadius: 999,
            color: '#F5F5F7',
            borderColor: alpha('#F5F5F7', 0.12),
            backgroundColor: alpha('#FFFFFF', 0.025),
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            textTransform: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: `0 4px 20px ${alpha('#000000', 0.15)}`,
            transition: 'all 180ms ease',

            '&:hover': {
              borderColor: alpha('#64D2FF', 0.4),
              backgroundColor: alpha('#64D2FF', 0.05),
              boxShadow: `0 0 20px ${alpha('#0A84FF', 0.1)}`,
              transform: 'translateY(-1px)',
            },
          }}
        >
          Ya soy cliente
        </Button>
      </Box>

      {/* Main */}
      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          px: 2,
        }}
      >
        {/* ÚNICO EJE CENTRAL DEL HERO */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 760,
              minWidth: 0,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              mt: {
                xs: 1,
                md: -3,
              },
            }}
          >
            {/* LOGO */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: {
                  xs: 2.5,
                  sm: 3,
                  md: 3.5,
                },
              }}
            >
              <Box
                component="img"
                src="/brand/flowbercut-logo.png"
                alt="FLOWBERCUT — Your barbershop, in flow."
                sx={{
                  display: 'block',
                  width: {
                    xs: 'min(430px, 88vw)',
                    sm: 'min(560px, 72vw)',
                    md: 'min(680px, 68vw)',
                  },
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  transform: 'translateX(0)',
                  filter: `
                    drop-shadow(
                      0 0 22px ${alpha('#0A84FF', 0.12)}
                    )
                    drop-shadow(
                      0 0 36px ${alpha('#BF5AF2', 0.07)}
                    )
                  `,
                }}
              />
            </Box>

            {/* TEXTO */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 1,
              }}
            >
              {/* Categorías */}
              <Typography
                component="span"
                sx={{
                  color: alpha('#64D2FF', 0.72),
                  fontSize: {
                    xs: '0.62rem',
                    sm: '0.68rem',
                    md: '0.72rem',
                  },
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                Gestión · Clientes · Crecimiento
              </Typography>

              {/* Headline */}
              <Typography
                component="h1"
                sx={{
                  width: '100%',
                  maxWidth: 720,
                  m: 0,
                  textAlign: 'center',
                  color: '#F5F5F7',
                  fontWeight: 700,
                  fontSize: {
                    xs: '1.55rem',
                    sm: '2rem',
                    md: '2.5rem',
                  },
                  lineHeight: 1.08,
                  letterSpacing: '-0.045em',
                }}
              >
                Tu barbería,{' '}
                <Box
                  component="span"
                  sx={{
                    background:
                      'linear-gradient(90deg, #64D2FF 0%, #0A84FF 45%, #BF5AF2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  más simple.
                </Box>
                <br />
                Más organizada.{' '}
                <Box
                  component="span"
                  sx={{
                    background:
                      'linear-gradient(90deg, #BF5AF2 0%, #C56BFF 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Más tuya.
                </Box>
              </Typography>

              {/* Supporting text */}
              <Typography
                component="p"
                sx={{
                  width: '100%',
                  maxWidth: 650,
                  m: 0,
                  textAlign: 'center',
                  color: alpha('#F5F5F7', 0.78),
                  fontSize: {
                    xs: '0.82rem',
                    sm: '0.92rem',
                    md: '1rem',
                  },
                  lineHeight: 1.55,
                  fontWeight: 400,
                }}
              >
                Organiza tus citas, clientes y servicios en un solo lugar
                <br />
                y dedica más tiempo a lo que realmente importa:{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#64D2FF',
                    fontWeight: 600,
                    textShadow: `0 0 18px ${alpha('#64D2FF', 0.18)}`,
                  }}
                >
                  hacer crecer tu negocio.
                </Box>
              </Typography>
            </Box>

            {/* BOTÓN */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: {
                  xs: 2.5,
                  sm: 3,
                  md: 3.5,
                },
              }}
            >
              <GradientButton
                endIcon={<ArrowForward />}
                onClick={handleJoin}
              >
                Quiero unirme
              </GradientButton>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: 'absolute',
          bottom: {
            xs: 14,
            sm: 18,
            md: 22,
          },
          left: 0,
          right: 0,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Typography
          component="span"
          sx={{
            color: alpha('#F5F5F7', 0.28),
            fontSize: {
              xs: '0.62rem',
              sm: '0.68rem',
              md: '0.72rem',
            },
            fontWeight: 400,
            letterSpacing: '0.02em',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          Built with flow by{' '}
          <Box
            component="a"
            href="https://eduardovaladez.dev/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: alpha('#64D2FF', 0.58),
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 180ms ease, text-shadow 180ms ease',

              '&:hover': {
                color: '#64D2FF',
                textShadow: `0 0 14px ${alpha('#64D2FF', 0.35)}`,
              },
            }}
          >
            EduardoValadez.dev
          </Box>
        </Typography>
      </Box>

      {/* Coming Soon Dialog */}
      <Dialog
        open={showComingSoon}
        onClose={handleCloseComingSoon}
        fullWidth
        maxWidth="xs"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.72)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            },
          },

          paper: {
            sx: {
              width: '100%',
              margin: 2,
              overflow: 'hidden',
              borderRadius: 4,

              backgroundColor: '#101116 !important',

              backgroundImage: `
                radial-gradient(
                  circle at 15% 0%,
                  rgba(10, 132, 255, 0.14) 0%,
                  transparent 45%
                ),
                radial-gradient(
                  circle at 90% 100%,
                  rgba(191, 90, 242, 0.12) 0%,
                  transparent 45%
                )
              `,

              border: '1px solid rgba(255, 255, 255, 0.10)',

              boxShadow: `
                0 30px 80px rgba(0, 0, 0, 0.65),
                0 0 50px rgba(10, 132, 255, 0.10)
              `,

              color: '#F5F5F7',
            },
          },
        }}
      >
        <DialogContent
          sx={{
            backgroundColor: '#101116 !important',
            color: '#F5F5F7',

            px: {
              xs: 3,
              sm: 4,
            },

            py: {
              xs: 4,
              sm: 4.5,
            },

            textAlign: 'center',
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 58,
              height: 58,
              mx: 'auto',
              mb: 2.5,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              borderRadius: '50%',

              background: `
                linear-gradient(
                  135deg,
                  rgba(100, 210, 255, 0.16) 0%,
                  rgba(191, 90, 242, 0.18) 100%
                )
              `,

              border: '1px solid rgba(100, 210, 255, 0.20)',

              boxShadow: `
                0 0 30px rgba(10, 132, 255, 0.16),
                inset 0 0 20px rgba(255, 255, 255, 0.04)
              `,
            }}
          >
            <AutoAwesome
              sx={{
                fontSize: 27,
                color: '#64D2FF',
                filter:
                  'drop-shadow(0 0 8px rgba(100, 210, 255, 0.45))',
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            component="h2"
            sx={{
              color: '#F5F5F7 !important',
              fontSize: {
                xs: '1.35rem',
                sm: '1.5rem',
              },
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              mb: 1.5,
            }}
          >
            Estamos construyendo
            <br />
            algo especial.
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              color: 'rgba(245, 245, 247, 0.68) !important',
              fontSize: '0.92rem',
              lineHeight: 1.65,
              maxWidth: 390,
              mx: 'auto',
            }}
          >
            FLOWBERCUT está en construcción.
            <br />
            Muy pronto podrás gestionar tu barbería
            <br />
            de una forma completamente diferente.
          </Typography>

          {/* Button */}
          <Button
            onClick={handleCloseComingSoon}
            variant="contained"
            sx={{
              mt: 3.5,
              minHeight: 44,
              px: 3.5,
              borderRadius: 999,
              textTransform: 'none',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#FFFFFF',

              background:
                'linear-gradient(90deg, #0A84FF 0%, #BF5AF2 100%)',

              boxShadow:
                '0 8px 24px rgba(10, 132, 255, 0.22)',

              transition: 'all 180ms ease',

              '&:hover': {
                background:
                  'linear-gradient(90deg, #0A84FF 0%, #BF5AF2 100%)',

                boxShadow:
                  '0 10px 30px rgba(191, 90, 242, 0.28)',

                transform: 'translateY(-1px)',
              },
            }}
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};