/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        navigateTo(url: Cypress.env): Chainable<any>;
        getByTestData(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
        getByTestDataLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
        getById(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
        loginByLocalStorage(url: Cypress.env): Chainable<any>;
        setLocalStorage(key: string, value: any): Chainable<any>;
        addProductsToCart(value: number[]): Chainable<any>;
        clickCheckoutButton(): Chainable<any>;
        fillCheckoutForm(firstName: string, lastName: string, zipCode: string): Chainable<any>;
        clickContinueButton(): Chainable<any>;
        clickFinishButton(): Chainable<any>;
        clickCancelButton(): Chainable<any>;
        clickBackToProductsButton(): Chainable<any>;
        fillLoginForm(username: string, password: string): Chainable<any>;
        clickLoginButton(): Chainable<any>;
        clickAddToCartButton(): Chainable<any>;
        clickRemoveButtonButton(): Chainable<any>;
    }
  }
