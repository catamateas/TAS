import { BasePage } from './basePage.js';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);

        // Logo Locator
        this.logo = page.locator('img[alt="Website for automation practice"]');

        // Carousel Locators
        this.carouselInner = page.locator('.carousel-inner').first();
        this.carouselItems = page.locator('.carousel-inner .item');
        this.carouselActiveItem = page.locator('.carousel-inner .item.active');

        // Featured Items
        this.featuredItems = page.locator('.features_items');

        // Logged in user locator
        this.loggedInAs = page.locator('//*[contains(@class,"nav")]//a[contains(text(),"Logged in as")]');

        // Test Cases and API buttons in carousel
        this.testCasesButton = page.locator('.test_cases_list');
        this.apisListButton = page.locator('.apis_list');
    }

    async goToHomePage() {
        await this.page.route('**fundingchoicesmessages.google.com**', route => route.abort());
        await this.navigate('/');
    }

    async isLogoVisible() {
        return await this.logo.isVisible();
    }

    async isCarouselVisible() {
        return await this.carouselInner.isVisible();
    }

    async isFeaturedItemsVisible() {
        return await this.featuredItems.isVisible();
    }

    async isLoggedIn() {
        return await this.loggedInAs.isVisible();
    }

    async getLoggedInUsername() {
        const text = await this.loggedInAs.textContent();
        return text.replace('Logged in as ', '').trim();
    }

    async getCarouselItemsCount() {
        return await this.carouselItems.count();
    }

    async clickTestCases() {
        await this.testCasesButton.first().click();
    }

    async clickApisList() {
        await this.apisListButton.first().click();
    }
}
