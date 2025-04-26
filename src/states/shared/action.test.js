/**
  * test scenarios
  *
  * - populateThreadsAndUsers thunk
  *  - should dispatch action correctly when data fetching success
  *  - should dispatch action and call error modal correctly when data fetching failed
*/

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import forumlyApi from '../../data/remote/forumlyApi';
import { populateThreadsAndUsers } from './action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { receiveUsers } from '../users/action';
import { receiveThreads } from '../threads/action';
import { setModalOpen, setModalText } from '../modal/action';

const fakeThreadsResponse = [
  {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    category: 'redux',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-mQhLzINW_w5TxxYf',
    totalComments: 1,
    upVotesBy: [
      'user-mQhLzINW_w5TxxYf'
    ],
    downVotesBy: []
  }
];

const fakeUsersResponse = [
  {
    id: 'user-1arruYipuS9PIhPm',
    name: 'surya16',
    email: 'surya16@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=surya16&background=random'
  }
];

const fakeErrorResponse = {
  response: {
    data: {
      message: 'Ups, Something went wrong'
    }
  }
};

describe('populateThreadsAndUsers thunk', () => {
  beforeEach(() => {
    forumlyApi._getAllThread = forumlyApi.getAllThread;
    forumlyApi._getAllUser = forumlyApi.getAllUser;
  });

  afterEach(() => {
    forumlyApi.getAllThread = forumlyApi._getAllThread;
    forumlyApi.getAllUser = forumlyApi._getAllUser;

    delete forumlyApi._getAllThread;
    delete forumlyApi._getAllUser;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    forumlyApi.getAllThread = () => Promise.resolve(fakeThreadsResponse);
    forumlyApi.getAllUser = () => Promise.resolve(fakeUsersResponse);

    const dispatch = vi.fn();

    // action
    await populateThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsers(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreads(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call error modal correctly when data fetching failed', async () => {
    // arrange
    forumlyApi.getAllThread = () => Promise.reject(fakeErrorResponse);
    forumlyApi.getAllUser = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    // action
    await populateThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setModalText(`⛔️  ${fakeErrorResponse.response.data.message}`));
    expect(dispatch).toHaveBeenCalledWith(setModalOpen(true));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

  });
});