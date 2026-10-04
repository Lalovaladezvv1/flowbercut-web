export interface PayloadEnvelope {
  version: number;
  algorithm: string;
  keyId: string;
  sessionId: string;
  requestId: string;
  timestamp: number;
  iv: string;
  ciphertext: string;
  tag: string;
}

function toBase64(value: ArrayBuffer): string {
  const bytes = new Uint8Array(value);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function fromBase64(value: string): ArrayBuffer {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

export function generateRequestId(): string {
  return crypto.randomUUID().replaceAll('-', '');
}

function buildRequestAad(
  sessionId: string,
  requestId: string,
  method: string,
  path: string,
  timestamp: number,
): ArrayBuffer {
  const value =
    `request|${sessionId}|${requestId}|${method}|${path}|${timestamp}`;

  return new TextEncoder().encode(value).buffer;
}

function buildResponseAad(
  sessionId: string,
  requestId: string,
  method: string,
  path: string,
  statusCode: number,
  timestamp: number,
): ArrayBuffer {
  const value =
    `response|${sessionId}|${requestId}|${method}|${path}|${statusCode}|${timestamp}`;

  return new TextEncoder().encode(value).buffer;
}

export async function encryptPayload<T>(
  payload: T,
  key: CryptoKey,
  sessionId: string,
  keyId: string,
  method: string,
  path: string,
  requestId: string,
): Promise<PayloadEnvelope> {
  const timestamp = Date.now();

  const iv = crypto.getRandomValues(new Uint8Array(12));

  const plaintext = new TextEncoder().encode(
    JSON.stringify(payload),
  );

  const aad = buildRequestAad(
    sessionId,
    requestId,
    method,
    path,
    timestamp,
  );

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv.buffer,
      additionalData: aad,
      tagLength: 128,
    },
    key,
    plaintext.buffer,
  );

  const encryptedBytes = new Uint8Array(encrypted);

  const ciphertext = encryptedBytes.slice(
    0,
    encryptedBytes.length - 16,
  );

  const tag = encryptedBytes.slice(
    encryptedBytes.length - 16,
  );

  return {
    version: 1,
    algorithm: 'A256GCM',
    keyId,
    sessionId,
    requestId,
    timestamp,
    iv: toBase64(iv.buffer),
    ciphertext: toBase64(ciphertext.buffer),
    tag: toBase64(tag.buffer),
  };
}

export async function decryptPayload<T>(
  envelope: PayloadEnvelope,
  key: CryptoKey,
  method: string,
  path: string,
  statusCode: number,
): Promise<T> {
  const iv = new Uint8Array(
    fromBase64(envelope.iv),
  );

  const ciphertext = new Uint8Array(
    fromBase64(envelope.ciphertext),
  );

  const tag = new Uint8Array(
    fromBase64(envelope.tag),
  );

  const encrypted = new Uint8Array(
    ciphertext.length + tag.length,
  );

  encrypted.set(ciphertext, 0);
  encrypted.set(tag, ciphertext.length);

  const aad = buildResponseAad(
    envelope.sessionId,
    envelope.requestId,
    method,
    path,
    statusCode,
    envelope.timestamp,
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv.buffer,
      additionalData: aad,
      tagLength: 128,
    },
    key,
    encrypted.buffer,
  );

  const json = new TextDecoder().decode(decrypted);

  return JSON.parse(json) as T;
}