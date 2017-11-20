import chai from 'chai';

import User from './../../models/User';
import users from './../testData/users';

const { expect } = chai;

describe('User Model', () => {
  before(async () => {
    await User.remove({});
  });

  it('should return a new user registration data', async () => {
    const newUser = await User(users[0]).save();

    expect(newUser).to.be.an('object');
    expect(newUser.firstName).to.equal(users[0].firstName);
    expect(newUser.lastName).to.equal(users[0].lastName);
    expect(newUser.email).to.equal(users[0].email);
    expect(newUser).to.have.a.property('password');
    expect(newUser).to.have.a.property('avatar');
    expect(newUser).to.have.a.property('_id');
  });
});
