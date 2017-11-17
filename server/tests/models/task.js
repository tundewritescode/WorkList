import chai from 'chai';

import Task from './../../models/Task';
import tasks from './../testData/tasks';

const { expect } = chai;

describe('Task Model', () => {
  before(async () => {
    await Task.remove({});
  });

  it('should return a new task data', async () => {
    const newTask = await Task(tasks[0]).save();

    expect(newTask).to.be.an('object');
    expect(newTask).to.have.a.property('_id');
    expect(newTask.title).to.be.equal(tasks[0].title);
    expect(newTask.title).to.be.equal(tasks[0].title);
    expect(newTask.priority).to.be.equal(tasks[0].priority);
  });
});
