/*
test scenario for threadDetailReducer
*
* - threadDetailReducer function
*  - should return the initial state when given by unknown action
*  - should return thread detail when given RECEIVE_THREAD_DETAIL action
*  - should return null when given CLEAR_THREAD_DETAIL action
*  - should return thread with up vote when given SET_UP_VOTE_THREAD_DETAIL action
*  - should return thread with down vote when given SET_DOWN_VOTE_THREAD_DETAIL action
*  - should return thread with neutral vote when given SET_NEUTRAL_VOTE_THREAD_DETAIL action
*  - should return thread with new comment when given ADD_COMMENT action
*  - should return thread with comment and it's up vote when given SET_UP_VOTE_COMMENT action
*  - should return thread with comment and it's down vote when given SET_DOWN_VOTE_COMMENT action
*  - should return thread with comment and it's neutral vote when given SET_NEUTRAL_VOTE_COMMENT action
*/

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should return thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-Np47p4jhUXYhrhRn',
          title: 'Bagaimana pengalamanmu belajar Redux?',
          body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
          createdAt: '2023-05-29T07:55:52.266Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          category: 'redux',
          comments: [
            {
              id: 'comment-0xncglGkDd3wlTCB',
              content: 'ada',
              createdAt: '2025-03-11T09:44:28.387Z',
              owner: {
                id: 'user-mQhLzINW_w5TxxYf',
                name: 'Dimas Saputra',
                avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
              },
              upVotesBy: ['user-mQhLzINW_w5TxxYf'],
              downVotesBy: ['user-BGuiQAQSmnGaermd']
            }
          ],
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      }
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual(action.payload.threadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      ],
      upVotesBy: ['user-mQhLzINW_w5TxxYf'],
      downVotesBy: ['user-BGuiQAQSmnGaermd']
    };

    const action = {
      type: 'CLEAR_THREAD_DETAIL'
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual(null);
  });

  it('should return thread with up vote when given SET_UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      ],
      upVotesBy: [],
      downVotesBy: ['user-test']
    };

    const action = {
      type: 'SET_UP_VOTE_THREAD_DETAIL',
      payload: {
        authUserId: 'user-test'
      }
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual({
      ...initialState,
      upVotesBy: ['user-test'],
      downVotesBy: []
    });
  });

  it('should return thread with down vote when given SET_DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      ],
      upVotesBy: ['user-test'],
      downVotesBy: []
    };

    const action = {
      type: 'SET_DOWN_VOTE_THREAD_DETAIL',
      payload: {
        authUserId: 'user-test'
      }
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: ['user-test']
    });
  });

  it('should return thread with neutral vote when given SET_NEUTRAL_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      ],
      upVotesBy: ['user-test', 'other-user-1'],
      downVotesBy: ['other-user-2']
    };

    const action = {
      type: 'SET_NEUTRAL_VOTE_THREAD_DETAIL',
      payload: {
        authUserId: 'user-test'
      }
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual({
      ...initialState,
      upVotesBy: ['other-user-1'],
      downVotesBy: ['other-user-2']
    });
  });

  it('should return thread with new comment when given ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      ],
      upVotesBy: ['user-test', 'other-user-1'],
      downVotesBy: ['other-user-2']
    };

    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-new',
          content: 'new',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-new',
            name: 'new',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: [],
          downVotesBy: []
        }
      }
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual({
      ...initialState,
      comments: [
        action.payload.comment,
        ...initialState.comments
      ]
    });
  });

  it('should return thread with comment and its up vote when given SET_UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd', 'user-test']
        }
      ],
      upVotesBy: ['user-test', 'other-user-1'],
      downVotesBy: ['other-user-2']
    };

    const action = {
      type: 'SET_UP_VOTE_COMMENT',
      payload: {
        commentId: 'comment-0xncglGkDd3wlTCB',
        authUserId: 'user-test'
      }
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [...initialState.comments[0].upVotesBy, 'user-test'],
          downVotesBy: [initialState.comments[0].downVotesBy[0]]
        }
      ]
    });
  });

  it('should return thread with comment and its down vote when given SET_DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf', 'user-test'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      ],
      upVotesBy: ['user-test', 'other-user-1'],
      downVotesBy: ['other-user-2']
    };

    const action = {
      type: 'SET_DOWN_VOTE_COMMENT',
      payload: {
        authUserId: 'user-test',
        commentId: 'comment-0xncglGkDd3wlTCB'
      }
    };

    // action
    const result = threadDetailReducer(initialState, action);

    // assert
    expect(result).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [initialState.comments[0].upVotesBy[0]],
          downVotesBy: [...initialState.comments[0].downVotesBy, action.payload.authUserId]
        }
      ]
    });
  });

  it('should return thread with comment and its neutral vote when given SET_NEUTRAL_VOTE_COMMENT action', () => {
    // Neutral up vote comment
    // arrange
    const initialStateUpVoteComment = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf', 'user-test'],
          downVotesBy: ['user-BGuiQAQSmnGaermd']
        }
      ],
      upVotesBy: ['user-test', 'other-user-1'],
      downVotesBy: ['other-user-2']
    };

    const actionUpVoteComment = {
      type: 'SET_NEUTRAL_VOTE_COMMENT',
      payload: {
        authUserId: 'user-test',
        commentId: 'comment-0xncglGkDd3wlTCB'
      }
    };

    // action
    const resultNeutralUpVoteComment = threadDetailReducer(initialStateUpVoteComment, actionUpVoteComment);

    // assert
    expect(resultNeutralUpVoteComment).toEqual({
      ...initialStateUpVoteComment,
      comments: [
        {
          ...initialStateUpVoteComment.comments[0],
          upVotesBy: [initialStateUpVoteComment.comments[0].upVotesBy[0]],
        }
      ]
    });

    // Neutral down vote comment
    // arrange
    const initialStateDownVoteComment = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
      },
      category: 'redux',
      comments: [
        {
          id: 'comment-0xncglGkDd3wlTCB',
          content: 'ada',
          createdAt: '2025-03-11T09:44:28.387Z',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
          },
          upVotesBy: ['user-mQhLzINW_w5TxxYf'],
          downVotesBy: ['user-BGuiQAQSmnGaermd', 'user-test']
        }
      ],
      upVotesBy: ['user-test', 'other-user-1'],
      downVotesBy: ['other-user-2']
    };

    const actionDownVoteComment = {
      type: 'SET_NEUTRAL_VOTE_COMMENT',
      payload: {
        authUserId: 'user-test',
        commentId: 'comment-0xncglGkDd3wlTCB'
      }
    };

    // action
    const resultNeutralDownVoteComment = threadDetailReducer(initialStateDownVoteComment, actionDownVoteComment);

    // assert
    expect(resultNeutralDownVoteComment).toEqual({
      ...initialStateDownVoteComment,
      comments: [
        {
          ...initialStateDownVoteComment.comments[0],
          downVotesBy: [initialStateDownVoteComment.comments[0].downVotesBy[0]],
        }
      ]
    });
  });
});
