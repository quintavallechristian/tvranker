import { test, expect } from "@playwright/test";

test.describe("Internationalization (i18n)", () => {
  test("English login page shows English text", async ({ page }) => {
    await page.goto("/en/login");
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(
      page.getByText("Sign in to manage your TV show rankings"),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /continue with google/i }),
    ).toBeVisible();
  });

  test("Italian login page shows Italian text", async ({ page }) => {
    await page.goto("/it/login");
    await expect(page.getByText("Bentornato")).toBeVisible();
    await expect(
      page.getByText("Accedi per gestire le tue classifiche di serie TV"),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Accedi" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /continua con google/i }),
    ).toBeVisible();
  });

  test("English register page shows English text", async ({ page }) => {
    await page.goto("/en/register");
    await expect(page.getByText("Create your account")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();
  });

  test("Italian register page shows Italian text", async ({ page }) => {
    await page.goto("/it/register");
    await expect(page.getByText("Crea il tuo account")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Registrati" }),
    ).toBeVisible();
  });

  test("default locale redirects to English", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en\//);
  });
});
