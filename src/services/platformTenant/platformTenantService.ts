import { secureApiRequest } from '../api/secureApiClient';

import type {
  CreateTenantAdminRequest,
  CreateTenantRequest,
  ResetTenantAdminPasswordRequest,
  Tenant,
  TenantAdminResponse,
} from './platformTenant.types';

export async function getTenants(): Promise<Tenant[]> {
  return secureApiRequest<Tenant[]>(
    '/api/v1/platform/barberias',
    {
      method: 'GET',
    },
  );
}

export async function createTenant(
  request: CreateTenantRequest,
): Promise<Tenant> {
  return secureApiRequest<Tenant>(
    '/api/v1/platform/barberias',
    {
      method: 'POST',
      body: request,
    },
  );
}

export async function createTenantAdmin(
  tenantId: number,
  request: CreateTenantAdminRequest,
): Promise<TenantAdminResponse> {
  return secureApiRequest<TenantAdminResponse>(
    `/api/v1/platform/barberias/${tenantId}/administrador`,
    {
      method: 'POST',
      body: request,
    },
  );
}

export async function resetTenantAdminPassword(
  tenantId: number,
  request: ResetTenantAdminPasswordRequest,
): Promise<TenantAdminResponse> {
  return secureApiRequest<TenantAdminResponse>(
    `/api/v1/platform/barberias/${tenantId}/administrador/contrasena`,
    {
      method: 'PUT',
      body: request,
    },
  );
}

export async function changeTenantStatus(
  tenantId: number,
  estatusId: number,
): Promise<Tenant> {
  return secureApiRequest<Tenant>(
    `/api/v1/platform/barberias/${tenantId}/estatus`,
    {
      method: 'PATCH',
      body: estatusId,
    },
  );
}