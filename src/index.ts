import { createVerify, createPublicKey } from 'crypto';

/**
 * RSA Signature Verification Options
 */
export interface VerifyOptions {
  /**
   * The algorithm to use for verification (default: 'RSA-SHA256')
   */
  algorithm?: string;
  /**
   * The encoding of the signature (default: 'base64')
   */
  signatureEncoding?: BufferEncoding;
}

/**
 * Verify RSA signature
 * @param data - The original data that was signed
 * @param signature - The signature to verify
 * @param publicKey - The RSA public key (PEM format)
 * @param options - Optional verification parameters
 * @returns true if signature is valid, false otherwise
 */
export function verifySignature(
  data: string | Buffer,
  signature: string | Buffer,
  publicKey: string | Buffer,
  options: VerifyOptions = {}
): boolean {
  try {
    const {
      algorithm = 'RSA-SHA256',
      signatureEncoding = 'base64'
    } = options;

    // Create verify object
    const verify = createVerify(algorithm);
    
    // Update with data
    verify.update(data);
    
    // Verify signature
    const signatureBuffer = typeof signature === 'string' 
      ? Buffer.from(signature, signatureEncoding)
      : signature;
    
    return verify.verify(publicKey, signatureBuffer);
  } catch (error) {
    return false;
  }
}

/**
 * Verify RSA-SHA256 signature (convenience method)
 * @param data - The original data that was signed
 * @param signature - The signature to verify (base64 encoded)
 * @param publicKey - The RSA public key (PEM format)
 * @returns true if signature is valid, false otherwise
 */
export function verifySHA256(
  data: string | Buffer,
  signature: string,
  publicKey: string
): boolean {
  return verifySignature(data, signature, publicKey, {
    algorithm: 'RSA-SHA256',
    signatureEncoding: 'base64'
  });
}

/**
 * Verify RSA-SHA512 signature (convenience method)
 * @param data - The original data that was signed
 * @param signature - The signature to verify (base64 encoded)
 * @param publicKey - The RSA public key (PEM format)
 * @returns true if signature is valid, false otherwise
 */
export function verifySHA512(
  data: string | Buffer,
  signature: string,
  publicKey: string
): boolean {
  return verifySignature(data, signature, publicKey, {
    algorithm: 'RSA-SHA512',
    signatureEncoding: 'base64'
  });
}

/**
 * Extract and validate RSA public key
 * @param publicKey - The RSA public key in PEM format
 * @returns true if the key is valid, false otherwise
 */
export function validatePublicKey(publicKey: string | Buffer): boolean {
  try {
    createPublicKey(publicKey);
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
