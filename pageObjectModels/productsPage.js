import { BasePage } from './basePage.js';

export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);

        // Search Locators
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');

        // Products Container Locators
        this.featuredItems = page.locator('.features_items');
        this.productCards = page.locator('.single-products');
        this.productInfo = page.locator('.productinfo');
        this.productOverlay = page.locator('.product-overlay');

        // Add to Cart Locators (using data-product-id attribute)
        this.addToCartButtons = page.locator('a[data-product-id]');
        this.overlayAddToCart = page.locator('.overlay-content a[data-product-id]');

        // View Product Links (partial href match)
        this.viewProductLinks = page.locator('a[href*="/product_details/"]');

        // Cart Modal Locators
        this.cartModal = page.locator('#cartModal');
        this.continueShoppingButton = page.locator('.close-modal');
        this.viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
    }

    async goToProductsPage() {
        await this.navigate('/products');
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async isFeaturedItemsVisible() {
        return await this.featuredItems.isVisible();
    }

    async getProductCount() {
        return await this.productCards.count();
    }

    async clickViewProductByIndex(index) {
        await this.viewProductLinks.nth(index).click();
    }

    async clickViewProductById(productId) {
        await this.page.locator(`a[href="/product_details/${productId}"]`).click();
    }

    async addProductToCartByIndex(index) {
        await this.productCards.nth(index).hover();
        await this.overlayAddToCart.nth(index).click();
    }

    async addProductToCartById(productId) {
        const productCard = this.page.locator(`.single-products:has(a[data-product-id="${productId}"])`);
        await productCard.hover();
        await this.page.locator(`.overlay-content a[data-product-id="${productId}"]`).click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async clickViewCart() {
        await this.viewCartLink.click();
    }

    async isCartModalVisible() {
        return await this.cartModal.isVisible();
    }

    async getProductNameByIndex(index) {
        return await this.productInfo.nth(index).locator('p').textContent();
    }

    async getProductPriceByIndex(index) {
        return await this.productInfo.nth(index).locator('h2').textContent();
    }
}
