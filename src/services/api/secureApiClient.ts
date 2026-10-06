import {
  decryptPayload,
  encryptPayload,
  generateRequestId,
  type PayloadEnvelope,
} from '../security/payloadEncryption';

import {
  getSecuritySession,
} from '../security/securitySession';

import {
  AUTH_SESSION_STORAGE_KEY,
} from '../../features/auth/auth.slice';

const API_URL = 'https://api.flowbercut.com';

interface SecureRequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

interface StoredAuthSession {
  accessToken: string;
  expiresAt: string;
}

const getAccessToken = (): string | null => {
  try {
    const storedSession =
      sessionStorage.getItem(
        AUTH_SESSION_STORAGE_KEY,
      );

    if (!storedSession) {
      return null;
    }

    const session =
      JSON.parse(
        storedSession,
      ) as StoredAuthSession;

    if (
      !session.accessToken ||
      !session.expiresAt
    ) {
      return null;
    }

    const expiresAt = new Date(
      session.expiresAt,
    ).getTime();

    if (
      Number.isNaN(expiresAt) ||
      expiresAt <= Date.now()
    ) {
      sessionStorage.removeItem(
        AUTH_SESSION_STORAGE_KEY,
      );

      return null;
    }

    return session.accessToken;
  } catch {
    return null;
  }
};

export async function secureApiRequest<TResponse>(
  path: string,
  options: SecureRequestOptions = {},
): Promise<TResponse> {
  const method = (
    options.method ?? 'GET'
  ).toUpperCase();

  const securitySession =
    await getSecuritySession();

  const requestId =
    generateRequestId();

  const accessToken =
    getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type':
      'application/json',

    'X-Flow-Session-Id':
      securitySession.sessionId,

    'X-Request-Id':
      requestId,

    ...(accessToken
      ? {
          Authorization:
            `Bearer ${accessToken}`,
        }
      : {}),

    ...options.headers,
  };

  const requestInit: RequestInit = {
    method,
    headers,
  };

  /**
   * GET y HEAD no pueden llevar body.
   * Los demás métodos utilizan el payload
   * cifrado de FLOWBERCUT.
   */
  if (
    method !== 'GET' &&
    method !== 'HEAD'
  ) {
    const envelope =
      await encryptPayload(
        options.body ?? {},
        securitySession.aesKey,
        securitySession.sessionId,
        securitySession.keyId,
        method,
        path,
        requestId,
      );

    requestInit.body =
      JSON.stringify(envelope);
  }

  const response = await fetch(
    `${API_URL}${path}`,
    requestInit,
  );

  if (!response.ok) {
    const contentType =
      response.headers.get(
        'content-type',
      ) ?? '';

    if (
      contentType.includes(
        'application/json',
      )
    ) {
      const errorBody =
        await response.json();

      throw new Error(
        errorBody.message ??
          `Error HTTP ${response.status}`,
      );
    }

    throw new Error(
      `Error HTTP ${response.status}`,
    );
  }

  const encryptedResponse =
    (await response.json()) as PayloadEnvelope;

  return decryptPayload<TResponse>(
    encryptedResponse,
    securitySession.aesKey,
    method,
    path,
    response.status,
  );
}