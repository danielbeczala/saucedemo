describe("Remove", () => {
  let products: { name: string; id: string }[];

  before(() => {
    cy.fixture("products").then((data: { name: string; id: string }[]) => {
      products = data;
    });
  });

  beforeEach(() => {
    cy.addProductsToCart([0, 1, 2, 3, 4, 5]);
  });

  it("Remove products from cart", () => {
    cy.loginByLocalStorage(Cypress.env("products_url"));
    cy.url().should("include", Cypress.env("products_url"));
    products.forEach((product, index) => {
      let count: number = index + 1;
      let productCount: number = products.length - count;
      cy.get(
        `.inventory_item .inventory_item_name:contains(${product.name})`
      ).then(() => {
        cy.clickRemoveButton();
        cy.getByTestDataLike("add-to-cart-")
          .contains("Add to cart")
          .should("be.visible");
        if (productCount == 0) {
          cy.get(".shopping_cart_badge").should("not.exist");
        } else {
          cy.get(`.shopping_cart_badge:contains(${productCount})`).should(
            "be.visible"
          );
        }
      });
    });
  });

  it("Remove product from cart on product page", () => {
    products.forEach((product, index) => {
      let count: number = index + 1;
      let productCount: number = products.length - count;
      cy.loginByLocalStorage(`${Cypress.env("product_page")}${product.id}`);
      cy.url().should("include", `${Cypress.env("product_page")}${product.id}`);
      cy.get(
        `.inventory_details .inventory_details_name:contains(${product.name})`
      ).then(() => {
        cy.clickRemoveButton();
        cy.getByTestDataLike("add-to-cart-")
          .contains("Add to cart")
          .should("be.visible");
        if (productCount == 0) {
          cy.get(".shopping_cart_badge").should("not.exist");
        } else {
          cy.get(`.shopping_cart_badge:contains(${productCount})`).should(
            "be.visible"
          );
        }
      });
    });
  });
});
