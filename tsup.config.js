import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'build',
  target: 'node18',
  tsconfig: 'tsconfig.json',
  clean: true,
  sourcemap: true,
  splitting: false,
  external: ['@prisma/client', '.prisma/client'],
});
