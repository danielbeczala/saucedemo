describe("Add", () => {
  let products: { name: string; id: string }[];

  before(() => {
    cy.fixture("products").then((data: { name: string; id: string }[]) => {
      products = data;
    });
  });

  it("Add products to cart", () => {
    cy.loginByLocalStorage(Cypress.env("products_url"));
    cy.url().should("include", Cypress.env("products_url"));
    products.forEach((product, index) => {
      cy.get(
        `.inventory_item .inventory_item_name:contains(${product.name})`
      ).then(() => {
        cy.clickAddToCartButton();
        cy.getByTestDataLike("remove-").contains("Remove").should("be.visible");
        cy.get(`.shopping_cart_badge:contains(${index + 1})`).should(
          "be.visible"
        );
      });
    });
  });

  it("Add product to cart from product page", () => {
    products.forEach((product, index) => {
      cy.loginByLocalStorage(`${Cypress.env("product_page")}${product.id}`);
      cy.url().should("include", `${Cypress.env("product_page")}${product.id}`);
      cy.get(
        `.inventory_details .inventory_details_name:contains(${product.name})`
      ).then(() => {
        cy.clickAddToCartButton();
        cy.getByTestDataLike("remove-").contains("Remove").should("be.visible");
        cy.get(`.shopping_cart_badge:contains(${index + 1})`).should(
          "be.visible"
        );
      });
    });
  });
});
