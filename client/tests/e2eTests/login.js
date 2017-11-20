module.exports = {
  'User logs in and sees a dashboard': (browser) => {
    browser
      .url('http://localhost:7000/sign-in')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'lajumokee@rmaeail.net')
      .setValue('input[name=password]', 'passsword8')
      .click('button[type=submit]')
      .waitForElementVisible('.dashboard', 4000)
      .end();
  }
};
