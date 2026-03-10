import { test, expect } from "@playwright/test";

test.describe("List Management", () => {
  // These tests verify the list management UI behavior.
  // Full CRUD operations require Supabase authentication.

  test("unauthenticated user is redirected from lists page", async ({
    page,
  }) => {
    await page.goto("/en/lists");
    await expect(page).toHaveURL(/\/login/);
  });

  test("unauthenticated user is redirected from list detail", async ({
    page,
  }) => {
    await page.goto("/en/lists/some-id");
    await expect(page).toHaveURL(/\/login/);
  });
});
