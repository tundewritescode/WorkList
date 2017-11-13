import chai from 'chai';
import request from 'supertest';

import User from './../../models/User';
import ToDo from './../../models/ToDo';
import users from './../testData/users';
import toDos from './../testData/toDos';
import app from './../../app';

const { expect } = chai;

describe('ToDo Controller', async () => {
  before(async () => {
    await User.remove({});
    await ToDo.remove({});
  });

  describe('When a user creates a todo', () => {
    it('should return a new todo details', async () => {
      const newUser = await request(app)
        .post('/api/v1/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send(users[0]);

      const { token } = newUser.body;

      const response = await request(app)
        .post('/api/v1/todos')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', token)
        .send(toDos[0])
        .expect(201);

      expect(response.body).to.be.an('object');
      expect(response.body.toDo).to.have.a.property('toDoId');
      expect(response.body.toDo).to.have.a.property('ownerId');
      expect(response.body.toDo.title).to.equal(toDos[0].title);
    });
  });

  describe('When a user creates a todo with an empty title', () => {
    it('should return a `Title is required`', async () => {
      const user = await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ email: users[0].email, password: users[0].password });

      const response = await request(app)
        .post('/api/v1/todos')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', user.body.token)
        .send()
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg).to.equal('Title is required');
    });
  });

  describe('When a user requests for todos', () => {
    it('should return a list of all todos', async () => {
      const user = await request(app)
        .post('/api/v1/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ email: users[0].email, password: users[0].password });

      const response = await request(app)
        .get('/api/v1/todos')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', user.body.token)
        .expect(200);

      expect(response.body.toDos).to.be.an('array');
      expect(response.body.toDos[0].title).to.equal(toDos[0].title);
    });
  });
});

