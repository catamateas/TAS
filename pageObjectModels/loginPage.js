import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        // Login Form Locators (using data-qa attributes)
        this.loginForm = page.locator('.login-form');
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');

        // Signup Form Locators (using data-qa attributes)
        this.signupForm = page.locator('.signup-form');
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');

        // Account Information Form Locators (after signup)
        this.titleMr = page.locator('#id_gender1');
        this.titleMrs = page.locator('#id_gender2');
        this.accountName = page.locator('#name');
        this.accountEmail = page.locator('#email');
        this.accountPassword = page.locator('#password');

        // Date of Birth Locators
        this.days = page.locator('#days');
        this.months = page.locator('#months');
        this.years = page.locator('#years');

        // Checkboxes
        this.newsletterCheckbox = page.locator('#newsletter');
        this.optinCheckbox = page.locator('#optin');

        // Address Information Locators
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.company = page.locator('#company');
        this.address1 = page.locator('#address1');
        this.address2 = page.locator('#address2');
        this.country = page.locator('#country');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.zipcode = page.locator('#zipcode');
        this.mobileNumber = page.locator('#mobile_number');

        // Create Account Button
        this.createAccountButton = page.locator('[data-qa="create-account"]');
    }

    async goToLoginPage() {
        await this.navigate('/login');
    }

    async login(email, password) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async signup(name, email) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async isLoginFormVisible() {
        return await this.loginForm.isVisible();
    }

    async isSignupFormVisible() {
        return await this.signupForm.isVisible();
    }

    async fillAccountInformation(userData) {
        if (userData.title === 'Mr') {
            await this.titleMr.click();
        } else {
            await this.titleMrs.click();
        }

        await this.accountPassword.fill(userData.password);
        await this.days.selectOption(userData.day);
        await this.months.selectOption(userData.month);
        await this.years.selectOption(userData.year);
    }

    async checkNewsletter() {
        await this.newsletterCheckbox.check();
    }

    async checkOptin() {
        await this.optinCheckbox.check();
    }

    async fillAddressInformation(userData) {
        await this.firstName.fill(userData.firstName);
        await this.lastName.fill(userData.lastName);
        if (userData.company) {
            await this.company.fill(userData.company);
        }
        await this.address1.fill(userData.address);
        if (userData.address2) {
            await this.address2.fill(userData.address2);
        }
        await this.country.selectOption(userData.country);
        await this.state.fill(userData.state);
        await this.city.fill(userData.city);
        await this.zipcode.fill(userData.zipcode);
        await this.mobileNumber.fill(userData.mobileNumber);
    }

    async clickCreateAccount() {
        await this.createAccountButton.click();
    }
}
