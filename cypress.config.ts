import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    login_url: "/",
    products_url: "/inventory.html",
    product_page: "/inventory-item.html?id=",
    standard_user_username: "standard_user",
    cart_url: "/cart.html",
    step_two_checkout_url: "/checkout-step-two.html",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    baseUrl: "https://www.saucedemo.com/",
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    defaultCommandTimeout: 6000,
  },
});
