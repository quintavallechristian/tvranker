import { type Page, type Locator } from "@playwright/test";

export class ListsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly newListButton: Locator;
  readonly importButton: Locator;
  readonly listCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: /my lists/i });
    this.newListButton = page.getByRole("button", { name: /new list/i });
    this.importButton = page.getByRole("button", { name: /import/i });
    this.listCards = page.locator('[href*="/lists/"]');
  }

  async goto(locale = "en") {
    await this.page.goto(`/${locale}/lists`);
  }

  async createList(name: string, description?: string) {
    await this.newListButton.click();
    await this.page.getByPlaceholder(/favorite/i).fill(name);
    if (description) {
      await this.page.getByPlaceholder(/collection/i).fill(description);
    }
    await this.page.getByRole("button", { name: /create/i }).click();
  }

  async clickList(name: string) {
    await this.page.getByText(name).click();
  }
}

export class ListDetailPage {
  readonly page: Page;
  readonly addShowButton: Locator;
  readonly showRows: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addShowButton = page.getByRole("button", { name: /add show/i });
    this.showRows = page
      .locator('[aria-label="Drag to reorder"]')
      .locator("..");
    this.backLink = page.getByText(/back to lists/i);
  }

  async addShow(query: string) {
    await this.addShowButton.click();
    // Type in search box within dialog
    await this.page.getByPlaceholder(/search tv/i).fill(query);
    // Wait for results and click first one
    await this.page
      .locator("button")
      .filter({ hasText: query })
      .first()
      .click();
    // Close dialog
    await this.page.keyboard.press("Escape");
  }
}
