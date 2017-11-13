import chai from 'chai';
import ObjectId from 'objectid';

import Collaborator from './../../models/Collaborator';

const { expect } = chai;

describe('Collaborator Model', () => {
  before(async () => {
    await Collaborator.remove({});
  });

  const toDoId = ObjectId();
  const collaboratorId = ObjectId();

  it('should return a new collaborator data', async () => {
    const newCollaborator = await Collaborator({
      toDoId,
      collaboratorId
    }).save();

    expect(newCollaborator).to.be.an('object');
    expect(String(newCollaborator.toDoId)).to.be.equal(String(toDoId));
    expect(String(newCollaborator.collaboratorId)).to.be
      .equal(String(collaboratorId));
  });
});
