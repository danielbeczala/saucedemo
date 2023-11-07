describe("View", () => {
  let products: { name: string; src: string; price: string }[];

  before(() => {
    cy.fixture("products").then(
      (data: { name: string; src: string; price: string }[]) => {
        products = data;
      }
    );
  });

  beforeEach(() => {
    cy.loginByLocalStorage(Cypress.env("products_url"));
    cy.url().should("include", Cypress.env("products_url"));
  });

  it("View products page", () => {
    products.forEach((product) => {
      cy.contains(product.name).click();

      cy.get(".inventory_details_container").then(($el) => {
        if ($el.text().includes(product.name)) {
          cy.wrap($el)
            .find("img")
            .invoke("attr", "src")
            .should("include", product.src);

          cy.get(".inventory_details_price").should(
            "include.text",
            product.price
          );
        }
      });

      cy.getByTestData("back-to-products").click();
    });
  });
});
