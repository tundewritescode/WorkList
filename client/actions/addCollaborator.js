import axios from 'axios';
import toastr from 'toastr';

import { Collaborator } from './types';

const addCollaboratorSuccess = message => (
  {
    type: Collaborator.ADD_COLLABORATOR_SUCCESS,
    message
  }
);

const addCollaboratorFailure = () => (
  {
    type: Collaborator.ADD_COLLABORATOR_FAILURE,
  }
);

const addCollaborator = (collaborator, toDoId) => async (dispatch) => {
  try {
    const { data } = await axios
      .post(`/api/v1/todos/${toDoId}/collaborators`, collaborator);
    dispatch(addCollaboratorSuccess(data.message));
    $('#add-collaborator').modal('close');
    toastr.success('Collaborator added!');
  } catch (error) {
    dispatch(addCollaboratorFailure());
    toastr.error(error.response.data.error);
  }
};

export default addCollaborator;
