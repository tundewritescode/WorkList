import chai from 'chai';
import request from 'supertest';

import User from './../../models/User';
import users from './../testData/users';
import app from './../../app';

const { expect } = chai;

describe('User Controller', () => {
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

      expect(response.body.user.firstName).to.equal(users[0].firstName);
      expect(response.body.user.lastName).to.equal(users[0].lastName);
      expect(response.body.user.email).to.equal(users[0].email);

      expect(response.body.token).to.be.a('string');
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

      expect(response.body.user.firstName).to.equal(users[0].firstName);
      expect(response.body.user.lastName).to.equal(users[0].lastName);
      expect(response.body.user.email).to.equal(users[0].email);

      expect(response.body.token).to.be.a('string');
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

  describe('When a user signs up with an invalid email address', () => {
    it('should return `invalid email`', async () => {
      const response = await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www.form-urlencoded')
        .send({
          ...users[0],
          email: 'email@'
        })
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg).to.equal('Invalid email');
    });
  });

  describe('When a user signs up with an invalid firstName and lastName', () => {
    it('should return `Invalid first name` and `Invalid last name`', async () => {
      const response = await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www.form-urlencoded')
        .send({
          ...users[0],
          firstName: 'email@',
          lastName: '92739jio'
        })
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg).to.equal('Invalid first name');
      expect(JSON.parse(response.error.text).errors[1].msg).to.equal('Invalid last name');
    });
  });

  describe('When a user signs up with an invalid password', () => {
    it('should return error message containing why the password is invalid', async () => {
      const response = await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www.form-urlencoded')
        .send({
          ...users[0],
          password: 'ert'
        })
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg).to.equal('Paswword must be at least 8 characters');
    });

    it('should return error message containing why the password is invalid`', async () => {
      const response = await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www.form-urlencoded')
        .send({
          ...users[0],
          password: 'ertetirutiouioue'
        })
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg).to.equal('Paswword must contain at least one number');
    });
  });

  describe('When a user signs in an invalid email and an empty password', () => {
    it('should return `Email is required` and `Password is required`', async () => {
      const response = await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ email: 'dsjfsdiddj', password: '' })
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg).to.equal('Email is required');
      expect(JSON.parse(response.error.text).errors[1].msg).to.equal('Password is required');
    });
  });

  describe('When a user signs in with invalid credentials', () => {
    it('should return `User not found`', async () => {
      const response = await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ email: 'dsjfsdiddj@gmail.com', password: 'sdkfjskldfjklsd8' })
        .expect(404);

      expect(JSON.parse(response.error.text).error).to.equal('User not found');
    });

    it('should return `Invalid credentials`', async () => {
      const response = await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ email: users[0].email, password: 'sdoiufiodsuf98sdf' })
        .expect(401);

      expect(JSON.parse(response.error.text).error).to.equal('Invalid credentials');
    });
  });
});
