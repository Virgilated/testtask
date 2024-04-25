import { test, Locator, Page } from '@playwright/test';

export default class MainPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('/');
    }

    async clickOn({ locator, name }: { locator: Locator; name: string }) {
        await test.step(`Click on the ${name} button`, async () => {
            await locator.waitFor({ state: 'visible' });
            await locator.click();
        });
    }
}
