import { type Page, type Locator } from "@playwright/test";

export class ExplorePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly userCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: /explore/i });
    this.searchInput = page.getByPlaceholder(/search by username/i);
    this.userCards = page.locator('[href*="/users/"]');
  }

  async goto(locale = "en") {
    await this.page.goto(`/${locale}/explore`);
  }

  async searchUser(username: string) {
    await this.searchInput.fill(username);
    // Wait for debounce
    await this.page.waitForTimeout(500);
  }
}
