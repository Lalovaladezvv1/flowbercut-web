import { Navigate, Outlet } from 'react-router-dom';

import {
  selectIsPlatformAdmin,
  selectTenantId,
  selectUserRole,
} from '../../../features/auth/auth.selectors';

import {
  useAppSelector,
} from '../../../hooks/useAppSelector';

export const TenantRoute = () => {
  const isPlatformAdmin =
    useAppSelector(
      selectIsPlatformAdmin,
    );

  const role =
    useAppSelector(
      selectUserRole,
    );

  const tenantId =
    useAppSelector(
      selectTenantId,
    );

  if (isPlatformAdmin) {
    return (
      <Navigate
        to="/platform/dashboard"
        replace
      />
    );
  }

  if (
    role !== 'TENANT_ADMIN' ||
    !tenantId
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};