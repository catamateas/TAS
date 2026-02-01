import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjectModels/loginPage.js';
import { HomePage } from '../pageObjectModels/homePageCommon.js';
import { userData } from '../fixtures/userData.js';

test.describe('Login Tests', () => {
    let loginPage;
    let homePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.goToLoginPage();
    });

    test('@smoke @sanity Verify login page loads successfully', async () => {
        expect(await loginPage.isLoginFormVisible()).toBeTruthy();
        expect(await loginPage.isSignupFormVisible()).toBeTruthy();
    });

    test('@regression Verify login form elements are visible', async () => {
        expect(await loginPage.loginEmail.isVisible()).toBeTruthy();
        expect(await loginPage.loginPassword.isVisible()).toBeTruthy();
        expect(await loginPage.loginButton.isVisible()).toBeTruthy();
    });

    test('@regression Verify signup form elements are visible', async () => {
        expect(await loginPage.signupName.isVisible()).toBeTruthy();
        expect(await loginPage.signupEmail.isVisible()).toBeTruthy();
        expect(await loginPage.signupButton.isVisible()).toBeTruthy();
    });

    test('@regression Login with invalid credentials', async ({ page }) => {
        await loginPage.login(userData.invalidUser.email, userData.invalidUser.password);
        await expect(page.locator('p:has-text("incorrect")')).toBeVisible();
    });

    test('@smoke Signup navigates to account information page', async ({ page }) => {
        const newUser = {
            name: 'Test User',
            email: `testuser${Date.now()}@example.com`,
        };
        await loginPage.signup(newUser.name, newUser.email);
        await expect(page.locator('#id_gender1')).toBeVisible();
    });
});
