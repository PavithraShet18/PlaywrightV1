class cart {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('[routerlink="/dashboard/cart"]');
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }
  async go_to_cart() {
    await this.cartLink.click();
  }
  async proceed_to_checkout() {
    await this.checkoutButton.click();
  }
}
module.exports = { cart };
