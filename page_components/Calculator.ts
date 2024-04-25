import { test, expect, type Locator, type Page } from '@playwright/test';
import MainPage from '../page_objects/MainPage';

export class CalculatorComponent extends MainPage {
    readonly one: Locator;
    readonly two: Locator;
    readonly plus: Locator;
    readonly minus: Locator;
    readonly result: Locator;
    readonly equal: Locator;
    readonly divide: Locator;
    readonly multiply: Locator;
    readonly clearAllButton: Locator;
    readonly clearEntryButton: Locator;

    constructor(page: Page) {
        super(page);
        this.one = page.locator('[value="1"]');
        this.two = page.locator('[value="2"]');
        this.plus = page.locator('[value="+"]');
        this.minus = page.locator('[value="-"]');
        this.result = page.locator('#display');
        this.equal = page.locator('[value="="]');
        this.divide = page.locator('[value="÷"]');
        this.multiply = page.locator('[name="multiply"]');
        this.clearAllButton = page.locator('[value="AC"]');
        this.clearEntryButton = page.locator('[value="CE"]');
    }

    numberButton({ number }: { number: number | null }): Locator {
        return this.page.locator(`[onclick="enterValue('${number}')"]`);
    }

    operationButton({ operation }: { operation: string | undefined }): Locator {
        return this.page.locator(`[name="${operation}"]`);
    }

    async validateCalculationResultIsTrue({ value }: { value: number | string }) {
        test.step(`Verify calculator displays ${value}`, async () => {
            await expect(this.result).toHaveValue(String(value));
        });
    }

    async validateCalculationResultIsFalse({ value }: { value: number | string }) {
        test.step(`Verify calculator should not display ${value}`, async () => {
            await expect(this.result).not.toHaveValue(String(value));
        });
    }

    async performCalculation({ firstNumber, secondNumber, operation }: { firstNumber: number; secondNumber?: number; operation?: string }) {
        if (!secondNumber && secondNumber !== 0) {
            await this.clickOn({ locator: this.numberButton({ number: firstNumber }), name: `${firstNumber}` });
            await this.clickOn({ locator: this.operationButton({ operation: 'calculate' }), name: `calculate` });
        } else {
            await this.clickOn({ locator: this.numberButton({ number: firstNumber }), name: `${firstNumber}` });
            await this.clickOn({ locator: this.operationButton({ operation }), name: `${operation}` });
            await this.clickOn({ locator: this.numberButton({ number: secondNumber }), name: `${secondNumber}` });
            await this.clickOn({ locator: this.operationButton({ operation: 'calculate' }), name: `calculate` });
        }
    }

    async calculateWithoutExecution({ number, operation }: { number: number; operation: string }) {
        await this.clickOn({ locator: this.operationButton({ operation }), name: `${operation}` });
        await this.clickOn({ locator: this.numberButton({ number: number }), name: `${number}` });
    }

    async clearEntry() {
        await this.clickOn({ locator: this.clearEntryButton, name: 'CE' });
    }

    async fullReset() {
        await this.clickOn({ locator: this.clearEntryButton, name: 'CE' });
        await this.clickOn({ locator: this.clearAllButton, name: 'AC' });
    }
}
