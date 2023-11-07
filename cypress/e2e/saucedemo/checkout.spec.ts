describe("Checkout", () => {
  let products: { name: string; id: string; price: string }[];
  let clients: { firstName: string; lastName: string; zipCode: string }[];

  before(() => {
    cy.fixture("products").then(
      (data: { name: string; id: string; price: string }[]) => {
        products = data;
      }
    );
    cy.fixture("clients").then(
      (data: { firstName: string; lastName: string; zipCode: string }[]) => {
        clients = data;
      }
    );
  });

  beforeEach(() => {
    cy.addProductsToCart([0, 1, 2, 3, 4, 5]);
    cy.loginByLocalStorage(Cypress.env("cart_url"));
    cy.url().should("include", Cypress.env("cart_url"));
  });

  it("Checkout products", () => {
    const randomIndex: number = Math.floor(Math.random() * clients.length);
    const randomClient: {
      firstName: string;
      lastName: string;
      zipCode: string;
    } = clients[randomIndex];
    const { firstName, lastName, zipCode } = randomClient;
    const totalPrice = products.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    );

    cy.get(`.shopping_cart_badge:contains(${products.length})`).should(
      "be.visible"
    );
    cy.clickCheckoutButton();
    cy.fillCheckoutForm(firstName, lastName, zipCode);
    cy.clickContinueButton();

    cy.url().should("include", Cypress.env("step_two_checkout_url"));
    cy.get(".summary_subtotal_label")
      .invoke("text")
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace("Item total: $", ""));

        expect(totalPrice).to.equal(subtotal);
      });

    cy.clickFinishButton();
    cy.getById("checkout_complete_container").should(
      "include.text",
      "Thank you for your order!"
    );
    cy.get(".shopping_cart_badge").should("not.exist");

    cy.clickBackToProductsButton();
    cy.url().should("include", Cypress.env("products_url"));
  });

  it("Cancel checkout products", () => {
    const randomIndex: number = Math.floor(Math.random() * clients.length);
    const randomClient: {
      firstName: string;
      lastName: string;
      zipCode: string;
    } = clients[randomIndex];
    const { firstName, lastName, zipCode } = randomClient;
    const totalPrice = products.reduce(
      (total, product) => total + parseFloat(product.price),
      0
    );

    cy.get(`.shopping_cart_badge:contains(${products.length})`).should(
      "be.visible"
    );
    cy.clickCheckoutButton();
    cy.fillCheckoutForm(firstName, lastName, zipCode);
    cy.clickContinueButton();

    cy.url().should("include", Cypress.env("step_two_checkout_url"));
    cy.get(".summary_subtotal_label")
      .invoke("text")
      .then((subtotalText) => {
        const subtotal = parseFloat(subtotalText.replace("Item total: $", ""));

        expect(totalPrice).to.equal(subtotal);
      });

    cy.clickCancelButton();
    cy.url().should("include", Cypress.env("products_url"));
    cy.get(`.shopping_cart_badge:contains(${products.length})`).should(
      "be.visible"
    );
  });
});
