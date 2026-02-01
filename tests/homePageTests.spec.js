import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjectModels/homePageCommon.js';

test.describe('Home Page Tests', () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToHomePage();
    });

    test('@smoke @sanity Verify home page loads successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('@smoke Verify logo is visible', async () => {
        await expect(homePage.logo).toBeVisible();
    });

    test('@sanity Verify carousel is visible', async () => {
        await expect(homePage.carouselInner).toBeVisible();
    });

    test('@regression Verify featured items section is visible', async () => {
        await expect(homePage.featuredItems).toBeVisible();
    });

    test('@regression Verify navigation links are visible', async () => {
        await expect(homePage.homeLink).toBeVisible();
        await expect(homePage.productsLink).toBeVisible();
        await expect(homePage.cartLink).toBeVisible();
        await expect(homePage.loginLink).toBeVisible();
    });

    test('@regression Verify carousel has multiple items', async () => {
        const itemsCount = await homePage.getCarouselItemsCount();
        expect(itemsCount).toBeGreaterThan(1);
    });

    test('@regression Verify subscription with valid email', async ({ page }) => {
        await homePage.subscribeWithEmail('test@example.com');
        await expect(page.locator('.alert-success')).toBeVisible();
    });
});
