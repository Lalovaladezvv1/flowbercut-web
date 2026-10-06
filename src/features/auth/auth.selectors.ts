import type { RootState } from '../../app/store/store';

export const selectAuthSession = (
  state: RootState,
) => state.auth.session;

export const selectIsAuthenticated = (
  state: RootState,
) => state.auth.isAuthenticated;

export const selectCurrentUser = (
  state: RootState,
) => state.auth.session?.usuario ?? null;

export const selectCurrentTenant = (
  state: RootState,
) => state.auth.session?.usuario.tenant ?? null;

export const selectTenantId = (
  state: RootState,
) =>
  state.auth.session?.usuario.tenant.id ?? null;

export const selectUserRole = (
  state: RootState,
) =>
  state.auth.session?.usuario.rolCodigo ?? null;

export const selectIsPlatformAdmin = (
  state: RootState,
) =>
  state.auth.session?.usuario
    .esAdministradorPlataforma ?? false;