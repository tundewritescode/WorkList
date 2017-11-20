import chai from 'chai';
import request from 'supertest';
import storage from 'node-persist';

import User from './../../models/User';
import ToDo from './../../models/ToDo';
import Task from './../../models/Task';
import users from './../testData/users';
import toDos from './../testData/toDos';
import tasks from './../testData/tasks';
import app from './../../app';

const { expect } = chai;

describe('Task Controller', async () => {
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
      .send(toDos[0])
      .expect(201);

    const { toDoId } = toDo.body.toDo;

    storage.initSync();
    storage.setItemSync('token', token);
    storage.setItemSync('toDoId', toDoId);
  });

  describe('When a user creates a task', () => {
    it('should return a new task details', async () => {
      const response = await request(app)
        .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .send(tasks[0])
        .expect(201);

      expect(response.body).to.be.an('object');
      expect(response.body.task).to.have.a.property('taskId');
      expect(response.body.task).to.have.a.property('toDoId');
      expect(response.body.task.title).to.equal(tasks[0].title);
      expect(response.body.task.priority).to.equal(tasks[0].priority);
    });
  });

  describe('When a user requests for tasks', () => {
    it('should return a list of tasks', async () => {
      await request(app)
        .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .send(tasks[0]);

      const response = await request(app)
        .get(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .expect(200);

      expect(response.body.tasks).to.be.an('array');
      expect(response.body.tasks[0]).to.have.a.property('taskId');
      expect(response.body.tasks[0]).to.have.a.property('toDoId');
      expect(response.body.tasks[0].title).to.equal(tasks[0].title);
    });
  });

  describe('When a user creates a task with an empty title', () => {
    it('should return a `Title is required`', async () => {
      const response = await request(app)
        .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .send()
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg)
        .to.equal('Title is required');
    });
  });

  describe('When a user updates a task', () => {
    it('should return the updated task', async () => {
      const task = await request(app)
        .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .send(tasks[0])
        .expect(201);

      const { taskId } = task.body.task;

      const response = await request(app)
        .patch(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks/${taskId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .send({ completed: false })
        .expect(200);

      expect(response.body).to.be.an('object');
      expect(response.body.completed).to.equal(false);
    });

    it('should return `Completed can only be true or false`', async () => {
      const task = await request(app)
        .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .send(tasks[0])
        .expect(201);

      const { taskId } = task.body.task;

      const response = await request(app)
        .patch(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks/${taskId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('token', storage.getItemSync('token'))
        .send({ completed: null })
        .expect(400);

      expect(JSON.parse(response.error.text).errors[0].msg)
        .to.equal('Completed can only be true or false');
    });
  });
});
