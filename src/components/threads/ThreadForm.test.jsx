/**
 * testing scenarios
 *
 * - ThreadForm component
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle body typing correctly
 *  - should call handleAddThread thunk when button is clicked with correct values
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import { act } from 'react';
import ThreadForm from './ThreadForm';

vi.mock('../../states/threads/action', () => ({
  handleAddThread: vi.fn().mockImplementation(() => (dispatch) => {
    dispatch({ type: 'ADD_THREAD' });
    return Promise.resolve();
  }),
  ActionType: {},
}));

expect.extend(matchers);

describe('ThreadForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    renderWithProvidersAndRouter(<ThreadForm />);
    const titleInput = await screen.getByPlaceholderText('Title');
    const titleTestValue = 'Test Title';

    // action
    await act(async () => {
      await userEvent.type(titleInput, titleTestValue);
    });

    // assert
    expect(titleInput).toHaveValue(titleTestValue);
  });

  it('should handle category typing correctly', async () => {
    // arrange
    renderWithProvidersAndRouter(<ThreadForm />);
    const categoryInput = await screen.getByPlaceholderText('Category');
    const categoryTestValue = 'Test Category';

    // action
    await act(async () => {
      await userEvent.type(categoryInput, categoryTestValue);
    });

    // assert
    expect(categoryInput).toHaveValue(categoryTestValue);
  });

  it('should handle body typing correctly', async () => {
    // arrange
    renderWithProvidersAndRouter(<ThreadForm />);
    const bodyInput = await screen.getByPlaceholderText('Body');
    const bodyTestValue = 'Body Test';

    // action
    await act(async () => {
      await userEvent.type(bodyInput, bodyTestValue);
    });

    // assert
    expect(bodyInput).toHaveValue(bodyTestValue);
  });

  it('should call handleAddThread thunk when button is clicked with correct values', async () => {
    // arrange
    const threadData = {
      title: 'Title Test',
      category: 'Category Test',
      body: 'Body Test',
    };

    renderWithProvidersAndRouter(<ThreadForm />);

    const titleInput = await screen.getByPlaceholderText('Title');
    const categoryInput = await screen.getByPlaceholderText('Category');
    const bodyInput = await screen.getByPlaceholderText('Body');

    await act(async () => {
      await userEvent.type(titleInput, threadData.title);
      await userEvent.type(categoryInput, threadData.category);
      await userEvent.type(bodyInput, threadData.body);
    });

    const postButton = await screen.getByRole('button', { name: 'Post' });

    // action
    await act(async () => {
      await userEvent.click(postButton);
    });

    // assert
    const { handleAddThread } = await import('../../states/threads/action');
    expect(handleAddThread).toHaveBeenCalledWith(threadData);
  });
});
