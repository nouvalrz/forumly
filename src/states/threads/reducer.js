import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.SET_UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: [...thread.upVotesBy, action.payload.authUserId],
          downVotesBy: thread.downVotesBy.filter(
            (downVoteId) => downVoteId !== action.payload.authUserId
          ),
        };
      }
      return thread;
    });
  case ActionType.SET_DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (upVoteId) => upVoteId !== action.payload.authUserId
          ),
          downVotesBy: [...thread.downVotesBy, action.payload.authUserId],
        };
      }
      return thread;
    });
  case ActionType.SET_NEUTRAL_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (upVoteId) => upVoteId !== action.payload.authUserId
          ),
          downVotesBy: thread.downVotesBy.filter(
            (downVoteId) => downVoteId !== action.payload.authUserId
          ),
        };
      }
      return thread;
    });
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  default:
    return threads;
  }
}

export default threadsReducer;
