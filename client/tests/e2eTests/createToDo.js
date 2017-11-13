module.exports = {
  'User registers and creates a todo': (browser) => {
    browser
      .url('http://localhost:7000')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.cta-small', 2000)
      .click('.cta-small')
      .setValue('input[name=firstName]', 'temi')
      .setValue('input[name=lastName]', 'lajumoke')
      .setValue('input[name=email]', 'lajumokee@rmaeail.net')
      .setValue('input[name=password]', 'passsword8')
      .pause(2000)
      .click('button[type=submit]')
      .waitForElementVisible('#title', 5000)
      .setValue('input[name=title]', 'a new todo')
      .sendKeys('input[id=title]', browser.Keys.ENTER)
      .waitForElementVisible('.collapsible-header', 4000)
      .assert.containsText('.collapsible-header', 'a new todo')
      .end();
  },
};
