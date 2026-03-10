#!/bin/bash
#
# E2E Testing Setup Script for Next.js Projects
#
# Usage: ./setup-e2e.sh [options]
#
# Options:
#   --minimal     Install only essential dependencies
#   --with-a11y   Include accessibility testing (axe-core)
#   --help        Show this help message
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default options
MINIMAL=false
WITH_A11Y=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --minimal)
      MINIMAL=true
      shift
      ;;
    --with-a11y)
      WITH_A11Y=true
      shift
      ;;
    --help)
      head -n 12 "$0" | tail -n 10
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

echo -e "${BLUE}🚀 Setting up E2E Testing with Playwright${NC}"
echo ""

# Check if we're in a Next.js project
if [ ! -f "package.json" ]; then
  echo -e "${RED}Error: package.json not found. Run this script from your project root.${NC}"
  exit 1
fi

if ! grep -q '"next"' package.json; then
  echo -e "${YELLOW}Warning: This doesn't appear to be a Next.js project.${NC}"
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Step 1: Install Playwright
echo -e "${GREEN}📦 Installing Playwright...${NC}"
npm install -D @playwright/test

# Step 2: Install browsers
echo -e "${GREEN}🌐 Installing Playwright browsers...${NC}"
if [ "$MINIMAL" = true ]; then
  npx playwright install chromium
else
  npx playwright install
fi

# Step 3: Install accessibility testing (optional)
if [ "$WITH_A11Y" = true ]; then
  echo -e "${GREEN}♿ Installing axe-core for accessibility testing...${NC}"
  npm install -D @axe-core/playwright
fi

# Step 4: Create directory structure
echo -e "${GREEN}📁 Creating test directory structure...${NC}"
mkdir -p tests/e2e/{fixtures,pages,specs,utils}
mkdir -p tests/.auth

# Step 5: Create base fixture
echo -e "${GREEN}📝 Creating base fixture...${NC}"
cat > tests/e2e/fixtures/base.ts << 'EOF'
import { test as base, expect } from '@playwright/test';

/**
 * Base test fixture with common page objects and utilities.
 * Extend this fixture to add your own page objects.
 */

type BaseFixtures = {
  // Add your page objects here
};

export const test = base.extend<BaseFixtures>({
  // Define your fixtures here
});

export { expect };
EOF

# Step 6: Create example page object
echo -e "${GREEN}📝 Creating example page object...${NC}"
cat > tests/e2e/pages/home.page.ts << 'EOF'
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly navLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { level: 1 });
    this.navLinks = page.getByRole('navigation').getByRole('link');
  }

  async goto() {
    await this.page.goto('/');
  }

  async getHeadingText() {
    return this.heading.textContent();
  }

  async clickNavLink(name: string) {
    await this.navLinks.filter({ hasText: name }).click();
  }
}
EOF

# Step 7: Create example spec
echo -e "${GREEN}📝 Creating example test spec...${NC}"
cat > tests/e2e/specs/home.spec.ts << 'EOF'
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Home Page', () => {
  test('should display the home page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    
    await expect(homePage.heading).toBeVisible();
  });

  test('should have proper title', async ({ page }) => {
    await page.goto('/');
    
    // Update this to match your actual page title
    await expect(page).toHaveTitle(/Home|Next.js/);
  });
});
EOF

# Step 8: Create test utilities
echo -e "${GREEN}📝 Creating test utilities...${NC}"
cat > tests/e2e/utils/test-data.ts << 'EOF'
/**
 * Test data and constants for E2E tests.
 */

export const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || 'test@example.com',
  password: process.env.TEST_USER_PASSWORD || 'testpassword123',
};

export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  // Add your routes here
} as const;

export const SELECTORS = {
  // Add common selectors here if needed
} as const;

/**
 * Generate a unique test email.
 */
export function generateTestEmail(): string {
  const timestamp = Date.now();
  return `test+${timestamp}@example.com`;
}
EOF

# Step 9: Create auth placeholder
echo -e "${GREEN}📝 Creating auth state placeholder...${NC}"
echo '{}' > tests/.auth/user.json
echo 'tests/.auth/*.json' >> .gitignore 2>/dev/null || true

# Step 10: Create playwright.config.ts
echo -e "${GREEN}📝 Creating Playwright configuration...${NC}"
cat > playwright.config.ts << 'EOF'
import { defineConfig, devices } from '@playwright/test';

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
  },
});
EOF

# Step 11: Update package.json scripts
echo -e "${GREEN}📝 Adding npm scripts...${NC}"

# Check if jq is available
if command -v jq &> /dev/null; then
  # Use jq for reliable JSON manipulation
  jq '.scripts["test:e2e"] = "playwright test" |
      .scripts["test:e2e:ui"] = "playwright test --ui" |
      .scripts["test:e2e:debug"] = "playwright test --debug" |
      .scripts["test:e2e:headed"] = "playwright test --headed"' \
    package.json > package.json.tmp && mv package.json.tmp package.json
else
  echo -e "${YELLOW}Note: jq not found. Please add these scripts to package.json manually:${NC}"
  echo '  "test:e2e": "playwright test"'
  echo '  "test:e2e:ui": "playwright test --ui"'
  echo '  "test:e2e:debug": "playwright test --debug"'
  echo '  "test:e2e:headed": "playwright test --headed"'
fi

# Done
echo ""
echo -e "${GREEN}✅ E2E testing setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "  1. Run your first test: npm run test:e2e"
echo "  2. Open UI mode: npm run test:e2e:ui"
echo "  3. Edit tests in tests/e2e/specs/"
echo "  4. Add page objects in tests/e2e/pages/"
echo ""
if [ "$WITH_A11Y" = true ]; then
  echo -e "${YELLOW}Accessibility testing is enabled.${NC}"
  echo "  See the e2e-testing skill for accessibility patterns."
fi
