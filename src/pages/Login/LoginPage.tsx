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
  const [loginError, setLoginError] = useState(false);

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

      <IconButton
        onClick={() => navigate('/')}
        aria-label="Regresar"
        sx={{
          position: 'absolute',
          top: {
            xs: 16,
            sm: 24,
          },
          left: {
            xs: 16,
            sm: 24,
          },
          zIndex: 3,
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

      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          px: {
            xs: 2,
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
              xs: 2.5,
              sm: 4,
            },
            borderRadius: 4,
            background:
              'linear-gradient(145deg, rgba(24,24,30,0.92), rgba(12,12,16,0.96))',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: `
              0 30px 80px rgba(0,0,0,0.45),
              inset 0 1px 0 rgba(255,255,255,0.04)
            `,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
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
                xs: 2,
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
                  xs: 'min(220px, 70vw)',
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
                xs: 2.5,
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
                  xs: '1.45rem',
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
                  xs: '0.85rem',
                  sm: '0.95rem',
                },
                lineHeight: 1.5,
                mt: 0.8,
                mb: 0,
              }}
            >
              Ingresa a tu cuenta para continuar
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              setLoginError(true);
            }}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: {
                xs: 1.8,
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
              onChange={() => setLoginError(false)}
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
              onChange={() => setLoginError(false)}
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
                  xs: 0.5,
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

            {loginError && (
              <Box
                role="alert"
                sx={{
                  mt: 0.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: 2.5,
                  border: `1px solid ${alpha('#FF375F', 0.22)}`,
                  backgroundColor: alpha('#FF375F', 0.07),
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    color: '#FF8FA3',
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    lineHeight: 1.45,
                  }}
                >
                  No se pudo acceder por ahora.
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
