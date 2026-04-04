import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
    pool: 'forks',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: [
        'src/**/*.test.js',
        'src/index.js',
        'src/db.js',
      ],
      // Строки/функции/операторы — 100%. Ветки (||/??/тернарные варианты в admin/format) — целевой минимум.
      thresholds: {
        lines: 100,
        functions: 100,
        statements: 100,
        branches: 90,
      },
    },
  },
});
