/**
 * testing scenarios
 *
 * - LoginForm component
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call handleLogin thunk when button is clicked with correct values
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import LoginForm from './LoginForm';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { renderWithProvidersAndRouter } from '../../utils/testUtils';
import { act } from 'react';

vi.mock('../../states/authUser/action', () => ({
  handleLogin: vi.fn().mockImplementation(() => (dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    return Promise.resolve();
  }),
  ActionType: {},
}));

expect.extend(matchers);

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    renderWithProvidersAndRouter(<LoginForm />);
    const emailInput = await screen.getByPlaceholderText('Email');
    const emailTestValue = 'mailtest@mail.com';

    // action
    await act(async () => {
      await userEvent.type(emailInput, emailTestValue);
    });

    // assert
    expect(emailInput).toHaveValue(emailTestValue);
  });

  it('should handle password typing correctly', async () => {
    // arrange
    renderWithProvidersAndRouter(<LoginForm />);
    const passwordInput = await screen.getByPlaceholderText('Password');
    const passwordTestValue = 'passwordtest';

    // action
    await act(async () => {
      await userEvent.type(passwordInput, passwordTestValue);
    });

    // assert
    expect(passwordInput).toHaveValue(passwordTestValue);
  });

  it('should call handleLogin thunk when button is clicked with correct values', async () => {
    // arrange
    const loginData = {
      email: 'test@mail.com',
      password: 'passwordtest',
    };

    renderWithProvidersAndRouter(<LoginForm />);

    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');

    await act(async () => {
      await userEvent.type(emailInput, loginData.email);
      await userEvent.type(passwordInput, loginData.password);
    });

    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // action
    await act(async () => {
      await userEvent.click(loginButton);
    });

    // assert
    const { handleLogin } = await import('../../states/authUser/action');
    expect(handleLogin).toHaveBeenCalledWith(loginData);
  });
});
