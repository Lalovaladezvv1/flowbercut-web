import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import {
  AdminPanelSettingsRounded,
  CloseRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@mui/icons-material';

import { GradientButton } from '../../atoms/GradientButton';

import type { CreateTenantAdminRequest } from '../../../services/platformTenant';

interface CreateTenantAdminDialogProps {
  open: boolean;
  tenantName: string;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (
    request: CreateTenantAdminRequest,
  ) => Promise<void>;
}

const textFieldSx = {
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.045)',
    color: '#F5F5F7',
    borderRadius: 1.5,
  },

  '& .MuiInputBase-input': {
    color: '#F5F5F7',
    WebkitTextFillColor: '#F5F5F7',
  },

  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(245, 245, 247, 0.45)',
    opacity: 1,
  },

  '& .MuiInputLabel-root': {
    color: 'rgba(245, 245, 247, 0.58)',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#64D2FF',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(100, 210, 255, 0.45)',
  },

  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
      borderColor: '#64D2FF',
      borderWidth: 1,
    },
};

const dialogPaperSx = {
  background:
    'linear-gradient(145deg, rgba(20, 22, 30, 0.97), rgba(12, 13, 18, 0.98))',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 3,
  boxShadow:
    '0 24px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
};

export function CreateTenantAdminDialog({
  open,
  tenantName,
  isLoading,
  onClose,
  onSubmit,
}: CreateTenantAdminDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
      setError('');
    }
  }, [open]);

  const handleSubmit = async () => {
    const emailValue = email.trim().toLowerCase();

    if (!emailValue) {
      setError(
        'El correo electrónico es obligatorio.',
      );
      return;
    }

    if (!emailValue.includes('@')) {
      setError(
        'Ingresa un correo electrónico válido.',
      );
      return;
    }

    if (!password) {
      setError('La contraseña es obligatoria.');
      return;
    }

    if (password.length < 8) {
      setError(
        'La contraseña debe tener al menos 8 caracteres.',
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');

    await onSubmit({
      email: emailValue,
      password,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: dialogPaperSx,
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 3,
          pt: 2.8,
          pb: 1,
          color: '#F5F5F7',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                mb: 0.7,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background:
                    'linear-gradient(135deg, rgba(191,90,242,0.18), rgba(100,210,255,0.10))',
                  border:
                    '1px solid rgba(191,90,242,0.18)',
                }}
              >
                <AdminPanelSettingsRounded
                  sx={{
                    color: '#BF5AF2',
                    fontSize: 21,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                }}
              >
                Crear administrador
              </Typography>
            </Box>

            <Typography
              sx={{
                color: 'rgba(245,245,247,0.52)',
                fontSize: '0.82rem',
              }}
            >
              {tenantName || 'Barbería'}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            disabled={isLoading}
            sx={{
              color: 'rgba(245,245,247,0.45)',
              '&:hover': {
                color: '#F5F5F7',
                backgroundColor:
                  'rgba(255,255,255,0.06)',
              },
            }}
          >
            <CloseRounded />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          pt: 2.5,
          pb: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            disabled={isLoading}
            sx={textFieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 320,
                autoComplete: 'email',
              },
            }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            disabled={isLoading}
            sx={textFieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 200,
                autoComplete: 'new-password',
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          (current) => !current,
                        )
                      }
                      edge="end"
                      disabled={isLoading}
                      sx={{
                        color:
                          'rgba(245,245,247,0.55)',
                        '&:hover': {
                          color: '#64D2FF',
                          backgroundColor:
                            'rgba(100,210,255,0.06)',
                        },
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOffRounded />
                      ) : (
                        <VisibilityRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Confirmar contraseña"
            type={
              showConfirmPassword
                ? 'text'
                : 'password'
            }
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value,
              )
            }
            disabled={isLoading}
            sx={textFieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 200,
                autoComplete: 'new-password',
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current,
                        )
                      }
                      edge="end"
                      disabled={isLoading}
                      sx={{
                        color:
                          'rgba(245,245,247,0.55)',
                        '&:hover': {
                          color: '#64D2FF',
                          backgroundColor:
                            'rgba(100,210,255,0.06)',
                        },
                      }}
                    >
                      {showConfirmPassword ? (
                        <VisibilityOffRounded />
                      ) : (
                        <VisibilityRounded />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {error && (
          <Box
            sx={{
              mt: 2,
              px: 1.7,
              py: 1.2,
              borderRadius: 1.8,
              backgroundColor:
                'rgba(255,55,95,0.07)',
              border:
                '1px solid rgba(255,55,95,0.16)',
            }}
          >
            <Typography
              sx={{
                color: '#FF375F',
                fontSize: '0.8rem',
              }}
            >
              {error}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2.5,
          pt: 1,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={isLoading}
          sx={{
            borderRadius: 1.8,
            textTransform: 'none',
            fontWeight: 600,
            color: 'rgba(245,245,247,0.62)',
            '&:hover': {
              backgroundColor:
                'rgba(255,255,255,0.05)',
              color: '#F5F5F7',
            },
          }}
        >
          Cancelar
        </Button>

        <GradientButton
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={
            <AdminPanelSettingsRounded />
          }
        >
          {isLoading
            ? 'Creando...'
            : 'Crear administrador'}
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
}