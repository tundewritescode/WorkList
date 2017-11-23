module.exports = {
  'User logs in and sees a dashboard': (browser) => {
    browser
      .url('http://localhost:7000')
      .waitForElementVisible('body', 5000)
      .click('#sign-in')
      .waitForElementVisible('.form', 9000)
      .setValue('#email', 'lajumokee@rmaeail.net')
      .setValue('#password', 'passsword8')
      .click('button[type=submit]')
      .waitForElementVisible('.dashboard', 4000)
      .end();
  }
};
