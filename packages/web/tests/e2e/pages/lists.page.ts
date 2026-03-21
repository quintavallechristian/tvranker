import { type Page, type Locator } from "@playwright/test";

export class ListsPage {
  readonly page: Page;
  readonly importButton: Locator;
  readonly addShowButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.importButton = page.getByRole("button", { name: /import/i });
    this.addShowButton = page.getByRole("button", { name: /add show/i });
  }

  async goto(locale = "en") {
    await this.page.goto(`/${locale}/lists`);
  }
}

export class ListDetailPage {
  readonly page: Page;
  readonly addShowButton: Locator;
  readonly showRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addShowButton = page.getByRole("button", { name: /add show/i });
    this.showRows = page
      .locator('[aria-label="Drag to reorder"]')
      .locator("..");
  }

  async addShow(query: string) {
    await this.addShowButton.click();
    await this.page.getByPlaceholder(/search tv/i).fill(query);
    await this.page
      .locator("button")
      .filter({ hasText: query })
      .first()
      .click();
    await this.page.keyboard.press("Escape");
  }
}
