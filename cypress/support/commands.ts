/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("navigateTo", (url) => {
  cy.visit(url);
});

Cypress.Commands.add("getByTestData", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getByTestDataLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add("getById", (selector, ...args) => {
  return cy.get(`#${selector}`, ...args);
});

Cypress.Commands.add("loginByLocalStorage", (url) => {
  cy.setLocalStorage("session-username", Cypress.env("standard_user_username"));
  cy.setCookie("session-username", Cypress.env("standard_user_username"));
  cy.visit(url, { failOnStatusCode: false });
});

Cypress.Commands.add("setLocalStorage", (key, value) => {
  cy.window().then((win) => {
    win.localStorage.setItem(key, value);
  });
});

Cypress.Commands.add("addProductsToCart", (value) => {
  cy.setLocalStorage("cart-contents", JSON.stringify(value));
});

Cypress.Commands.add("clickCheckoutButton", () => {
  cy.getByTestData("checkout").click();
});

Cypress.Commands.add("fillCheckoutForm", (firstName, lastName, zipCode) => {
  cy.getByTestData("firstName").type(firstName).should("have.value", firstName);
  cy.getByTestData("lastName").type(lastName).should("have.value", lastName);
  cy.getByTestData("postalCode").type(zipCode).should("have.value", zipCode);
});

Cypress.Commands.add("fillLoginForm", (username, password) => {
  cy.getByTestData("username").type(username);
  cy.getByTestData("password").type(password);
});

Cypress.Commands.add("clickLoginButton", () => {
  cy.getByTestData("login-button").click();
});

Cypress.Commands.add("clickContinueButton", () => {
  cy.getByTestData("continue").click();
});

Cypress.Commands.add("clickFinishButton", () => {
  cy.getByTestData("finish").click();
});

Cypress.Commands.add("clickCancelButton", () => {
  cy.getByTestData("cancel").click();
});

Cypress.Commands.add("clickBackToProductsButton", () => {
  cy.getByTestData("back-to-products").click();
});

Cypress.Commands.add("clickAddToCartButton", () => {
  cy.getByTestDataLike("add-to-cart-").contains("Add to cart").click();
});

Cypress.Commands.add("clickRemoveButtonButton", () => {
  cy.getByTestDataLike("remove-").contains("Remove").click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
