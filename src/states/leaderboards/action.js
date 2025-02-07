import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forumlyApi from '../../data/remote/forumlyApi';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboards(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: { leaderboards },
  };
}

function fetchLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await forumlyApi.getLeaderboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      console.error(error);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, fetchLeaderboards };
