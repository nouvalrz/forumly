/**
 * test scenarios
 *
 * - fetchLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call error modal correctly when data fetching failed
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchLeaderboards, receiveLeaderboards } from './action';
import forumlyApi from '../../data/remote/forumlyApi';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { setModalOpen, setModalText } from '../modal/action';

const fakeLeaderboardResponse = [
  {
    'user': {
      'id': 'user-mQhLzINW_w5TxxYf',
      'name': 'Dimas Saputra',
      'email': 'dimas@dicoding.com',
      'avatar': 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random'
    },
    'score': 55
  }
];

const fakeErrorResponse = {
  response: {
    data: {
      message: 'Ups, Something went wrong'
    }
  }
};

describe('fetchLeaderboards thunk', () => {
  beforeEach(() => {
    forumlyApi._getLeaderboards = forumlyApi.getLeaderboards;
  });

  afterEach(() => {
    forumlyApi.getLeaderboards = forumlyApi._getLeaderboards;

    delete forumlyApi._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    forumlyApi.getLeaderboards = () => Promise.resolve(fakeLeaderboardResponse);

    const dispatch = vi.fn();

    // action
    await fetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboards(fakeLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call error modal correctly when data fetching failed', async () => {
    // arrange
    forumlyApi.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    // action
    await fetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setModalText(`⛔️  ${fakeErrorResponse.response.data.message}`));
    expect(dispatch).toHaveBeenCalledWith(setModalOpen(true));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

