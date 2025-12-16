function pemToSpki(pem: string): ArrayBuffer {
  const trimmed = pem
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/\s/g, '');
  if (!trimmed) throw new Error('Invalid PEM: no content');
  const binary = atob(trimmed);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function verifySignature(
  data: string,
  signature: string,
  publicKey: string,
  options?: { hashAlgorithm?: 'SHA-256' | 'SHA-512' }
): Promise<boolean> {
  const { hashAlgorithm = 'SHA-256' } = options || {};
  try {
    // 编码原始数据
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    // 解码 Base64 签名
    const sigBase64 = signature.trim().replace(/-/g, '+').replace(/_/g, '/');
    const sigBinary = atob(sigBase64);
    const sigBuffer = Uint8Array.from(sigBinary, c => c.charCodeAt(0));

    // 导入公钥
    const spki = pemToSpki(publicKey);
    const cryptoKey = await crypto.subtle.importKey(
      'spki',
      spki,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: { name: hashAlgorithm },
      },
      true,
      ['verify']
    );

    // 执行验证
    return await crypto.subtle.verify(
      { name: 'RSASSA-PKCS1-v1_5' },
      cryptoKey,
      sigBuffer,
      dataBuffer
    );
  } catch (error) {
    console.warn('Verification failed:', error);
    return false;
  }
}

/**
 * 显式使用 SHA-256 验签
 */
export async function verifySHA256(
  data: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  return verifySignature(data, signature, publicKey, { hashAlgorithm: 'SHA-256' });
}

export async function verifySHA512(
  data: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  return verifySignature(data, signature, publicKey, { hashAlgorithm: 'SHA-512' });
}

export function validatePublicKey(publicKey: string): boolean {
  if (typeof publicKey !== 'string') return false;
  const trimmed = publicKey.trim();
  if (!trimmed.startsWith('-----BEGIN PUBLIC KEY-----')) return false;
  if (!trimmed.endsWith('-----END PUBLIC KEY-----')) return false;

  // 提取中间内容
  const content = trimmed
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s/g, '');

  if (!content) return false;

  // 检查是否为合法 Base64
  try {
    const decoded = atob(content);
    return decoded.length > 0;
  } catch (e) {
    return false;
  }
}

export default {
  verifySignature,
  verifySHA256,
  verifySHA512,
  validatePublicKey
};