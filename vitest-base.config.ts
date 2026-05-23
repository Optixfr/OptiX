import { defineConfig } from 'vitest/config';

// Picked up by the Angular `@angular/build:unit-test` builder via
// `test.runnerConfig: true` in angular.json. The default 5s per-test timeout is
// too tight for the cold-start (first test in each file pays the Angular
// compile cost) when all spec files run in parallel, so we raise it.
export default defineConfig({
  test: {
    testTimeout: 30000,
    hookTimeout: 30000
  }
});
