describe("Sort", () => {
  beforeEach(() => {
    cy.loginByLocalStorage(Cypress.env("products_url"));
    cy.url().should("include", Cypress.env("products_url"));
  });

  it("Sort by Name (A to Z)", () => {
    cy.getByTestData("product_sort_container").select("Name (A to Z)");
    cy.getByTestData("product_sort_container").should("have.value", "az");
    cy.get(".inventory_item_name")
      .invoke("text")
      .then((productNames: string) => {
        const namesArray: string[] = productNames
          .split("\n")
          .map((name) => name.trim());

        const sortedNames: string[] = [...namesArray].sort();

        expect(namesArray).to.deep.equal(sortedNames);
      });
  });

  it("Sort by Name (Z to A)", () => {
    cy.getByTestData("product_sort_container").select("Name (Z to A)");
    cy.getByTestData("product_sort_container").should("have.value", "za");

    cy.get(".inventory_item_name")
      .invoke("text")
      .then((productNames: string) => {
        const namesArray: string[] = productNames
          .split("\n")
          .map((name) => name.trim());

        const sortedNamesZA: string[] = [...namesArray].sort((a, b) =>
          b.localeCompare(a)
        );

        expect(namesArray).to.deep.equal(sortedNamesZA);
      });
  });

  it("Sort by Price (low to high)", () => {
    cy.getByTestData("product_sort_container").select("Price (low to high)");
    cy.getByTestData("product_sort_container").should("have.value", "lohi");

    cy.get(".inventory_item_price")
      .invoke("text")
      .then((prices: string) => {
        const pricesArray: number[] = prices
          .split("\n")
          .map((price) => parseFloat(price.replace("$", "")));

        const sortedPricesLowToHigh: number[] = [...pricesArray].sort(
          (a, b) => a - b
        );

        expect(pricesArray).to.deep.equal(sortedPricesLowToHigh);
      });
  });

  it("Sort by Price (high to low)", () => {
    cy.getByTestData("product_sort_container").select("Price (high to low)");
    cy.getByTestData("product_sort_container").should("have.value", "hilo");

    cy.get(".inventory_item_price")
      .invoke("text")
      .then((prices: string) => {
        const pricesArray: number[] = prices
          .split("\n")
          .map((price) => parseFloat(price.replace("$", "")));

        const sortedPricesHighToLow: number[] = [...pricesArray].sort(
          (a, b) => b - a
        );

        expect(pricesArray).to.deep.equal(sortedPricesHighToLow);
      });
  });
});
