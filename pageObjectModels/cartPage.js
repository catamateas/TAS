import { BasePage } from './basePage.js';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);

        // Cart container locators
        this.cartInfo = page.locator('#cart_info');
        this.cartInfoTable = page.locator('#cart_info_table');
        this.emptyCartMessage = page.locator('#empty_cart');

        // Product row locators (partial ID for dynamic product rows)
        this.productRows = page.locator('tr[id*="product-"]');

        // Cart cell locators
        this.cartDescription = page.locator('.cart_description');
        this.cartPrice = page.locator('.cart_price');
        this.cartQuantity = page.locator('.cart_quantity');
        this.cartTotal = page.locator('.cart_total');
        this.cartTotalPrice = page.locator('.cart_total_price');

        // Action locators
        this.deleteButton = page.locator('.cart_quantity_delete');
        this.proceedToCheckoutButton = page.locator('.check_out');
        this.checkoutModal = page.locator('#checkoutModal');
    }

    async goToCartPage() {
        await this.navigate('/view_cart');
    }

    async isCartTableVisible() {
        return await this.cartInfoTable.isVisible();
    }

    async getCartProductCount() {
        return await this.productRows.count();
    }

    async getProductNameByIndex(index) {
        return await this.cartDescription.nth(index).locator('h4 a').textContent();
    }

    async getProductPriceByIndex(index) {
        return await this.cartPrice.nth(index).locator('p').textContent();
    }

    async getProductQuantityByIndex(index) {
        return await this.cartQuantity.nth(index).locator('button').textContent();
    }

    async getProductTotalByIndex(index) {
        return await this.cartTotalPrice.nth(index).textContent();
    }

    async removeProductByIndex(index) {
        await this.deleteButton.nth(index).click();
    }

    async removeProductById(productId) {
        await this.page.locator(`a[data-product-id="${productId}"]`).click();
    }

    async isCartEmpty() {
        return await this.emptyCartMessage.isVisible();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}
