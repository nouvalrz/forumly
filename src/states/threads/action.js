import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forumlyApi from '../../data/remote/forumlyApi';
import { setModalText, setModalOpen } from '../modal/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  SET_UP_VOTE_THREAD: 'SET_UP_VOTE_THREAD',
  SET_DOWN_VOTE_THREAD: 'SET_DOWN_VOTE_THREAD',
  SET_NEUTRAL_VOTE_THREAD: 'SET_NEUTRAL_VOTE_THREAD',
  ADD_THREAD: 'ADD_THREAD',
};

function receiveThreads(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function setUpVoteThread({ threadId, authUserId }) {
  return {
    type: ActionType.SET_UP_VOTE_THREAD,
    payload: { threadId, authUserId },
  };
}

function setDownVoteThread({ threadId, authUserId }) {
  return {
    type: ActionType.SET_DOWN_VOTE_THREAD,
    payload: { threadId, authUserId },
  };
}

function setNeutralVoteThread({ threadId, authUserId }) {
  return {
    type: ActionType.SET_NEUTRAL_VOTE_THREAD,
    payload: { threadId, authUserId },
  };
}

function addThread(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function handleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();
    const thread = threads.find((thread) => thread.id === threadId);
    const isVoted = thread.upVotesBy.includes(authUser.id);

    if (!isVoted) {
      dispatch(setUpVoteThread({ threadId, authUserId: authUser.id }));

      try {
        await forumlyApi.upVoteThread(threadId);
      } catch (error) {
        console.log(error);
        dispatch(setNeutralVoteThread(threadId));
      }
    } else {
      dispatch(handleNeutralVoteThread(threadId));
    }

    dispatch(hideLoading());
  };
}

function handleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();
    const thread = threads.find((thread) => thread.id === threadId);
    const isDownVoted = thread.downVotesBy.includes(authUser.id);

    if (!isDownVoted) {
      dispatch(setDownVoteThread({ threadId, authUserId: authUser.id }));

      try {
        await forumlyApi.downVoteThread(threadId);
      } catch (error) {
        console.log(error);
        dispatch(setNeutralVoteThread(threadId));
      }
    } else {
      dispatch(handleNeutralVoteThread(threadId));
    }

    dispatch(hideLoading());
  };
}

function handleNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(setNeutralVoteThread({ threadId, authUserId: authUser.id }));

    try {
      await forumlyApi.neutralVoteThread(threadId);
    } catch (error) {
      console.log(error);
      dispatch(setNeutralVoteThread(threadId));
    }

    dispatch(hideLoading());
  };
}

function fetchThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await forumlyApi.getAllThread();
      dispatch(receiveThreads(threads));
    } catch (error) {
      console.error(error);
    }
    dispatch(hideLoading());
  };
}

function handleAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await forumlyApi.createThread({ title, body, category });
      dispatch(addThread(thread));
      dispatch(hideLoading());
      return true;
    } catch (error) {
      dispatch(
        setModalText(
          '⛔️ ' + (error.response.data.message || 'Something went wrong')
        )
      );
      dispatch(setModalOpen(true));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreads,
  fetchThreads,
  handleDownVoteThread,
  handleNeutralVoteThread,
  handleUpVoteThread,
  setDownVoteThread,
  setNeutralVoteThread,
  setUpVoteThread,
  handleAddThread,
};
