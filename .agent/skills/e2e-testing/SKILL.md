---
name: e2e-testing
description: 'Set up and execute end-to-end (E2E) tests for Next.js applications using Playwright. Use this skill when: (1) Setting up E2E testing infrastructure in a Next.js project, (2) Writing new E2E tests for user flows, (3) Configuring CI/CD pipelines for E2E tests, (4) Debugging flaky or failing E2E tests, (5) Implementing authentication testing, (6) Adding visual regression or accessibility testing. Supports Playwright with Next.js App Router and Pages Router.'
---

# E2E Testing for Next.js

Set up robust end-to-end testing for Next.js applications using Playwright.

## Table of Contents

1. [Setup](#setup)
2. [Test Structure](#test-structure)
3. [Writing Tests](#writing-tests)
4. [Configuration](#configuration)
5. [Debugging](#debugging)
6. [CI/CD Integration](#cicd-integration)
7. [Best Practices](#best-practices)

## Setup

### Quick Start (New Project)

Run the setup script to initialize Playwright in the project:

```bash
# Install Playwright
npm init playwright@latest

# Or with specific options
npm init playwright@latest -- --quiet
```

### Manual Setup (Existing Project)

1. Install dependencies:

```bash
npm install -D @playwright/test
npx playwright install
```

2. Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

3. Add npm scripts to `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

4. Create directory structure:

```
tests/
└── e2e/
    ├── fixtures/          # Test fixtures and utilities
    │   └── base.ts
    ├── pages/             # Page Object Models
    │   └── home.page.ts
    ├── specs/             # Test specifications
    │   └── home.spec.ts
    └── utils/             # Helper utilities
        └── test-data.ts
```

## Test Structure

### Page Object Model Pattern

Create reusable page objects in `tests/e2e/pages/`:

```typescript
// tests/e2e/pages/home.page.ts
import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly heading: Locator
  readonly navLinks: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { level: 1 })
    this.navLinks = page.getByRole('navigation').getByRole('link')
  }

  async goto() {
    await this.page.goto('/')
  }

  async clickNavLink(name: string) {
    await this.navLinks.filter({ hasText: name }).click()
  }
}
```

### Custom Fixtures

Extend Playwright fixtures for reusable setup:

```typescript
// tests/e2e/fixtures/base.ts
import { test as base } from '@playwright/test'
import { HomePage } from '../pages/home.page'

type Fixtures = {
  homePage: HomePage
}

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await homePage.goto()
    await use(homePage)
  },
})

export { expect } from '@playwright/test'
```

### Test Specification

```typescript
// tests/e2e/specs/home.spec.ts
import { test, expect } from '../fixtures/base'

test.describe('Home Page', () => {
  test('displays the main heading', async ({ homePage }) => {
    await expect(homePage.heading).toBeVisible()
  })

  test('navigates to about page', async ({ homePage, page }) => {
    await homePage.clickNavLink('About')
    await expect(page).toHaveURL('/about')
  })
})
```

## Writing Tests

### Selecting Elements (Priority Order)

Use semantic selectors for stability:

```typescript
// 1. Role-based (BEST - accessibility-friendly)
page.getByRole('button', { name: 'Submit' })
page.getByRole('heading', { level: 1 })
page.getByRole('link', { name: 'Home' })

// 2. Label-based
page.getByLabel('Email')
page.getByPlaceholder('Enter email')
page.getByText('Welcome')

// 3. Test ID (for complex scenarios)
page.getByTestId('login-form')

// 4. CSS/XPath (LAST RESORT)
page.locator('button.submit')
```

### Common Patterns

**Navigation Testing:**

```typescript
test('navigation works correctly', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Contact' }).click()
  await expect(page).toHaveURL('/contact')
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible()
})
```

**Form Testing:**

```typescript
test('form submission works', async ({ page }) => {
  await page.goto('/contact')

  await page.getByLabel('Name').fill('John Doe')
  await page.getByLabel('Email').fill('john@example.com')
  await page.getByLabel('Message').fill('Hello!')

  await page.getByRole('button', { name: 'Submit' }).click()

  await expect(page.getByText('Message sent!')).toBeVisible()
})
```

**API Mocking:**

```typescript
test('handles API response', async ({ page }) => {
  // Mock API before navigation
  await page.route('/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify([{ id: 1, name: 'Test User' }]),
    })
  })

  await page.goto('/users')
  await expect(page.getByText('Test User')).toBeVisible()
})
```

**Waiting for Elements:**

```typescript
// Auto-waiting (preferred)
await expect(page.getByText('Loaded')).toBeVisible()

// Explicit wait
await page.waitForSelector('[data-testid="content"]')

// Wait for network
await page.waitForResponse('/api/data')
```

### Authentication Testing

See **references/authentication.md** for complete authentication patterns including:

- Login flow testing
- Session persistence
- Protected route testing
- OAuth mocking

## Configuration

### Environment Variables

Create `.env.test` for test-specific configuration:

```env
# Test environment
NEXT_PUBLIC_API_URL=http://localhost:3000/api
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=testpass123
```

### Production Build Testing

For accurate test results, test against production build:

```typescript
// playwright.config.ts
webServer: {
  command: process.env.CI
    ? 'npm run start'
    : 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
},
```

### Mobile Testing

Add mobile viewport testing:

```typescript
// playwright.config.ts
projects: [
  // ... desktop projects
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
],
```

## Debugging

### Interactive Mode

```bash
# UI mode for visual debugging
npx playwright test --ui

# Debug mode with inspector
npx playwright test --debug

# Head mode to see browser
npx playwright test --headed
```

### Trace Viewer

```bash
# View trace after failed test
npx playwright show-trace trace.zip
```

### VS Code Extension

Install "Playwright Test for VS Code" for:

- Run/debug tests from editor
- Record new tests
- Generate locators

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/e2e.yml
name: E2E Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Best Practices

### DO ✅

1. **Use semantic selectors** - `getByRole`, `getByLabel`, `getByText`
2. **Isolate tests** - Each test should be independent
3. **Mock external APIs** - Don't depend on third-party services
4. **Test user flows** - Focus on real user journeys
5. **Add data-testid** - For complex dynamic elements only
6. **Run against production builds** - More accurate results
7. **Use fixtures** - For reusable setup and teardown

### DON'T ❌

1. **Don't use arbitrary waits** - Use `expect` auto-waiting
2. **Don't test implementation** - Test behavior, not internal state
3. **Don't share state** - Avoid test dependencies
4. **Don't use fragile selectors** - Avoid `.class-name`, nth-child
5. **Don't test third-party code** - Mock external services

### Naming Conventions

```typescript
// Test files: feature.spec.ts
// Page objects: feature.page.ts
// Fixtures: base.ts or feature.fixture.ts

test.describe('Feature Name', () => {
  test('should [expected behavior] when [condition]', async () => {
    // ...
  })
})
```

## Resources

- **references/authentication.md**: Authentication testing patterns
- **references/accessibility.md**: A11y testing setup
- **references/visual-regression.md**: Screenshot comparison testing
- **scripts/setup-e2e.sh**: Automated project setup script
- **assets/playwright.config.ts**: Production-ready config template
- **assets/github-workflow.yml**: CI/CD workflow template
