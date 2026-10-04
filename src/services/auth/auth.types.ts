export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  usuario: {
    id: number;
    nombreUsuario: string;
    email: string;
    esAdministradorPlataforma: boolean;
    rolCodigo: string | null;
    rolNombre: string | null;
    tenant: {
      id: number;
      codigo: string;
      nombre: string;
      subdominio: string;
    };
  };
}