import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forumlyApi from '../../data/remote/forumlyApi';
import { setModalOpen, setModalText } from '../modal/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsers(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

function handleRegister({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await forumlyApi.register({ name, email, password });
      dispatch(hideLoading());
      return true;
    } catch (error) {
      dispatch(
        setModalText(
          `⛔️ ${error.response.data.message || 'Something went wrong'}`
        )
      );
      dispatch(setModalOpen(true));
      dispatch(hideLoading());
    }
  };
}

function fetchUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await forumlyApi.getAllUser();
      dispatch(receiveUsers(users));
    } catch (error) {
      dispatch(
        setModalText(
          `⛔️  ${error.response.data.message || 'Something went wrong'}`
        )
      );
      dispatch(setModalOpen(true));
    }
    dispatch(hideLoading());
  };
}

export { handleRegister, fetchUsers, ActionType, receiveUsers };
