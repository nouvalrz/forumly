import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forumlyApi from '../../data/remote/forumlyApi';
import { putAccessToken } from '../../utils/accessToken';
import { setModalOpen, setModalText } from '../modal/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUser(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUser() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function handleLogin({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await forumlyApi.login({ email, password });
      putAccessToken(token);

      const authUser = await forumlyApi.getProfile();
      dispatch(setAuthUser(authUser));

      dispatch(setModalText('🩷 Welcome to Forumly'));
      dispatch(setModalOpen(true));
    } catch (error) {
      console.error(error);
    }
    dispatch(hideLoading());
  };
}

function handleLogout() {
  return async (dispatch) => {
    try {
      putAccessToken('');
      dispatch(unsetAuthUser());

      dispatch(setModalText('👋 Bye-bye'));
      dispatch(setModalOpen(true));
    } catch (error) {
      console.error(error);
    }
  };
}

export { ActionType, handleLogin, handleLogout, setAuthUser, unsetAuthUser };
