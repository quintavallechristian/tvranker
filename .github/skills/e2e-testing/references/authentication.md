# Authentication Testing Patterns

Comprehensive guide for testing authentication flows in Next.js applications.

## Table of Contents

1. [Login Flow Testing](#login-flow-testing)
2. [Session Persistence](#session-persistence)
3. [Protected Routes](#protected-routes)
4. [Global Authentication Setup](#global-authentication-setup)
5. [OAuth Mocking](#oauth-mocking)
6. [Multi-User Testing](#multi-user-testing)

## Login Flow Testing

### Basic Login Test

```typescript
import { test, expect } from '@playwright/test'

test('user can log in with valid credentials', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('Email').fill('user@example.com')
  await page.getByLabel('Password').fill('password123')
  await page.getByRole('button', { name: 'Sign in' }).click()

  // Verify successful login
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText('Welcome back')).toBeVisible()
})

test('shows error for invalid credentials', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('Email').fill('wrong@example.com')
  await page.getByLabel('Password').fill('wrongpassword')
  await page.getByRole('button', { name: 'Sign in' }).click()

  await expect(page.getByText('Invalid credentials')).toBeVisible()
  await expect(page).toHaveURL('/login')
})
```

### Login Page Object

```typescript
// tests/e2e/pages/login.page.ts
import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.getByLabel('Email')
    this.passwordInput = page.getByLabel('Password')
    this.submitButton = page.getByRole('button', { name: /sign in/i })
    this.errorMessage = page.getByRole('alert')
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message)
  }
}
```

## Session Persistence

### Reusing Authentication State

Save authentication state and reuse across tests:

```typescript
// tests/e2e/auth.setup.ts
import { test as setup, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '../.auth/user.json')

setup('authenticate', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL!)
  await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD!)
  await page.getByRole('button', { name: 'Sign in' }).click()

  // Wait for authentication to complete
  await expect(page).toHaveURL('/dashboard')

  // Save signed-in state
  await page.context().storageState({ path: authFile })
})
```

### Configure Project to Use Saved Auth

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  projects: [
    // Setup project - runs first
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // Authenticated tests
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'tests/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Unauthenticated tests - no dependencies
    {
      name: 'unauthenticated',
      testMatch: /.*\.unauth\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
```

### Test with Authenticated User

```typescript
// tests/e2e/specs/dashboard.spec.ts
import { test, expect } from '@playwright/test'

// This test runs with pre-authenticated state
test('authenticated user sees dashboard', async ({ page }) => {
  await page.goto('/dashboard')

  // No need to log in - session is already active
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})
```

## Protected Routes

### Testing Route Protection

```typescript
test.describe('Protected Routes', () => {
  test('redirects unauthenticated users to login', async ({ page }) => {
    // Clear any auth state
    await page.context().clearCookies()

    await page.goto('/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })

  test('shows 403 for unauthorized resources', async ({ page }) => {
    await page.goto('/admin/settings')

    await expect(page.getByText('Access Denied')).toBeVisible()
  })
})
```

### Testing Different User Roles

```typescript
// tests/e2e/fixtures/auth.fixture.ts
import { test as base } from '@playwright/test'

type AuthFixtures = {
  adminPage: Page
  userPage: Page
}

export const test = base.extend<AuthFixtures>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'tests/.auth/admin.json',
    })
    const page = await context.newPage()
    await use(page)
    await context.close()
  },

  userPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'tests/.auth/user.json',
    })
    const page = await context.newPage()
    await use(page)
    await context.close()
  },
})
```

## Global Authentication Setup

### Programmatic Login Helper

```typescript
// tests/e2e/utils/auth.ts
import { Page } from '@playwright/test'

export async function loginAs(page: Page, role: 'admin' | 'user') {
  const credentials = {
    admin: { email: 'admin@example.com', password: 'adminpass' },
    user: { email: 'user@example.com', password: 'userpass' },
  }

  const { email, password } = credentials[role]

  await page.goto('/login')
  await page.getByLabel('Email').fill(email)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.waitForURL('/dashboard')
}

export async function logout(page: Page) {
  await page.getByRole('button', { name: /user menu/i }).click()
  await page.getByRole('menuitem', { name: 'Sign out' }).click()
  await page.waitForURL('/login')
}
```

### API-Based Authentication (Faster)

```typescript
// tests/e2e/utils/api-auth.ts
import { Page, APIRequestContext } from '@playwright/test'

export async function loginViaAPI(
  page: Page,
  request: APIRequestContext,
  credentials: { email: string; password: string },
) {
  // Call login API directly
  const response = await request.post('/api/auth/login', {
    data: credentials,
  })

  const { token } = await response.json()

  // Set auth cookie/header
  await page.context().addCookies([
    {
      name: 'auth-token',
      value: token,
      domain: 'localhost',
      path: '/',
    },
  ])
}
```

## OAuth Mocking

### Mocking OAuth Providers

```typescript
test('handles OAuth login', async ({ page }) => {
  // Mock OAuth callback
  await page.route('/api/auth/callback/google*', async (route) => {
    await route.fulfill({
      status: 302,
      headers: {
        Location: '/dashboard',
        'Set-Cookie': 'session=mocked-session; Path=/',
      },
    })
  })

  await page.goto('/login')
  await page.getByRole('button', { name: 'Sign in with Google' }).click()

  await expect(page).toHaveURL('/dashboard')
})
```

### Testing OAuth Error Handling

```typescript
test('handles OAuth error gracefully', async ({ page }) => {
  await page.route('/api/auth/callback/google*', async (route) => {
    await route.fulfill({
      status: 302,
      headers: {
        Location: '/login?error=OAuthCallback',
      },
    })
  })

  await page.goto('/api/auth/callback/google?error=access_denied')

  await expect(page.getByText('Authentication failed')).toBeVisible()
})
```

## Multi-User Testing

### Testing Concurrent Users

```typescript
test('admin and user see different content', async ({ browser }) => {
  // Create two browser contexts with different auth states
  const adminContext = await browser.newContext({
    storageState: 'tests/.auth/admin.json',
  })
  const userContext = await browser.newContext({
    storageState: 'tests/.auth/user.json',
  })

  const adminPage = await adminContext.newPage()
  const userPage = await userContext.newPage()

  // Both visit same page
  await adminPage.goto('/settings')
  await userPage.goto('/settings')

  // Admin sees admin controls
  await expect(adminPage.getByRole('tab', { name: 'Users' })).toBeVisible()

  // User doesn't see admin controls
  await expect(userPage.getByRole('tab', { name: 'Users' })).not.toBeVisible()

  await adminContext.close()
  await userContext.close()
})
```

## Best Practices

1. **Create auth setup file** - Run authentication once at start of test suite
2. **Save storage state** - Reuse authenticated sessions to speed up tests
3. **Use API for login** - Faster than UI-based login for most tests
4. **Test both auth states** - Test logged-in and logged-out scenarios
5. **Isolate user contexts** - Use separate browser contexts for different roles
6. **Clean up sessions** - Clear cookies/storage when testing logout
7. **Mock OAuth** - Never call real OAuth providers in tests
