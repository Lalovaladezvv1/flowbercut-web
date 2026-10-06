import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AddBusinessRounded,
  BusinessRounded,
  CheckCircleRounded,
  RefreshRounded,
  StorefrontRounded,
} from '@mui/icons-material';

import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  alpha,
} from '@mui/material';

import {
  CreateTenantAdminDialog,
  CreateTenantDialog,
  PlatformTenantsTable,
  ResetTenantAdminPasswordDialog,
} from '../../components/organisms/PlatformTenants';

import {
  changeTenantStatus,
  createTenant,
  createTenantAdmin,
  getTenants,
  resetTenantAdminPassword,
  type CreateTenantAdminRequest,
  type CreateTenantRequest,
  type ResetTenantAdminPasswordRequest,
  type Tenant,
} from '../../services/platformTenant';
import { GradientButton } from '../../components/atoms/GradientButton';

export const PlatformBarberiasPage = () => {
  const [tenants, setTenants] =
    useState<Tenant[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isCreating, setIsCreating] =
    useState(false);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedTenant, setSelectedTenant] =
    useState<Tenant | null>(null);

  const [adminDialogOpen, setAdminDialogOpen] =
    useState(false);

  const [
    resetPasswordDialogOpen,
    setResetPasswordDialogOpen,
  ] = useState(false);

  const [
    isAdminActionLoading,
    setIsAdminActionLoading,
  ] = useState(false);

  const [search, setSearch] =
    useState('');

  const [error, setError] =
    useState('');

  const loadTenants = useCallback(
    async () => {
      console.log(
        '[Barberías] 1. loadTenants iniciado',
      );

      try {
        setError('');
        setIsLoading(true);

        console.log(
          '[Barberías] 2. llamando getTenants()',
        );

        const response =
          await getTenants();

        console.log(
          '[Barberías] 3. respuesta recibida:',
          response,
        );

        setTenants(response);
      } catch (requestError) {
        console.error(
          '[Barberías] ERROR:',
          requestError,
        );

        setError(
          'No fue posible cargar las barberías.',
        );
      } finally {
        console.log(
          '[Barberías] 4. loadTenants finalizado',
        );

        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadTenants();
  }, [loadTenants]);

  const filteredTenants =
    useMemo(() => {
      const normalizedSearch =
        search.trim().toLowerCase();

      if (!normalizedSearch) {
        return tenants;
      }

      return tenants.filter(
        (tenant) =>
          tenant.nombre
            .toLowerCase()
            .includes(normalizedSearch) ||
          tenant.codigo
            .toLowerCase()
            .includes(normalizedSearch) ||
          tenant.subdominio
            .toLowerCase()
            .includes(normalizedSearch),
      );
    }, [search, tenants]);

  const activeTenants =
    tenants.filter(
      (tenant) =>
        tenant.estatusCodigo ===
        'ACTIVO',
    ).length;

  const handleCreateTenant = async (
    request: CreateTenantRequest,
  ) => {
    try {
      setIsCreating(true);
      setError('');

      const tenant =
        await createTenant(request);

      setTenants((current) => [
        tenant,
        ...current,
      ]);

      setDialogOpen(false);
    } catch (requestError) {
      console.error(
        '[Barberías] Error creando barbería:',
        requestError,
      );

      setError(
        'No fue posible crear la barbería.',
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateAdmin = (
    tenant: Tenant,
  ) => {
    setSelectedTenant(tenant);
    setAdminDialogOpen(true);
  };

  const handleResetPassword = (
    tenant: Tenant,
  ) => {
    setSelectedTenant(tenant);
    setResetPasswordDialogOpen(true);
  };

  const handleChangeStatus = async (
    tenant: Tenant,
  ) => {
    try {
      setError('');

      const nextStatusId =
        tenant.estatusId === 1
          ? 2
          : 1;

      const updatedTenant =
        await changeTenantStatus(
          tenant.id,
          nextStatusId,
        );

      setTenants((current) =>
        current.map((item) =>
          item.id === updatedTenant.id
            ? updatedTenant
            : item,
        ),
      );
    } catch (requestError) {
      console.error(
        '[Barberías] Error cambiando estatus:',
        requestError,
      );

      setError(
        'No fue posible cambiar el estado de la barbería.',
      );
    }
  };

  const handleCreateAdminSubmit =
    async (
      request: CreateTenantAdminRequest,
    ) => {
      if (!selectedTenant) {
        return;
      }

      try {
        setIsAdminActionLoading(true);
        setError('');

        await createTenantAdmin(
          selectedTenant.id,
          request,
        );

        setAdminDialogOpen(false);
        setSelectedTenant(null);

        await loadTenants();
      } catch (requestError) {
        console.error(
          '[Barberías] Error creando administrador:',
          requestError,
        );

        setError(
          'No fue posible crear el administrador.',
        );
      } finally {
        setIsAdminActionLoading(false);
      }
    };

  const handleResetPasswordSubmit =
    async (
      request: ResetTenantAdminPasswordRequest,
    ) => {
      if (!selectedTenant) {
        return;
      }

      try {
        setIsAdminActionLoading(true);
        setError('');

        await resetTenantAdminPassword(
          selectedTenant.id,
          request,
        );

        setResetPasswordDialogOpen(false);
        setSelectedTenant(null);
      } catch (requestError) {
        console.error(
          '[Barberías] Error cambiando contraseña:',
          requestError,
        );

        setError(
          'No fue posible cambiar la contraseña.',
        );
      } finally {
        setIsAdminActionLoading(false);
      }
    };

  const handleCloseAdminDialog = () => {
    if (isAdminActionLoading) {
      return;
    }

    setAdminDialogOpen(false);
    setSelectedTenant(null);
  };

  const handleCloseResetPasswordDialog =
    () => {
      if (isAdminActionLoading) {
        return;
      }

      setResetPasswordDialogOpen(false);
      setSelectedTenant(null);
    };

  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 0,
        maxWidth: 1500,
        mx: 'auto',
        pb: {
          xs: 3,
          sm: 4,
          md: 5,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
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
          gap: 2,
          mb: {
            xs: 2.5,
            md: 3.5,
          },
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h1"
            sx={{
              color: '#F5F5F7',
              fontSize: {
                xs: '1.55rem',
                sm: '1.9rem',
                md: '2.15rem',
              },
              lineHeight: 1.1,
              fontWeight: 750,
              letterSpacing: '-0.045em',
            }}
          >
            Barberías
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              color: alpha(
                '#F5F5F7',
                0.46,
              ),
              fontSize: {
                xs: '0.78rem',
                sm: '0.84rem',
              },
            }}
          >
            Administra las barberías que
            forman parte de FLOWBERCUT.
          </Typography>
        </Box>

        <GradientButton
          startIcon={<AddBusinessRounded />}
          onClick={() => setDialogOpen(true)}
        >
          Nueva barbería
        </GradientButton>
      </Box>

      {/* KPIs */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 1.5,
          mb: {
            xs: 2,
            md: 2.5,
          },
        }}
      >
        <Kpi
          icon={<BusinessRounded />}
          label="Barberías"
          value={tenants.length}
          accent="#0A84FF"
        />

        <Kpi
          icon={<CheckCircleRounded />}
          label="Activas"
          value={activeTenants}
          accent="#64D2FF"
        />

        <Kpi
          icon={<StorefrontRounded />}
          label="Resultados"
          value={filteredTenants.length}
          accent="#BF5AF2"
        />
      </Box>

      {/* Toolbar */}
      <Box
        sx={{
          width: '100%',
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 1.5,
        }}
      >
        <TextField
          fullWidth
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Buscar barbería..."
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2.5,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessRounded
                    sx={{
                      color: alpha(
                        '#F5F5F7',
                        0.3,
                      ),
                      fontSize: 19,
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />

        <IconButton
          onClick={() =>
            void loadTenants()
          }
          disabled={isLoading}
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            color: alpha(
              '#F5F5F7',
              0.48,
            ),
            border:
              '1px solid rgba(255,255,255,0.08)',
            borderRadius: 2.5,

            '&:hover': {
              color: '#64D2FF',
              backgroundColor: alpha(
                '#64D2FF',
                0.06,
              ),
            },
          }}
        >
          <RefreshRounded
            sx={{
              animation: isLoading
                ? 'spin 1s linear infinite'
                : 'none',

              '@keyframes spin': {
                from: {
                  transform:
                    'rotate(0deg)',
                },
                to: {
                  transform:
                    'rotate(360deg)',
                },
              },
            }}
          />
        </IconButton>
      </Box>

      {error && (
        <Box
          sx={{
            mb: 1.5,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            backgroundColor:
              alpha('#FF375F', 0.07),
            border:
              '1px solid rgba(255,55,95,0.14)',
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

      {/* Table */}
      <PlatformTenantsTable
        tenants={filteredTenants}
        isLoading={isLoading}
        onCreateAdmin={
          handleCreateAdmin
        }
        onResetPassword={
          handleResetPassword
        }
        onChangeStatus={
          handleChangeStatus
        }
      />

      {/* Crear barbería */}
      <CreateTenantDialog
        open={dialogOpen}
        isLoading={isCreating}
        onClose={() =>
          setDialogOpen(false)
        }
        onSubmit={handleCreateTenant}
      />

      {/* Crear administrador */}
      <CreateTenantAdminDialog
        open={adminDialogOpen}
        tenantName={
          selectedTenant?.nombre ?? ''
        }
        isLoading={
          isAdminActionLoading
        }
        onClose={
          handleCloseAdminDialog
        }
        onSubmit={
          handleCreateAdminSubmit
        }
      />

      {/* Cambiar contraseña */}
      <ResetTenantAdminPasswordDialog
        open={
          resetPasswordDialogOpen
        }
        tenantName={
          selectedTenant?.nombre ?? ''
        }
        adminEmail={
          selectedTenant?.usuarioEmail ??
          null
        }
        isLoading={
          isAdminActionLoading
        }
        onClose={
          handleCloseResetPasswordDialog
        }
        onSubmit={
          handleResetPasswordSubmit
        }
      />
    </Box>
  );
};

interface KpiProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent: string;
}

const Kpi = ({
  icon,
  label,
  value,
  accent,
}: KpiProps) => (
  <Box
    sx={{
      minWidth: 0,
      p: 2,
      borderRadius: 2.5,
      background:
        'linear-gradient(145deg, rgba(24,24,30,0.74), rgba(12,12,16,0.86))',
      border:
        '1px solid rgba(255,255,255,0.07)',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,0.03)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter:
        'blur(20px)',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.2,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          flexShrink: 0,
          borderRadius: 1.8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: accent,
          backgroundColor:
            alpha(accent, 0.09),
          border: `1px solid ${alpha(
            accent,
            0.14,
          )}`,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: alpha(
              '#F5F5F7',
              0.4,
            ),
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            mt: 0.15,
            color: '#F5F5F7',
            fontSize: '1.25rem',
            lineHeight: 1.1,
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  </Box>
);