import PropTypes from 'prop-types';
import LoginForm from '../components/auth/LoginForm';
import AuthCover from '../components/auth/AuthCover';

import RegisterForm from '../components/auth/RegisterForm';

function AuthPage({ type }) {
  return (
    <section className="flex flex-col min-h-screen md:flex-row">
      <AuthCover className="flex-1" />
      <div className="flex-2 flex flex-col justify-start md:justify-center items-center p-10 text">
        {type === AuthPage.type.login && (
          <LoginForm className="max-w-96 w-full" />
        )}
        {type === AuthPage.type.register && (
          <RegisterForm className="max-w-96 w-full" />
        )}
      </div>
    </section>
  );
}
AuthPage.type = {
  login: 'LOGIN',
  register: 'REGISTER',
};

AuthPage.propTypes = {
  type: PropTypes.oneOf([AuthPage.type.login, AuthPage.type.register]),
};

export default AuthPage;
