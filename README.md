# rsa-verify

RSA signature verification library (RSA密钥验签)

A TypeScript library for verifying RSA signatures, built with tsdown for multiple module formats.

## Features

- ✅ RSA signature verification
- ✅ Support for multiple hash algorithms (SHA256, SHA512, etc.)
- ✅ TypeScript support with type definitions
- ✅ Multiple module formats: CommonJS (`.cjs`), ESM (`.mjs`)
- ✅ Built with tsdown for optimal bundle size
- ✅ Public key validation

## Installation

```bash
npm install rsa-verify
```

## Usage

### ES Modules (ESM)

```typescript
import { verifySignature, verifySHA256, validatePublicKey } from 'rsa-verify';

const data = 'Hello, World!';
const signature = 'base64-encoded-signature';
const publicKey = `-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----`;

// Verify with default SHA256
const isValid = verifySHA256(data, signature, publicKey);
console.log('Signature valid:', isValid);

// Verify with custom options
const isValidCustom = verifySignature(data, signature, publicKey, {
  algorithm: 'RSA-SHA512',
  signatureEncoding: 'base64'
});

// Validate public key
const keyValid = validatePublicKey(publicKey);
console.log('Public key valid:', keyValid);
```

### CommonJS

```javascript
const { verifySignature, verifySHA256 } = require('rsa-verify');

const data = 'Hello, World!';
const signature = 'base64-encoded-signature';
const publicKey = `-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----`;

const isValid = verifySHA256(data, signature, publicKey);
console.log('Signature valid:', isValid);
```

## API

### `verifySignature(data, signature, publicKey, options?)`

Verify an RSA signature with custom options.

**Parameters:**
- `data` (string | Buffer): The original data that was signed
- `signature` (string | Buffer): The signature to verify
- `publicKey` (string | Buffer): The RSA public key (PEM format)
- `options` (VerifyOptions, optional): Verification options
  - `algorithm` (string): Hash algorithm (default: 'RSA-SHA256')
  - `signatureEncoding` (BufferEncoding): Signature encoding (default: 'base64')
  - `keyFormat` ('pem' | 'der'): Public key format (default: 'pem')

**Returns:** `boolean` - true if signature is valid, false otherwise

### `verifySHA256(data, signature, publicKey)`

Convenience method to verify RSA-SHA256 signatures.

**Parameters:**
- `data` (string | Buffer): The original data that was signed
- `signature` (string): The base64-encoded signature to verify
- `publicKey` (string): The RSA public key (PEM format)

**Returns:** `boolean` - true if signature is valid, false otherwise

### `verifySHA512(data, signature, publicKey)`

Convenience method to verify RSA-SHA512 signatures.

**Parameters:**
- `data` (string | Buffer): The original data that was signed
- `signature` (string): The base64-encoded signature to verify
- `publicKey` (string): The RSA public key (PEM format)

**Returns:** `boolean` - true if signature is valid, false otherwise

### `validatePublicKey(publicKey)`

Validate that a public key is in the correct format.

**Parameters:**
- `publicKey` (string | Buffer): The RSA public key to validate

**Returns:** `boolean` - true if the key is valid, false otherwise

## Build

This library is built using [tsdown](https://tsdown.dev/):

```bash
npm run build
```

Output formats:
- CommonJS: `dist/index.cjs` with types `dist/index.d.cts`
- ESM: `dist/index.mjs` with types `dist/index.d.mts`

## License

ISC

