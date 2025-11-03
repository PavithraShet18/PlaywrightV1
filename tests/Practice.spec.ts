//const { test, expect } = require("@playwright/test");
import { test, expect } from "@playwright/test";
const { LoginPage } = require("../pom/LoginPage");
const { productdetails } = require("../pom/productpage");
const { checkoutpage } = require("../pom/checkoutpage");
import type { Page } from "@playwright/test";
import { productpage } from "../pom/productpage";
import { cart } from "../pom/cart";
import { orderHistoryPage } from "../pom/orderhistorypage";
const data = JSON.parse(JSON.stringify(require("../utils/Trylogindata.json")));

test("PW Basics - Open rahulshettyacademy test link", async ({  page,}: {  page: Page;}) => {
  const l_page = new LoginPage(page);
  //Navigate to the Rahulshetty Academy login page
  await l_page.goto(data.url);
  //Login to the application
  await l_page.login_to_application(data.username, data.pwd);

  //add to cart
  const p_page = new productpage(page);
  await p_page.ProductLoad();
  await p_page.addToCart("IPHONE 13 PRO");

  //product details
  const c_page = new cart(page);
  await c_page.go_to_cart();
  await expect(page.locator('h3:has-text("IPHONE 13 PRO")')).toBeVisible({
    timeout: 5000,
  });
  await c_page.proceed_to_checkout();
  await page.waitForTimeout(2000);

  //checkout details
  const co_page = new checkoutpage(page);
  console.log("Item is ready for checkout.");
  await co_page.personal_info();
  console.log("coupon applied");
  await co_page.shipping_info(data.email, data.countryName);
  console.log("India selected from dropdown");
  await co_page.place_order();
  console.log("Order has been placed successfully.");
  await page.waitForTimeout(2000);

  //order history details
  const orderHistory = new orderHistoryPage(page);
  const orderId = await orderHistory.get_order_id();
  await orderHistory.navigate_to_orders();
  const latestOrderId = await orderHistory.get_latest_order_id();
  //expect(latestOrderId.trim()).toBe(orderId.trim());
  expect(latestOrderId.trim()).toBe(orderId.replace(/[|]/g, "").trim());
  await orderHistory.view_latest_order();
});
