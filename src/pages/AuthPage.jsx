import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/auth/LoginForm';
import AuthCover from '../components/auth/AuthCover';

export const AUTH_PAGE_TYPE = {
  login: 'LOGIN',
  register: 'REGISTER',
};

function AuthPage({ type }) {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <AuthCover className="flex-1" />
      <div className="flex-2 flex justify-center items-center">
        <LoginForm className="max-w-96" />
      </div>
    </div>
  );
}

AuthPage.propTypes = {
  type: PropTypes.oneOf([AUTH_PAGE_TYPE.login, AUTH_PAGE_TYPE.register]),
};

export default AuthPage;
