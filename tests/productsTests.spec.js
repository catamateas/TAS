import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pageObjectModels/productsPage.js';
import { CartPage } from '../pageObjectModels/cartPage.js';

test.describe('Products Tests', () => {
    let productsPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        await productsPage.goToProductsPage();
    });

    test.afterAll(async ({ page }) => {
        await page.close();
    });

    test('@smoke @sanity Verify products page loads successfully', async () => {
        await expect(productsPage.featuredItems).toBeVisible();
    });

    test('@sanity Verify products list is visible', async () => {
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
    });

    test('@regression Verify search functionality', async () => {
        await productsPage.searchProduct('Top');
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
    });

    test('@regression View product details', async ({ page }) => {
        await productsPage.clickViewProductByIndex(0);
        await page.waitForLoadState('networkidle');
        await expect(page.locator('.product-information')).toBeVisible();
    });

    test('@smoke Add product to cart', async () => {
        await productsPage.addProductToCartByIndex(0);
        await expect(productsPage.cartModal).toBeVisible();
    });

    test('@regression Add product to cart and continue shopping', async () => {
        await productsPage.addProductToCartByIndex(0);
        await expect(productsPage.cartModal).toBeVisible();
        await productsPage.clickContinueShopping();
        await expect(productsPage.featuredItems).toBeVisible();
    });

    test('@regression Add product to cart and view cart', async () => {
        await productsPage.addProductToCartByIndex(0);
        await productsPage.clickViewCart();
        await expect(cartPage.cartInfoTable).toBeVisible();
        const cartProductCount = await cartPage.getCartProductCount();
        expect(cartProductCount).toBe(1);
    });

    test('@regression Add multiple products to cart', async () => {
        await productsPage.addProductToCartByIndex(0);
        await productsPage.clickContinueShopping();

        await productsPage.addProductToCartByIndex(1);
        await productsPage.clickViewCart();

        const cartProductCount = await cartPage.getCartProductCount();
        expect(cartProductCount).toBe(2);
    });
});
