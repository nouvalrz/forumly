import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.SET_UP_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: [...threadDetail.upVotesBy, action.payload.authUserId],
      downVotesBy: threadDetail.downVotesBy.filter(
        (downVote) => downVote !== action.payload.authUserId
      ),
    };
  case ActionType.SET_DOWN_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      downVotesBy: [...threadDetail.downVotesBy, action.payload.authUserId],
      upVotesBy: threadDetail.upVotesBy.filter(
        (upVote) => upVote !== action.payload.authUserId
      ),
    };
  case ActionType.SET_NEUTRAL_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter(
        (upVote) => upVote !== action.payload.authUserId
      ),
      downVotesBy: threadDetail.downVotesBy.filter(
        (downVote) => downVote !== action.payload.authUserId
      ),
    };
  case ActionType.SET_UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: [...comment.upVotesBy, action.payload.authUserId],
            downVotesBy: comment.downVotesBy.filter(
              (downVote) => downVote !== action.payload.authUserId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.SET_DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: [...comment.downVotesBy, action.payload.authUserId],
            upVotesBy: comment.upVotesBy.filter(
              (upVote) => upVote !== action.payload.authUserId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.SET_NEUTRAL_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (upVote) => upVote !== action.payload.authUserId
            ),
            downVotesBy: comment.downVotesBy.filter(
              (downVote) => downVote !== action.payload.authUserId
            ),
          };
        }
        return comment;
      }),
    };
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
