import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forumlyApi from '../../data/remote/forumlyApi';
import { setModalOpen, setModalText } from '../modal/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  SET_UP_VOTE_THREAD_DETAIL: 'SET_UP_VOTE_THREAD_DETAIL',
  SET_DOWN_VOTE_THREAD_DETAIL: 'SET_DOWN_VOTE_THREAD_DETAIL',
  SET_NEUTRAL_VOTE_THREAD_DETAIL: 'SET_NEUTRAL_VOTE_THREAD_DETAIL',
  SET_UP_VOTE_COMMENT: 'SET_UP_VOTE_COMMENT',
  SET_DOWN_VOTE_COMMENT: 'SET_DOWN_VOTE_COMMENT',
  SET_NEUTRAL_VOTE_COMMENT: 'SET_NEUTRAL_VOTE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
};

function receiveThreadDetail(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetail() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function setUpVoteThreadDetail(authUserId) {
  return {
    type: ActionType.SET_UP_VOTE_THREAD_DETAIL,
    payload: { authUserId },
  };
}

function setDownVoteThreadDetail(authUserId) {
  return {
    type: ActionType.SET_DOWN_VOTE_THREAD_DETAIL,
    payload: { authUserId },
  };
}

function setNeutralVoteThreadDetail(authUserId) {
  return {
    type: ActionType.SET_NEUTRAL_VOTE_THREAD_DETAIL,
    payload: { authUserId },
  };
}

function setUpVoteComment({ commentId, authUserId }) {
  return {
    type: ActionType.SET_UP_VOTE_COMMENT,
    payload: { commentId, authUserId },
  };
}

function setDownVoteComment({ commentId, authUserId }) {
  return {
    type: ActionType.SET_DOWN_VOTE_COMMENT,
    payload: { commentId, authUserId },
  };
}

function setNeutralVoteComment({ commentId, authUserId }) {
  return {
    type: ActionType.SET_NEUTRAL_VOTE_COMMENT,
    payload: { commentId, authUserId },
  };
}

function addComment(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function fetchThreadDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetail());

    try {
      const threadDetail = await forumlyApi.getDetailThread(id);
      dispatch(receiveThreadDetail(threadDetail));
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

function handleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const isVoted = threadDetail.upVotesBy.includes(authUser.id);

    if (!isVoted) {
      dispatch(setUpVoteThreadDetail(authUser.id));

      try {
        await forumlyApi.upVoteThread(threadDetail.id);
      } catch (error) {
        dispatch(
          setModalText(
            `⛔️  ${error.response.data.message || 'Something went wrong'}`
          )
        );
        dispatch(setModalOpen(true));
        dispatch(setNeutralVoteThreadDetail(authUser.id));
      }
    } else {
      dispatch(handleNeutralVoteThreadDetail());
    }

    dispatch(hideLoading());
  };
}

function handleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (!isDownVoted) {
      dispatch(setDownVoteThreadDetail(authUser.id));

      try {
        await forumlyApi.downVoteThread(threadDetail.id);
      } catch (error) {
        dispatch(
          setModalText(
            `⛔️  ${error.response.data.message || 'Something went wrong'}`
          )
        );
        dispatch(setModalOpen(true));
        dispatch(setNeutralVoteThreadDetail(authUser.id));
      }
    } else {
      dispatch(handleNeutralVoteThreadDetail());
    }

    dispatch(hideLoading());
  };
}

function handleNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    dispatch(setNeutralVoteThreadDetail(authUser.id));

    try {
      await forumlyApi.neutralVoteThread(threadDetail.id);
    } catch (error) {
      dispatch(
        setModalText(
          `⛔️  ${error.response.data.message || 'Something went wrong'}`
        )
      );
      dispatch(setModalOpen(true));
      dispatch(setNeutralVoteThreadDetail(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function handleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );
    const isCommentUpVoted = comment.upVotesBy.includes(authUser.id);

    if (!isCommentUpVoted) {
      dispatch(
        setUpVoteComment({ commentId: comment.id, authUserId: authUser.id })
      );

      try {
        await forumlyApi.upVoteComment({
          threadId: threadDetail.id,
          commentId: comment.id,
        });
      } catch (error) {
        dispatch(
          setModalText(
            `⛔️  ${error.response.data.message || 'Something went wrong'}`
          )
        );
        dispatch(setModalOpen(true));
        dispatch(
          setNeutralVoteComment({
            commentId: comment.id,
            authUserId: authUser.id,
          })
        );
      }
    } else {
      dispatch(handleNeutralVoteComment(comment.id));
    }

    dispatch(hideLoading());
  };
}

function handleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );
    const isCommentDownVoted = comment.downVotesBy.includes(authUser.id);

    if (!isCommentDownVoted) {
      dispatch(
        setDownVoteComment({ commentId: comment.id, authUserId: authUser.id })
      );

      try {
        await forumlyApi.downVoteComment({
          threadId: threadDetail.id,
          commentId: comment.id,
        });
      } catch (error) {
        dispatch(
          setModalText(
            `⛔️  ${error.response.data.message || 'Something went wrong'}`
          )
        );
        dispatch(setModalOpen(true));
        dispatch(
          setNeutralVoteComment({
            commentId: comment.id,
            authUserId: authUser.id,
          })
        );
      }
    } else {
      dispatch(handleNeutralVoteComment(comment.id));
    }

    dispatch(hideLoading());
  };
}

function handleNeutralVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find(
      (comment) => comment.id === commentId
    );

    dispatch(
      setNeutralVoteComment({ commentId: comment.id, authUserId: authUser.id })
    );

    try {
      await forumlyApi.neutralVoteComment({
        threadId: threadDetail.id,
        commentId: comment.id,
      });
    } catch (error) {
      dispatch(
        setModalText(
          `⛔️  ${error.response.data.message || 'Something went wrong'}`
        )
      );
      dispatch(setModalOpen(true));
      dispatch(
        setNeutralVoteComment({
          commentId: comment.id,
          authUserId: authUser.id,
        })
      );
    }

    dispatch(hideLoading());
  };
}

function sendComment({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { threadDetail } = getState();

    try {
      const comment = await forumlyApi.createComment({
        threadId: threadDetail.id,
        content,
      });
      dispatch(addComment(comment));
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

export {
  ActionType,
  clearThreadDetail,
  fetchThreadDetail,
  receiveThreadDetail,
  setDownVoteThreadDetail,
  setNeutralVoteThreadDetail,
  setUpVoteThreadDetail,
  handleDownVoteThreadDetail,
  handleNeutralVoteThreadDetail,
  handleUpVoteThreadDetail,
  handleDownVoteComment,
  handleNeutralVoteComment,
  handleUpVoteComment,
  sendComment,
};
