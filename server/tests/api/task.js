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

    await request(app)
      .post('/api/v1/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send(users[1]);

    const { token } = newUser.body;

    const toDo = await request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('token', token)
      .send(toDos[0]);

    const { toDoId } = toDo.body.toDo;

    storage.initSync();
    storage.setItemSync('token', token);
    storage.setItemSync('toDoId', toDoId);
  });

  describe('When a user creates a task', () => {
    it('should return a new task object', async () => {
      /**
       *  creates a new user to be used as a collaborator
       */
      await request(app)
        .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/collaborators`)
        .set('token', storage.getItemSync('token'))
        .send({ collaborator: users[0].email });

      it('should return a new task details', async () => {
        /**
         * creates a new task
         */
        const response = await request(app)
          .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send({
            ...tasks[0],
            assignedTo: users[1].email
          })
          .expect(201);

        storage.setItemSync('taskId', response.body.task.taskId);

        expect(response.body).to.be.an('object');
        expect(response.body.task).to.have.a.property('taskId');
        expect(response.body.task).to.have.a.property('toDoId');
        expect(response.body.task.title).to.equal(tasks[0].title);
        expect(response.body.task.priority).to.equal(tasks[0].priority);
      });

      it('should return an array of tasks', async () => {
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

      it('should return the updated task object', async () => {
        const response = await request(app)
          .patch(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks/${storage
            .getItemSync('taskId')}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send({ completed: true })
          .expect(200);

        expect(response.body).to.be.an('object');
        expect(response.body.completed).to.equal(true);
      });
    });
    describe('When a user sends an invalid task details', () => {
      it('should return `Title is required`', async () => {
        const response = await request(app)
          .post(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send()
          .expect(400);

        expect(JSON.parse(response.error.text).errors[0].msg)
          .to.equal('Title is required');
      });

      it('should return `Completed can only be true or false`', async () => {
        const response = await request(app)
          .patch(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks/${storage
            .getItemSync('taskId')}`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send({ completed: null })
          .expect(400);

        expect(response.body.error)
          .to.equal('Task does not exist');
      });

      it('should return `taskId is invalid`', async () => {
        const response = await request(app)
          .patch(`/api/v1/todos/${storage.getItemSync('toDoId')}/tasks/3953oewr`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send({ completed: null })
          .expect(400);

        expect(response.body.error).to.equal('taskId is ivalid');
      });

      it('should return `task does not exist`', async () => {
        const response = await request(app)
          .patch(`/api/v1/todos/${storage
            .getItemSync('toDoId')}/tasks/5a15507e6c7d3b0014b47c6f`)
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send({ completed: null })
          .expect(400);

        expect(response.body.error).to.equal('Task does not exist');
      });

      it('should return `todo does not exist`', async () => {
        const response = await request(app)
          .patch('/api/v1/todos/5a15507e6c7d3b0014b47c6f/tasks/5a15507e6c7d3b0014b47c6f')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send({ completed: null })
          .expect(400);

        expect(response.body.error).to.equal('To-do does not exist');
      });

      it('should return `toDoId is invalid`', async () => {
        const response = await request(app)
          .patch('/api/v1/todos/5a15507e/tasks/5a15507e6c7d3b0014b47c6f')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('token', storage.getItemSync('token'))
          .send({ completed: null })
          .expect(400);

        expect(response.body.error).to.equal('toDoId is invalid');
      });
    });
  });
});
