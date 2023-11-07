describe("Login", () => {
  let users: string[];
  let password: string;
  let products: { name: string; src: string }[];

  before(() => {
    cy.fixture("users").then((data: { users: string[]; password: string }) => {
      users = data.users;
      password = data.password;
    });
    cy.fixture("products").then((data: { name: string; src: string }[]) => {
      products = data;
    });
  });

  beforeEach(() => {
    cy.navigateTo(Cypress.env("login_url"));
  });

  it("Login using standard user", () => {
    cy.fillLoginForm(users[0], password);
    cy.clickLoginButton();

    cy.url().should("include", Cypress.env("products_url"));

    products.forEach((product) => {
      cy.get(".inventory_item")
        .should("have.length", 6)
        .each(($el) => {
          if ($el.text().includes(product.name)) {
            cy.wrap($el)
              .find("img")
              .invoke("attr", "src")
              .should("include", product.src);
          }
        });
    });
  });

  it("Login using locked user", () => {
    cy.fillLoginForm(users[1], password);
    cy.clickLoginButton();

    cy.url().should("not.include", Cypress.env("products_url"));
    cy.getByTestData("error")
      .should("be.visible")
      .and("contain", "Epic sadface: Sorry, this user has been locked out.");
    cy.getByTestData("username").should("have.class", "error");
    cy.getByTestData("password").should("have.class", "error");
  });

  it("Login using problem user", () => {
    cy.fillLoginForm(users[2], password);
    cy.clickLoginButton();

    cy.url().should("include", Cypress.env("products_url"));

    products.forEach((product) => {
      cy.get(".inventory_item")
        .should("have.length", 6)
        .each(($el) => {
          if ($el.text().includes(product.name)) {
            cy.wrap($el)
              .find("img")
              .invoke("attr", "src")
              .should("not.include", product.src);
          }
        });
    });
  });
});
