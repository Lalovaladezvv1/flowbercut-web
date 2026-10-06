import { useState } from 'react';

import {
  BusinessRounded,
  CheckCircleRounded,
  ContentCopyRounded,
  KeyRounded,
  MoreHorizRounded,
  PowerSettingsNewRounded,
} from '@mui/icons-material';

import {
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';

import type { Tenant } from '../../../services/platformTenant';

interface PlatformTenantsTableProps {
  tenants: Tenant[];
  isLoading: boolean;
  onCreateAdmin: (tenant: Tenant) => void;
  onResetPassword: (tenant: Tenant) => void;
  onChangeStatus: (tenant: Tenant) => void;
}

export const PlatformTenantsTable = ({
  tenants,
  isLoading,
  onCreateAdmin,
  onResetPassword,
  onChangeStatus,
}: PlatformTenantsTableProps) => {
  const [menuAnchorEl, setMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const [selectedTenant, setSelectedTenant] =
    useState<Tenant | null>(null);

  const menuOpen = Boolean(menuAnchorEl);

  const handleCopySubdomain = async (
    subdomain: string,
  ) => {
    await navigator.clipboard.writeText(
      `${subdomain}.flowbercut.com`,
    );
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    tenant: Tenant,
  ) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedTenant(tenant);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
    setSelectedTenant(null);
  };

  const handleAdminAction = () => {
    if (!selectedTenant) {
      return;
    }

    const tenant = selectedTenant;

    handleCloseMenu();

    if (tenant.tieneUsuario) {
      onResetPassword(tenant);
      return;
    }

    onCreateAdmin(tenant);
  };

  const handleStatusAction = () => {
    if (!selectedTenant) {
      return;
    }

    const tenant = selectedTenant;

    handleCloseMenu();

    onChangeStatus(tenant);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: '100%',
          minWidth: 0,
          overflowX: 'auto',
          borderRadius: 3,
          background:
            'linear-gradient(145deg, rgba(24,24,30,0.78), rgba(12,12,16,0.88))',
          border:
            '1px solid rgba(255,255,255,0.08)',
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.035)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <Table
          sx={{
            minWidth: {
              xs: 760,
              md: 820,
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: alpha('#F5F5F7', 0.42),
                  borderBottom:
                    '1px solid rgba(255,255,255,0.07)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Barbería
              </TableCell>

              <TableCell
                sx={{
                  color: alpha('#F5F5F7', 0.42),
                  borderBottom:
                    '1px solid rgba(255,255,255,0.07)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Subdominio
              </TableCell>

              <TableCell
                sx={{
                  color: alpha('#F5F5F7', 0.42),
                  borderBottom:
                    '1px solid rgba(255,255,255,0.07)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Zona horaria
              </TableCell>

              <TableCell
                sx={{
                  color: alpha('#F5F5F7', 0.42),
                  borderBottom:
                    '1px solid rgba(255,255,255,0.07)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Estado
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  color: alpha('#F5F5F7', 0.42),
                  borderBottom:
                    '1px solid rgba(255,255,255,0.07)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{
                    py: 7,
                    borderBottom: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      color: alpha(
                        '#F5F5F7',
                        0.5,
                      ),
                      fontSize: '0.9rem',
                    }}
                  >
                    Cargando barberías...
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              tenants.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{
                      py: 8,
                      borderBottom: 'none',
                    }}
                  >
                    <BusinessRounded
                      sx={{
                        fontSize: 42,
                        color: alpha(
                          '#64D2FF',
                          0.35,
                        ),
                        mb: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        color: '#F5F5F7',
                        fontWeight: 600,
                      }}
                    >
                      No hay barberías registradas
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        color: alpha(
                          '#F5F5F7',
                          0.42,
                        ),
                        fontSize: '0.8rem',
                      }}
                    >
                      Crea la primera barbería de
                      FLOWBERCUT.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

            {!isLoading &&
              tenants.map((tenant) => (
                <TableRow
                  key={tenant.id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor:
                        alpha(
                          '#64D2FF',
                          0.025,
                        ),
                    },

                    '&:last-child td': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      borderBottom:
                        '1px solid rgba(255,255,255,0.055)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          flexShrink: 0,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background:
                            'linear-gradient(145deg, rgba(10,132,255,0.16), rgba(100,210,255,0.07))',
                          border:
                            '1px solid rgba(100,210,255,0.12)',
                        }}
                      >
                        <BusinessRounded
                          sx={{
                            fontSize: 19,
                            color: '#64D2FF',
                          }}
                        />
                      </Box>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            color: '#F5F5F7',
                            fontSize: '0.88rem',
                            fontWeight: 650,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {tenant.nombre}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.25,
                            color: alpha(
                              '#F5F5F7',
                              0.38,
                            ),
                            fontSize: '0.72rem',
                          }}
                        >
                          {tenant.codigo}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom:
                        '1px solid rgba(255,255,255,0.055)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: alpha(
                            '#F5F5F7',
                            0.72,
                          ),
                          fontSize: '0.82rem',
                          fontFamily:
                            'ui-monospace, SFMono-Regular, Menlo, monospace',
                        }}
                      >
                        {tenant.subdominio}
                        .flowbercut.com
                      </Typography>

                      <Tooltip title="Copiar">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleCopySubdomain(
                              tenant.subdominio,
                            )
                          }
                          sx={{
                            color: alpha(
                              '#F5F5F7',
                              0.35,
                            ),

                            '&:hover': {
                              color: '#64D2FF',
                              backgroundColor:
                                alpha(
                                  '#64D2FF',
                                  0.08,
                                ),
                            },
                          }}
                        >
                          <ContentCopyRounded
                            sx={{
                              fontSize: 15,
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      color: alpha(
                        '#F5F5F7',
                        0.62,
                      ),
                      borderBottom:
                        '1px solid rgba(255,255,255,0.055)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {tenant.zonaHoraria}
                  </TableCell>

                  <TableCell
                    sx={{
                      borderBottom:
                        '1px solid rgba(255,255,255,0.055)',
                    }}
                  >
                    <Chip
                      icon={
                        <CheckCircleRounded
                          sx={{
                            fontSize:
                              '14px !important',
                          }}
                        />
                      }
                      label={tenant.estatusNombre}
                      size="small"
                      sx={{
                        height: 27,
                        color:
                          tenant.estatusId === 1
                            ? '#64D2FF'
                            : alpha(
                                '#F5F5F7',
                                0.55,
                              ),
                        backgroundColor:
                          tenant.estatusId === 1
                            ? alpha(
                                '#64D2FF',
                                0.08,
                              )
                            : alpha(
                                '#F5F5F7',
                                0.06,
                              ),
                        border:
                          tenant.estatusId === 1
                            ? '1px solid rgba(100,210,255,0.16)'
                            : '1px solid rgba(255,255,255,0.08)',
                        fontSize: '0.7rem',
                        fontWeight: 600,

                        '& .MuiChip-icon': {
                          color:
                            tenant.estatusId === 1
                              ? '#64D2FF'
                              : alpha(
                                  '#F5F5F7',
                                  0.45,
                                ),
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      borderBottom:
                        '1px solid rgba(255,255,255,0.055)',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={(event) =>
                        handleOpenMenu(
                          event,
                          tenant,
                        )
                      }
                      sx={{
                        color: alpha(
                          '#F5F5F7',
                          0.42,
                        ),

                        '&:hover': {
                          color: '#F5F5F7',
                          backgroundColor:
                            alpha(
                              '#F5F5F7',
                              0.06,
                            ),
                        },
                      }}
                    >
                      <MoreHorizRounded />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 220,
              borderRadius: 2.5,
              background:
                'linear-gradient(145deg, rgba(24,24,30,0.98), rgba(12,12,16,0.99))',
              border:
                '1px solid rgba(255,255,255,0.08)',
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.45)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter:
                'blur(24px)',
              color: '#F5F5F7',
            },
          },
        }}
      >
        <MenuItem
          onClick={handleAdminAction}
          sx={{
            gap: 1.2,
            py: 1.2,
            fontSize: '0.84rem',
            color: '#F5F5F7',

            '&:hover': {
              backgroundColor: alpha(
                '#64D2FF',
                0.08,
              ),
            },
          }}
        >
          <KeyRounded
            sx={{
              fontSize: 19,
              color: '#64D2FF',
            }}
          />

          {selectedTenant?.tieneUsuario
            ? 'Cambiar contraseña'
            : 'Crear administrador'}
        </MenuItem>

        <MenuItem
          onClick={handleStatusAction}
          sx={{
            gap: 1.2,
            py: 1.2,
            fontSize: '0.84rem',
            color: '#F5F5F7',

            '&:hover': {
              backgroundColor: alpha(
                selectedTenant?.estatusId === 1
                  ? '#FF375F'
                  : '#64D2FF',
                0.08,
              ),
            },
          }}
        >
          <PowerSettingsNewRounded
            sx={{
              fontSize: 19,
              color:
                selectedTenant?.estatusId === 1
                  ? '#FF375F'
                  : '#64D2FF',
            }}
          />

          {selectedTenant?.estatusId === 1
            ? 'Deshabilitar'
            : 'Habilitar'}
        </MenuItem>
      </Menu>
    </>
  );
};