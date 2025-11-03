class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("email@example.com");
    this.pwd = page.locator('input[id="userPassword"]');
    this.loginButton = page.locator('input[id="login"]');
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async login_to_application(username, pwd) {
    await this.username.fill(username);
    await this.pwd.fill(pwd);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
