import { useState } from 'react';

import {
  ArrowBack,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  alpha,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { GradientButton } from '../../components/atoms/GradientButton';
import { AnimatedBackground } from '../../components/organisms/AnimatedBackground';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

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

      {/* Regresar */}
      <IconButton
        onClick={() => navigate('/')}
        aria-label="Regresar"
        sx={{
          position: 'absolute',
          top: 'max(16px, env(safe-area-inset-top))',
          left: {
            xs: 16,
            sm: 24,
          },
          zIndex: 3,
          width: {
            xs: 48,
            sm: 52,
          },
          height: {
            xs: 48,
            sm: 52,
          },
          color: '#F5F5F7',
          border: `1px solid ${alpha('#F5F5F7', 0.12)}`,
          backgroundColor: alpha('#FFFFFF', 0.025),
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',

          '&:hover': {
            borderColor: alpha('#64D2FF', 0.4),
            backgroundColor: alpha('#64D2FF', 0.05),
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Contenido */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          minWidth: 0,

          display: 'flex',
          justifyContent: 'center',

          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },

          overflowY: {
            xs: 'auto',
            sm: 'hidden',
          },

          overflowX: 'hidden',

          px: {
            xs: 1.5,
            sm: 3,
          },

          pt: {
            xs: 'clamp(96px, 16vh, 128px)',
            sm: 3,
          },

          pb: {
            xs: 3,
            sm: 3,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 440,
            minWidth: 0,

            p: {
              xs: 2,
              sm: 4,
            },

            borderRadius: {
              xs: 3,
              sm: 4,
            },

            background:
              'linear-gradient(145deg, rgba(24,24,30,0.92), rgba(12,12,16,0.96))',

            border: '1px solid rgba(255,255,255,0.09)',

            boxShadow: `
              0 30px 80px rgba(0,0,0,0.45),
              inset 0 1px 0 rgba(255,255,255,0.04)
            `,

            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',

            boxSizing: 'border-box',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              mb: {
                xs: 1.25,
                sm: 3,
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
                  xs: 'min(175px, 58vw)',
                  sm: 240,
                },

                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',

                userSelect: 'none',
                pointerEvents: 'none',

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

          {/* Header */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',

              mb: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Typography
              component="h1"
              sx={{
                color: '#F5F5F7',
                fontWeight: 700,

                fontSize: {
                  xs: '1.3rem',
                  sm: '1.7rem',
                },

                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                m: 0,
              }}
            >
              Bienvenido de nuevo
            </Typography>

            <Typography
              component="p"
              sx={{
                color: alpha('#F5F5F7', 0.58),

                fontSize: {
                  xs: '0.82rem',
                  sm: '0.95rem',
                },

                lineHeight: 1.5,

                mt: 0.7,
                mb: 0,
              }}
            >
              Ingresa a tu cuenta para continuar
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={(event) => event.preventDefault()}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',

              gap: {
                xs: 1.5,
                sm: 2.2,
              },
            }}
          >
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: alpha('#F5F5F7', 0.55),
                },

                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#64D2FF',
                },

                '& .MuiOutlinedInput-root': {
                  color: '#F5F5F7',
                  backgroundColor: alpha('#FFFFFF', 0.035),
                  borderRadius: 2.5,

                  '& fieldset': {
                    borderColor: alpha('#FFFFFF', 0.10),
                  },

                  '&:hover fieldset': {
                    borderColor: alpha('#64D2FF', 0.35),
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#0A84FF',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': {
                  color: alpha('#F5F5F7', 0.55),
                },

                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#64D2FF',
                },

                '& .MuiOutlinedInput-root': {
                  color: '#F5F5F7',
                  backgroundColor: alpha('#FFFFFF', 0.035),
                  borderRadius: 2.5,

                  '& fieldset': {
                    borderColor: alpha('#FFFFFF', 0.10),
                  },

                  '&:hover fieldset': {
                    borderColor: alpha('#64D2FF', 0.35),
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: '#0A84FF',
                  },
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={() =>
                          setShowPassword((current) => !current)
                        }
                        edge="end"
                        aria-label={
                          showPassword
                            ? 'Ocultar contraseña'
                            : 'Mostrar contraseña'
                        }
                        sx={{
                          color: alpha('#F5F5F7', 0.45),

                          '&:hover': {
                            color: '#64D2FF',
                          },
                        }}
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',

                mt: {
                  xs: 0,
                  sm: 1,
                },
              }}
            >
              <GradientButton
                type="submit"
                startIcon={<LockOutlined />}
              >
                Ingresar
              </GradientButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;