// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  // CommonJS
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cjs/index.cjs',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          emitDeclarationOnly: false,
          outDir: 'dist/cjs'
        }
      })
    ],
  },

  // ES Module
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/mjs/index.mjs',
      format: 'esm'
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          emitDeclarationOnly: false,
          outDir: 'dist/mjs'
        }
      })
    ],
  },

  // UMD
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/lib/rsa-verify.js',
      format: 'iife',
      name: 'RSAVerify',
      exports: 'named'
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          declaration: false,
          outDir: 'dist/lib'
        }
      })
    ]
  }
];