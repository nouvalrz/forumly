import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forumlyApi from '../../data/remote/forumlyApi';
import { receiveThreads } from '../threads/action';
import { receiveUsers } from '../users/action';

function populateThreadsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await forumlyApi.getAllUser();
      const threads = await forumlyApi.getAllThread();

      dispatch(receiveUsers(users));
      dispatch(receiveThreads(threads));
    } catch (error) {
      console.error(error);
    }
    dispatch(hideLoading());
  };
}

export { populateThreadsAndUsers };
