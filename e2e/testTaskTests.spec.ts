import { test } from '@playwright/test';
import { CalculatorComponent } from '../page_components/Calculator';

test.describe('Calculator Sanity Tests', () => {
    let calculator: CalculatorComponent;
    let operation: string;

    test.beforeEach(async ({ page }) => {
        calculator = new CalculatorComponent(page);
        await calculator.visit();
    });

    test('Test Case 1 - Clear Entry Data Test', async () => {
        operation = 'add';
        await calculator.performCalculation({ firstNumber: 2, secondNumber: 2, operation });
        await calculator.calculateWithoutExecution({ number: 1, operation });
        await calculator.clearEntry();
        await calculator.performCalculation({ firstNumber: 2 });
        await calculator.validateCalculationResultIsTrue({ value: 6 });
    });

    test('Test Case 2 - Clear All Data Test', async () => {
        operation = 'add';
        await calculator.performCalculation({ firstNumber: 2, secondNumber: 2, operation });
        await calculator.calculateWithoutExecution({ number: 1, operation });
        await calculator.fullReset();
        await calculator.performCalculation({ firstNumber: 2 });
        await calculator.validateCalculationResultIsFalse({ value: 6 });
        await calculator.validateCalculationResultIsTrue({ value: 2 });
    });

    test('Test Case 3 - Sum Test', async () => {
        operation = 'add';
        await calculator.performCalculation({ firstNumber: 2, secondNumber: 2, operation });
        await calculator.validateCalculationResultIsTrue({ value: 4 });
    });

    test('Test Case 4 - Subtract Test', async () => {
        operation = 'subtract';
        await calculator.performCalculation({ firstNumber: 2, secondNumber: 2, operation });
        await calculator.validateCalculationResultIsTrue({ value: 0 });
    });

    test('Test Case 5 - Multiply Test', async () => {
        operation = 'multiply';
        await calculator.performCalculation({ firstNumber: 2, secondNumber: 2, operation });
        await calculator.validateCalculationResultIsTrue({ value: 4 });
    });

    test('Test Case 6 - Divide Test', async () => {
        operation = 'divide';
        await calculator.performCalculation({ firstNumber: 2, secondNumber: 2, operation });
        await calculator.validateCalculationResultIsTrue({ value: 1 });
    });

    test('Test Case 7 - Divide Test', async () => {
        operation = 'divide';
        await calculator.performCalculation({ firstNumber: 2, secondNumber: 0, operation });
        await calculator.validateCalculationResultIsTrue({ value: 'Not a Number' });
    });
});
