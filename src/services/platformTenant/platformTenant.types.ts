export interface Tenant {
  id: number;
  codigo: string;
  nombre: string;
  subdominio: string;
  zonaHoraria: string;
  estatusId: number;
  estatusCodigo: string;
  estatusNombre: string;
  fechaCreacion: string;

  tieneUsuario: boolean;
  usuarioId: number | null;
  usuarioEmail: string | null;
}

export interface CreateTenantRequest {
  codigo: string;
  nombre: string;
  subdominio: string;
  zonaHoraria: string;
}

export interface CreateTenantAdminRequest {
  email: string;
  password: string;
}

export interface ResetTenantAdminPasswordRequest {
  password: string;
}

export interface TenantAdminResponse {
  id: number;
  tenantId: number;
  nombreUsuario: string;
  email: string;
}