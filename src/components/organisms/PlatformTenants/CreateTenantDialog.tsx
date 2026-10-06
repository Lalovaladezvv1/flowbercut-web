import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {
  CloseRounded,
  StorefrontRounded,
} from '@mui/icons-material';

import { GradientButton } from '../../atoms/GradientButton';

import type { CreateTenantRequest } from '../../../services/platformTenant';

interface CreateTenantDialogProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (request: CreateTenantRequest) => Promise<void>;
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

export function CreateTenantDialog({
  open,
  isLoading,
  onClose,
  onSubmit,
}: CreateTenantDialogProps) {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [subdominio, setSubdominio] = useState('');
  const [zonaHoraria, setZonaHoraria] =
    useState('America/Mexico_City');

  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setNombre('');
      setCodigo('');
      setSubdominio('');
      setZonaHoraria('America/Mexico_City');
      setError('');
    }
  }, [open]);

  const handleSubmit = async () => {
    const nombreValue = nombre.trim();
    const codigoValue = codigo.trim().toUpperCase();
    const subdominioValue = subdominio.trim().toLowerCase();
    const zonaHorariaValue = zonaHoraria.trim();

    if (!nombreValue) {
      setError('El nombre de la barbería es obligatorio.');
      return;
    }

    if (!codigoValue) {
      setError('El código de la barbería es obligatorio.');
      return;
    }

    if (!subdominioValue) {
      setError('El subdominio es obligatorio.');
      return;
    }

    if (!zonaHorariaValue) {
      setError('La zona horaria es obligatoria.');
      return;
    }

    setError('');

    await onSubmit({
      nombre: nombreValue,
      codigo: codigoValue,
      subdominio: subdominioValue,
      zonaHoraria: zonaHorariaValue,
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
                    'linear-gradient(135deg, rgba(10,132,255,0.20), rgba(100,210,255,0.10))',
                  border: '1px solid rgba(100,210,255,0.18)',
                }}
              >
                <StorefrontRounded
                  sx={{
                    color: '#64D2FF',
                    fontSize: 21,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                Nueva barbería
              </Typography>
            </Box>

            <Typography
              sx={{
                color: 'rgba(245,245,247,0.52)',
                fontSize: '0.82rem',
              }}
            >
              Registra una nueva barbería en FLOWBERCUT.
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            disabled={isLoading}
            sx={{
              color: 'rgba(245,245,247,0.45)',
              '&:hover': {
                color: '#F5F5F7',
                backgroundColor: 'rgba(255,255,255,0.06)',
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
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
            },
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(event) =>
              setNombre(event.target.value)
            }
            disabled={isLoading}
            sx={textFieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 300,
              },
            }}
          />

          <TextField
            fullWidth
            label="Código"
            value={codigo}
            onChange={(event) =>
              setCodigo(event.target.value)
            }
            disabled={isLoading}
            sx={textFieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
          />

          <TextField
            fullWidth
            label="Subdominio"
            value={subdominio}
            onChange={(event) =>
              setSubdominio(event.target.value)
            }
            disabled={isLoading}
            placeholder="TheBarberShop"
            helperText="Ejemplo: TheBarberShop.flowbercut.com"
            sx={{
              ...textFieldSx,
              '& .MuiFormHelperText-root': {
                color: 'rgba(245,245,247,0.40)',
                marginLeft: 0,
              },
            }}
            slotProps={{
              htmlInput: {
                maxLength: 200,
              },
            }}
          />

          <TextField
            fullWidth
            label="Zona horaria"
            value={zonaHoraria}
            onChange={(event) =>
              setZonaHoraria(event.target.value)
            }
            disabled={isLoading}
            sx={textFieldSx}
            slotProps={{
              htmlInput: {
                maxLength: 100,
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
              backgroundColor: 'rgba(255,55,95,0.07)',
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
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: '#F5F5F7',
            },
          }}
        >
          Cancelar
        </Button>

        <GradientButton
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={<StorefrontRounded />}
        >
          {isLoading ? 'Creando...' : 'Crear barbería'}
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
}