class orderHistoryPage {
  constructor(page) {
    this.page = page;
    this.orderLabel = page.locator("label.ng-star-inserted");
    this.ordersButton = page.getByRole("button", { name: "ORDERS" });
    this.latestOrderId = page.locator("tbody tr:first-child th");
    this.viewButton = page.locator('button:has-text("View")');
  }

  async get_order_id() {
    const orderId = await this.orderLabel.textContent();
    console.log(
      `Thank you for the order. You can see all the Orders in Orders History Page | ${orderId.trim()} |`
    );
    return orderId.trim();
  }

  async navigate_to_orders() {
    await this.ordersButton.click();
  }

  async get_latest_order_id() {
    const latestOrderId = await this.latestOrderId.textContent();
    console.log("Latest Order ID from Orders page:", latestOrderId.trim());
    return latestOrderId.trim();
  }

  async view_latest_order() {
    await this.viewButton.first().click();
    await this.page.waitForTimeout(2000);
  }
}

module.exports = { orderHistoryPage };
