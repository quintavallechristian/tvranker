import { test, expect } from "@playwright/test";

test.describe("Explore", () => {
  test("unauthenticated user is redirected from explore page", async ({
    page,
  }) => {
    await page.goto("/en/explore");
    await expect(page).toHaveURL(/\/login/);
  });
});
