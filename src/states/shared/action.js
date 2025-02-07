import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forumlyApi from '../../data/remote/forumlyApi';
import { receiveThreads } from '../threads/action';
import { receiveUsers } from '../users/action';
import { setModalOpen, setModalText } from '../modal/action';

function populateThreadsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await forumlyApi.getAllUser();
      const threads = await forumlyApi.getAllThread();

      dispatch(receiveUsers(users));
      dispatch(receiveThreads(threads));
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

export { populateThreadsAndUsers };
