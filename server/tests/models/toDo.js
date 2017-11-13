import chai from 'chai';

import ToDo from './../../models/ToDo';
import toDos from './../testData/toDos';

const { expect } = chai;

describe('ToDo Model', () => {
  before(async () => {
    await ToDo.remove({});
  });

  it('should return a new todo data', async () => {
    const newToDo = await ToDo(toDos[0]).save();

    expect(newToDo).to.be.an('object');
    expect(newToDo).to.have.a.property('_id');
    expect(newToDo.title).to.be.equal(toDos[0].title);
  });
});
