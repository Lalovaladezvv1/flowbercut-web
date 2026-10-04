import {
  decryptPayload,
  encryptPayload,
  generateRequestId,
  type PayloadEnvelope,
} from '../security/payloadEncryption';
import { getSecuritySession } from '../security/securitySession';

const API_URL = 'http://localhost:5237';

interface SecureRequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function secureApiRequest<TResponse>(
  path: string,
  options: SecureRequestOptions = {},
): Promise<TResponse> {
  const method = (options.method ?? 'GET').toUpperCase();

  const securitySession = await getSecuritySession();

  const requestId = generateRequestId();

  const envelope = await encryptPayload(
    options.body ?? {},
    securitySession.aesKey,
    securitySession.sessionId,
    securitySession.keyId,
    method,
    path,
    requestId,
  );

  const response = await fetch(
    `${API_URL}${path}`,
    {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Flow-Session-Id':
          securitySession.sessionId,
        'X-Request-Id': requestId,
        ...options.headers,
      },
      body: JSON.stringify(envelope),
    },
  );

  if (!response.ok) {
    const contentType =
      response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      const errorBody = await response.json();

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