import { defineConfig, devices } from '@playwright/test'
import path from 'path'

/**
 * Production-ready Playwright configuration for Next.js applications.
 *
 * Features:
 * - Parallel test execution
 * - Multiple browser support
 * - Mobile viewports
 * - Authentication state reuse
 * - CI/CD optimizations
 * - Comprehensive reporting
 */

// Read from environment or use defaults
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'
const isCI = !!process.env.CI

export default defineConfig({
  // Test directory
  testDir: './tests/e2e',

  // Test file pattern
  testMatch: '**/*.spec.ts',

  // Run tests in parallel
  fullyParallel: true,

  // Fail build on test.only in CI
  forbidOnly: isCI,

  // Retry failed tests (more in CI for flaky tests)
  retries: isCI ? 2 : 0,

  // Limit parallel workers in CI
  workers: isCI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    isCI ? ['github'] : ['list'],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for page.goto('/')
    baseURL,

    // Collect trace when retrying failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure (for debugging)
    video: isCI ? 'on-first-retry' : 'off',

    // Timeout for each action
    actionTimeout: 10000,

    // Timeout for navigation
    navigationTimeout: 30000,
  },

  // Configure projects for major browsers
  projects: [
    // Setup project for authentication
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      teardown: 'cleanup',
    },

    // Cleanup project
    {
      name: 'cleanup',
      testMatch: /.*\.teardown\.ts/,
    },

    // Desktop browsers with authentication
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
      dependencies: ['setup'],
    },

    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
      dependencies: ['setup'],
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
      dependencies: ['setup'],
    },

    // Unauthenticated tests (no dependencies)
    {
      name: 'unauthenticated',
      testMatch: '**/*.unauth.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Timeout for each test
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },

  // Run local dev server before tests
  webServer: {
    command: isCI ? 'npm run start' : 'npm run dev',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120000, // 2 minutes to start
    stdout: 'pipe',
    stderr: 'pipe',
  },

  // Output directory for test artifacts
  outputDir: 'test-results/',

  // Preserve output on failure
  preserveOutput: 'failures-only',

  // Global setup/teardown (optional)
  // globalSetup: './tests/e2e/global.setup.ts',
  // globalTeardown: './tests/e2e/global.teardown.ts',
})
