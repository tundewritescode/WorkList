import chai from 'chai';
import request from 'supertest';
import 'babel-polyfill';

import User from './../../models/User';
import users from './../testData/users';
import app from './../../app';

const { expect } = chai;

describe('UserController', () => {
  before(async () => {
    await User.remove({});
  });

  describe('When a user signs up', () => {
    it('Then it should return the user details and authentication token', async () => {
      const response = await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[0])
        .expect(201);

      expect(response.body.user).to.be.an('object');
      expect(response.body.token).to.be.a('string');
      expect(response.body.user.userId).to.be.a('string');

      expect(response.body.user.userId.length).to.be.greaterThan(10);
      expect(response.body.user.firstName).to.equal(users[0].firstName);
      expect(response.body.user.lastName).to.equal(users[0].lastName);
      expect(response.body.user.email).to.equal(users[0].email);

      expect(response.body.token).to.be.a('string');
      expect(response.body.token.length).to.be.greaterThan(10);
    });
  });

  describe('When a user signs in', () => {
    it('Then it should return user details and authenticaion token', async () => {
      const response = await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ email: users[0].email, password: users[0].password })
        .expect(200);

      expect(response.body.user).to.be.an('object');
      expect(response.body.token).to.be.a('string');
      expect(response.body.user.userId).to.be.a('string');

      expect(response.body.user.userId.length).to.be.greaterThan(10);
      expect(response.body.user.firstName).to.equal(users[0].firstName);
      expect(response.body.user.lastName).to.equal(users[0].lastName);
      expect(response.body.user.email).to.equal(users[0].email);

      expect(response.body.token).to.be.a('string');
      expect(response.body.token.length).to.be.greaterThan(10);
    });
  });

  describe('When a user signs up with existing user data', () => {
    it('Then it should return an error message containing why the user cannot be registered', async () => {
      const response = await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[0])
        .expect(409);

      expect(response.body).to.a.property('error');
      expect(response.body.error).to.equal(`${users[0].email} already exists`);
    });
  });
});
