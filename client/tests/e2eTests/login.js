const faker = require('faker');

const randomName = faker.name.findName();
const [firstName, lastName] = randomName.split(' ');
const email = faker.internet.email();

module.exports = {
  'User logs in and sees a dashboard': (browser) => {
    browser
      .url('http://localhost:7000')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.cta-small', 2000)
      .click('.cta-small')
      .setValue('input[name=firstName]', firstName)
      .setValue('input[name=lastName]', lastName)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', 'passsword8')
      .pause(2000)
      .click('button[type=submit]')
      .waitForElementVisible('.dashboard', 4000)
      .end();
  }
};
