export interface AuthTenant {
  id: number;
  codigo: string;
  nombre: string;
  subdominio: string;
}

export interface AuthUser {
  id: number;
  nombreUsuario: string;
  email: string;
  esAdministradorPlataforma: boolean;
  rolCodigo: string | null;
  rolNombre: string | null;
  tenant: AuthTenant;
}

export interface AuthSession {
  accessToken: string;
  expiresAt: string;
  usuario: AuthUser;
}

export interface AuthState {
  session: AuthSession | null;
  isAuthenticated: boolean;
}