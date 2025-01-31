import Input from '../form/Input';
import RegularButton from '../buttons/RegularButton';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function LoginForm({ className }) {
  return (
    <div
      className={clsx('flex flex-col justify-start items-center', className)}
    >
      <h2 className="text-2xl font-bold text-gray-800 ">
        Sign in to your account
      </h2>
      <p className="text-gray-600 mb-7">Enter your email and password</p>
      <div className="flex flex-col items-stretch w-full gap-4">
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <RegularButton title="Login" />
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
