class productpage {
  constructor(page) {
    this.page = page;
    this.allProductCards = page.locator(".card-body");
    this.cartLink = page.locator('[routerlink="/dashboard/cart"]');
  }
  async ProductLoad() {
    await this.allProductCards.first().waitFor({ state: "visible" });
  }
  async addToCart(productNameToMatch) {
    const prodCount = await this.allProductCards.count();
    for (let i = 0; i < prodCount; i++) {
      const productNameElement = await this.allProductCards.nth(i).locator("b");
      const productName = await productNameElement.textContent();
      console.log("Checking product: " + productName);
      if (
        productName &&
        productName.trim().toUpperCase() === productNameToMatch.toUpperCase()
      ) {
        console.log("Matched the product: " + productName);
        await this.page
          .locator(".card-body")
          .nth(i)
          .getByRole("button", { name: "Add To Cart" })
          .click();
        console.log(productName + " added to cart.");
      }
    }
  }
  // async goToCart()
  // {
  // await this.cartLink.click();
  // }
}
module.exports = { productpage };
