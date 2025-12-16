import JSEncrypt from 'jsencrypt';

/**
 * RSA Signature Verification Options
 */
export interface VerifyOptions {
  /**
   * The hash algorithm to use for verification (default: 'SHA256')
   */
  hashAlgorithm?: 'SHA256' | 'SHA512';
}

/**
 * Convert data to string if needed
 */
function toString(data: string | ArrayBuffer | Uint8Array): string {
  if (typeof data === 'string') {
    return data;
  }
  if (data instanceof ArrayBuffer) {
    return new TextDecoder().decode(data);
  }
  if (data instanceof Uint8Array) {
    return new TextDecoder().decode(data);
  }
  return String(data);
}

/**
 * Verify RSA signature using jsencrypt
 * @param data - The original data that was signed
 * @param signature - The signature to verify (base64 encoded or hex string)
 * @param publicKey - The RSA public key (PEM format)
 * @param options - Optional verification parameters
 * @returns true if signature is valid, false otherwise
 */
export function verifySignature(
  data: string | ArrayBuffer | Uint8Array,
  signature: string | ArrayBuffer | Uint8Array,
  publicKey: string | ArrayBuffer,
  options: VerifyOptions = {}
): boolean {
  try {
    const { hashAlgorithm = 'SHA256' } = options;
    
    // Convert inputs to strings
    const dataString = toString(data);
    const signatureString = toString(signature);
    const publicKeyString = typeof publicKey === 'string' 
      ? publicKey 
      : new TextDecoder().decode(publicKey as ArrayBuffer);

    // Create JSEncrypt instance
    const encryptor = new JSEncrypt({ default_key_size: "2048" });
    encryptor.setPublicKey(publicKeyString);

    // Verify signature using jsencrypt's verify method
    // jsencrypt.verify(data, signature, hashAlgorithm)
    const isValid = encryptor.verify(dataString, signatureString, () => hashAlgorithm);
    
    return isValid;
  } catch (error) {
    return false;
  }
}

/**
 * Verify RSA-SHA256 signature (convenience method)
 * @param data - The original data that was signed
 * @param signature - The signature to verify
 * @param publicKey - The RSA public key (PEM format)
 * @returns true if signature is valid, false otherwise
 */
export function verifySHA256(
  data: string | ArrayBuffer | Uint8Array,
  signature: string | ArrayBuffer | Uint8Array,
  publicKey: string | ArrayBuffer
): boolean {
  return verifySignature(data, signature, publicKey, {
    hashAlgorithm: 'SHA256',
  });
}

/**
 * Verify RSA-SHA512 signature (convenience method)
 * @param data - The original data that was signed
 * @param signature - The signature to verify
 * @param publicKey - The RSA public key (PEM format)
 * @returns true if signature is valid, false otherwise
 */
export function verifySHA512(
  data: string | ArrayBuffer | Uint8Array,
  signature: string | ArrayBuffer | Uint8Array,
  publicKey: string | ArrayBuffer
): boolean {
  return verifySignature(data, signature, publicKey, {
    hashAlgorithm: 'SHA512',
  });
}

/**
 * Extract and validate RSA public key
 * @param publicKey - The RSA public key in PEM format
 * @returns true if the key is valid, false otherwise
 */
export function validatePublicKey(publicKey: string | ArrayBuffer): boolean {
  try {
    const publicKeyString = typeof publicKey === 'string' 
      ? publicKey 
      : new TextDecoder().decode(publicKey as ArrayBuffer);
    
    const encryptor = new JSEncrypt({ default_key_size: "2048" });
    encryptor.setPublicKey(publicKeyString);
    
    return true;
  } catch (error) {
    return false;
  }
}

// Export all functions
export default {
  verifySignature,
  verifySHA256,
  verifySHA512,
  validatePublicKey
};
