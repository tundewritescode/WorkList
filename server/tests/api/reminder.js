import chai from 'chai';
import request from 'supertest';

import User from './../../models/User';
import ToDo from './../../models/ToDo';
import Task from './../../models/Task';
import users from './../testData/users';
import toDos from './../testData/toDos';
import tasks from './../testData/tasks';
import app from './../../app';

const { expect } = chai;

describe('Reminder Controller', async () => {
  before(async () => {
    await User.remove({});
    await ToDo.remove({});
    await Task.remove({});

    const newUser = await request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(users[0]);

    const { token } = newUser.body;

    const toDo = await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('token', token)
      .send(toDos[0]);

    const { toDoId } = toDo.body.toDo;

    await request(app)
      .post(`/api/v1/todos/${toDoId}/tasks`)
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('token', token)
      .send({
        ...tasks[0],
        assignedTo: users[0].email,
        dueDate: new Date((Date.now() + 600000))
      });
  });

  describe('When a request for reminders is sent', () => {
    it('should return a status code 200', async () => {
      const response = await request(app).get('/api/v1/reminders')
        .expect(200);
      expect(response.status).to.equal(200);
    });
  });
});
