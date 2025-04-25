/*
* test scenario for threadsReducers
*
* - threadsReducers function
*  - should return the initial state when given by unknown action
*  - should return threads when given RECEIVE_THREADS action
*  - should return threads with new thread when given ADD_THREAD action
*  - should return threads with up voted when given SET_UP_VOTE_THREAD action
*  - should return threads with down voted when given SET_DOWN_VOTE_THREAD
*  - should return threads with neutral voted when given SET_NEUTRAL_VOTE_THREAD
*/

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should return threads when given RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'threads-1',
            title: 'title1',
            body: 'body1',
            category: 'category1',
            createdAt: 'now',
            ownerId: 'user1',
            totalComments: 1,
            upVotesBy: ['user2'],
            downVotesBy: ['user3']
          },
          {
            id: 'threads-2',
            title: 'title2',
            body: 'body2',
            category: 'category2',
            createdAt: 'now',
            ownerId: 'user2',
            totalComments: 2,
            upVotesBy: ['user4'],
            downVotesBy: ['user5']
          }
        ]
      }
    };

    // action
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual(action.payload.threads);
  });

  it('should return threads with new thread when given ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'threads-1',
        title: 'title1',
        body: 'body1',
        category: 'category1',
        createdAt: 'now',
        ownerId: 'user1',
        totalComments: 1,
        upVotesBy: ['user2'],
        downVotesBy: ['user3']
      },
    ];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'threads-2',
          title: 'title2',
          body: 'body2',
          category: 'category2',
          createdAt: 'now',
          ownerId: 'user2',
          totalComments: 2,
          upVotesBy: ['user4'],
          downVotesBy: ['user5']
        }
      }
    };

    // action
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return threads with up voted when given SET_UP_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'threads-1',
        title: 'title1',
        body: 'body1',
        category: 'category1',
        createdAt: 'now',
        ownerId: 'user1',
        totalComments: 1,
        upVotesBy: [],
        downVotesBy: ['user-10']
      },
    ];

    const action = {
      type: 'SET_UP_VOTE_THREAD',
      payload: {
        threadId: 'threads-1',
        authUserId: 'user-10'
      }
    };

    // action
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual([{
      ...initialState[0],
      upVotesBy: [action.payload.authUserId],
      downVotesBy: []
    }]);
  });

  it('should return threads with down voted when given SET_DOWN_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'threads-1',
        title: 'title1',
        body: 'body1',
        category: 'category1',
        createdAt: 'now',
        ownerId: 'user1',
        totalComments: 1,
        upVotesBy: ['user-10'],
        downVotesBy: []
      },
    ];

    const action = {
      type: 'SET_DOWN_VOTE_THREAD',
      payload: {
        threadId: 'threads-1',
        authUserId: 'user-10'
      }
    };

    // action
    const result = threadsReducer(initialState, action);

    // assert
    expect(result).toEqual([{
      ...initialState[0],
      downVotesBy: [action.payload.authUserId],
      upVotesBy: []
    }]);
  });

  it('should return threads with neutral voted when given SET_NEUTRAL_VOTE_THREAD', () => {
    // Neutral up vote
    // arrange
    const initialStateUpVote = [
      {
        id: 'threads-1',
        title: 'title1',
        body: 'body1',
        category: 'category1',
        createdAt: 'now',
        ownerId: 'user1',
        totalComments: 1,
        upVotesBy: ['user-10'],
        downVotesBy: []
      },
    ];

    const actionNeutralUpVote = {
      type: 'SET_NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'threads-1',
        authUserId: 'user-10'
      }
    };

    // action
    const resultNeutralUpVote = threadsReducer(initialStateUpVote, actionNeutralUpVote);

    // assert
    expect(resultNeutralUpVote).toEqual([{
      ...initialStateUpVote[0],
      upVotesBy: [],
      downVotesBy: []
    }]);

    // Neutral down vote
    // arrange
    const initialStateDownVote = [
      {
        id: 'threads-1',
        title: 'title1',
        body: 'body1',
        category: 'category1',
        createdAt: 'now',
        ownerId: 'user1',
        totalComments: 1,
        upVotesBy: [],
        downVotesBy: ['user-10']
      },
    ];

    const actionNeutralDownVote = {
      type: 'SET_NEUTRAL_VOTE_THREAD',
      payload: {
        threadId: 'threads-1',
        authUserId: 'user-10'
      }
    };

    // action
    const resultNeutralDownVote = threadsReducer(initialStateDownVote, actionNeutralDownVote);

    // assert
    expect(resultNeutralDownVote).toEqual([{
      ...initialStateDownVote[0],
      upVotesBy: [],
      downVotesBy: []
    }]);
  });
});