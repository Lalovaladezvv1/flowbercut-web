interface PublicKeyResponse {
  keyId: string;
  algorithm: string;
  publicKey: string;
}

interface SecuritySessionResponse {
  sessionId: string;
  keyId: string;
  algorithm: string;
  expiresAt: string;
}

const API_URL = 'https://api.flowbercut.com';

let session: {
  sessionId: string;
  keyId: string;
  expiresAt: string;
  aesKey: CryptoKey;
} | null = null;

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')
    .replace(/\s/g, '');

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

async function getPublicKey(): Promise<PublicKeyResponse> {
  const response = await fetch(
    `${API_URL}/api/v1/security/public-key`,
  );

  if (!response.ok) {
    throw new Error('No se pudo obtener la llave pública.');
  }

  return response.json();
}

async function importPublicKey(
  pem: string,
): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'spki',
    pemToArrayBuffer(pem),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    false,
    ['encrypt'],
  );
}

function arrayBufferToBase64(
  buffer: ArrayBuffer,
): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

async function createSecuritySession(): Promise<void> {
  const publicKeyData = await getPublicKey();

  const publicKey = await importPublicKey(
    publicKeyData.publicKey,
  );

  const aesKey = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );

  const rawAesKey = await crypto.subtle.exportKey(
    'raw',
    aesKey,
  );

  const wrappedKey = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    rawAesKey,
  );

  const response = await fetch(
    `${API_URL}/api/v1/security/session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyId: publicKeyData.keyId,
        wrappedKey: arrayBufferToBase64(wrappedKey),
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      'No se pudo crear la sesión de cifrado.',
    );
  }

  const data =
    (await response.json()) as SecuritySessionResponse;

  session = {
    sessionId: data.sessionId,
    keyId: data.keyId,
    expiresAt: data.expiresAt,
    aesKey,
  };
}

export async function getSecuritySession() {
  if (!session) {
    await createSecuritySession();
  }

  return session!;
}