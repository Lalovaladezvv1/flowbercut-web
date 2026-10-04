import {
  secureApiRequest,
} from '../api/secureApiClient';

import type {
  LoginRequest,
  LoginResponse,
} from './auth.types';

export async function login(
  request: LoginRequest,
): Promise<LoginResponse> {
  return secureApiRequest<LoginResponse>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: request,
    },
  );
}