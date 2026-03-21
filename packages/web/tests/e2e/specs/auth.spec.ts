import { test, expect } from "@playwright/test";
import { LoginPage, RegisterPage } from "../pages/auth.page";

test.describe("Authentication", () => {
  test("shows login page with all elements", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page.getByText(/welcome back/i)).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.googleButton).toBeVisible();
    await expect(loginPage.registerLink).toBeVisible();
  });

  test("shows registration page with all elements", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await expect(page.getByText(/create your account/i)).toBeVisible();
    await expect(registerPage.usernameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.submitButton).toBeVisible();
    await expect(registerPage.loginLink).toBeVisible();
  });

  test("navigates from login to register", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.registerLink.click();
    await expect(page).toHaveURL(/\/register/);
  });

  test("navigates from register to login", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await registerPage.loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("shows error on invalid login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login("invalid@example.com", "wrongpassword");

    await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
  });

  test("requires email and password fields", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // HTML5 validation prevents submission
    await expect(loginPage.emailInput).toHaveAttribute("required");
    await expect(loginPage.passwordInput).toHaveAttribute("required");
  });

  test("username field only allows valid characters", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await registerPage.usernameInput.fill("Test User 123!");
    // Should be sanitized to lowercase alphanumeric + underscore/dash
    await expect(registerPage.usernameInput).toHaveValue("testuser123");
  });

  test("redirects unauthenticated users to login", async ({ page }) => {
    await page.goto("/en/lists");
    await expect(page).toHaveURL(/\/login/);
  });
});
