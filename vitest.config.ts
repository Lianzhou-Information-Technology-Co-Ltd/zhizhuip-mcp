import { defineConfig } from 'vitest/config';

// tsc 会把 test/ 也编译进 dist/，不限定目录的话编译出来的测试会被再跑一遍
export default defineConfig({ test: { include: ['test/**/*.test.ts'] } });
