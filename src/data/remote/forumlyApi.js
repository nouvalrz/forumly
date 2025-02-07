import { getAccessToken } from '../../utils/accessToken';
import axios from 'axios';

const forumlyClient = axios.create({
  baseURL: 'https://forum-api.dicoding.dev/v1',
});

forumlyClient.interceptors.request.use(
  (config) => {
    if (config.withToken) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const forumlyApi = (() => {
  async function register({ name, email, password }) {
    const response = await forumlyClient.post('/register', {
      name,
      email,
      password,
    });

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { user },
    } = response.data;

    return user;
  }

  async function login({ email, password }) {
    const response = await forumlyClient.post('/login', { email, password });

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { token },
    } = response.data;

    return token;
  }

  async function getAllUser() {
    const response = await forumlyClient.get('/users');

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { users },
    } = response.data;

    return users;
  }

  async function getProfile() {
    const response = await forumlyClient.get('/users/me', { withToken: true });

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { user },
    } = response.data;

    return user;
  }

  async function getAllThread() {
    const response = await forumlyClient.get('/threads');

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { threads },
    } = response.data;

    return threads;
  }

  async function createThread({ title, body, category = '' }) {
    const response = await forumlyClient.post(
      '/threads',
      { title, body, category },
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { thread },
    } = response.data;

    return thread;
  }

  async function getDetailThread(id) {
    const response = await forumlyClient.get(`/threads/${id}`);

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { detailThread },
    } = response.data;

    return detailThread;
  }

  async function createComment({ threadId, content }) {
    const response = await forumlyClient.post(
      `/threads/${threadId}/comments`,
      { content },
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { comment },
    } = response.data;

    return comment;
  }

  async function upVoteThread(id) {
    const response = await forumlyClient.post(
      `/threads/${id}/up-vote`,
      {},
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { vote },
    } = response.data;

    return vote;
  }

  async function downVoteThread(id) {
    const response = await forumlyClient.post(
      `/threads/${id}/down-vote`,
      {},
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { vote },
    } = response.data;

    return vote;
  }

  async function neutralVoteThread(id) {
    const response = await forumlyClient.post(
      `/threads/${id}/neutral-vote`,
      {},
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { vote },
    } = response.data;

    return vote;
  }

  async function upVoteComment({ threadId, commentId }) {
    const response = await forumlyClient.post(
      `threads/${threadId}/comments/${commentId}/up-vote`,
      {},
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { vote },
    } = response.data;

    return vote;
  }

  async function downVoteComment({ threadId, commentId }) {
    const response = await forumlyClient.post(
      `threads/${threadId}/comments/${commentId}/down-vote`,
      {},
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { vote },
    } = response.data;

    return vote;
  }

  async function neutralVoteComment({ threadId, commentId }) {
    const response = await forumlyClient.post(
      `threads/${threadId}/comments/${commentId}/neutral-vote`,
      {},
      { withToken: true }
    );

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { vote },
    } = response.data;

    return vote;
  }

  async function getLeaderboards() {
    const response = await forumlyClient.get('/leaderboards');

    if (response.data.status !== 'success') {
      throw new Error(response.data.message);
    }

    const {
      data: { leaderboards },
    } = response.data;

    return leaderboards;
  }

  return {
    register,
    login,
    createComment,
    createThread,
    downVoteComment,
    downVoteThread,
    getAllThread,
    getAllUser,
    getDetailThread,
    getLeaderboards,
    getProfile,
    neutralVoteComment,
    neutralVoteThread,
    upVoteComment,
    upVoteThread,
  };
})();

export default forumlyApi;
