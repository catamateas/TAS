export class BasePage {
    constructor(page) {
        this.page = page;
        this.baseURL = 'https://automationexercise.com';

        // Navigation locators (using href)
        this.homeLink = page.locator('a[href="/"]').first();
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('a[href="/view_cart"]').first();
        this.loginLink = page.locator('a[href="/login"]');
        this.logoutLink = page.locator('a[href="/logout"]');
        this.deleteAccountLink = page.locator('a[href="/delete_account"]');
        this.contactUsLink = page.locator('a[href="/contact_us"]');
        this.testCasesLink = page.locator('a[href="/test_cases"]');
        this.apiTestingLink = page.locator('a[href="/api_list"]');

        // Subscription locators
        this.subscriptionEmail = page.locator('#susbscribe_email');
        this.subscribeButton = page.locator('#subscribe');
    }

    async navigate(path = '') {
        await this.page.route('**fundingchoicesmessages.google.com**', route => route.abort());
        await this.page.goto(`${this.baseURL}${path}`);
    }

    async getTitle() {
        return await this.page.title();
    }

    async clickHome() {
        await this.homeLink.click();
    }

    async clickProducts() {
        await this.productsLink.click();
    }

    async clickCart() {
        await this.cartLink.click();
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async clickContactUs() {
        await this.contactUsLink.click();
    }

    async subscribeWithEmail(email) {
        await this.subscriptionEmail.fill(email);
        await this.subscribeButton.click();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

}
