import { Navigate, Outlet } from 'react-router-dom';

import {
  selectIsPlatformAdmin,
  selectUserRole,
} from '../../../features/auth/auth.selectors';

import {
  useAppSelector,
} from '../../../hooks/useAppSelector';

export const PlatformRoute = () => {
  const isPlatformAdmin =
    useAppSelector(
      selectIsPlatformAdmin,
    );

  const role =
    useAppSelector(
      selectUserRole,
    );

  const canAccessPlatform =
    isPlatformAdmin ||
    role === 'PLATFORM_ADMIN';

  if (!canAccessPlatform) {
    return (
      <Navigate
        to="/tenant/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
};