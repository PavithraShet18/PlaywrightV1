class checkoutpage {
  constructor(page) {
    this.page = page;
    this.cvv = page.locator("input.input.txt").nth(1);
    this.NameOnTheCard = page.locator("input.input.txt").nth(2);
    this.CouponCode = page.locator("input.input.txt").nth(3);
    this.ApplyCouponButton = page.getByRole("button", { name: "Apply Coupon" });
    this.emailInput = page.locator(".text-validated.ng-pristine.ng-untouched");
    this.countryInput = page.getByPlaceholder("Select Country");
    this.indiaOption = page.getByRole("button", { name: /India$/ });
    this.placeOrderButton = page.locator('a:has-text("PLACE ORDER")');
  }
  async personal_info() {
    await this.cvv.fill("123");
    await this.NameOnTheCard.fill("Pavithra S");
    await this.CouponCode.fill("rahulshettyacademy");
    await this.ApplyCouponButton.click();
  }
  async shipping_info(email, countryName) {
    await this.emailInput.fill(email);
    await this.countryInput.fill(countryName);
    await this.countryInput.fill("");
    await this.page.waitForTimeout(2000);
    await this.indiaOption.click();
  }
  async place_order() {
    await this.placeOrderButton.click();
  }
}
module.exports = { checkoutpage };
