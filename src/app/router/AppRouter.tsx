import { Route, Routes } from 'react-router-dom';

import { PlatformLayout } from '../../layouts/PlatformLayout';

import { LandingPage } from '../../pages/Landing';
import { LoginPage } from '../../pages/Login';
import { PlatformDashboardPage } from '../../pages/PlatformDashboard';
import { TenantDashboardPage } from '../../pages/TenantDashboard';

import { ProtectedRoute } from './guards/ProtectedRoute';
import { PlatformRoute } from './guards/PlatformRoute';
import { TenantRoute } from './guards/TenantRoute';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Authenticated */}
      <Route element={<ProtectedRoute />}>
        {/* Platform */}
        <Route element={<PlatformRoute />}>
          <Route
            path="/platform"
            element={<PlatformLayout />}
          >
            <Route
              path="dashboard"
              element={
                <PlatformDashboardPage />
              }
            />
          </Route>
        </Route>

        {/* Tenant */}
        <Route element={<TenantRoute />}>
          <Route
            path="/tenant/dashboard"
            element={
              <TenantDashboardPage />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};