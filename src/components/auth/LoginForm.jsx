import Input from '../form/Input';
import RegularButton from '../buttons/RegularButton';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../states/authUser/action';

const loginFormInitialValues = {
  email: '',
  password: '',
};

const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email format is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

function LoginForm({ className }) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    loginFormInitialValues,
    validateLoginForm
  );

  const dispatch = useDispatch();

  const login = async () => {
    dispatch(handleLogin(values));
  };

  return (
    <div
      className={clsx('flex flex-col justify-start items-center', className)}
    >
      <h2 className="text-xl font-bold text-gray-800 md:text-2xl ">
        Sign in to your account
      </h2>
      <p className="text-sm text-gray-600 mb-7 md:text-xl">
        Enter your email and password
      </p>
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col items-stretch w-full gap-4"
      >
        <div>
          <Input
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            name="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            name="password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        <RegularButton title="Login" type={RegularButton.type.submit} />
      </form>

      <p className="mt-5 text-sm md:text-md">
        Dont have an account?{' '}
        <Link to="/register" className="underline">
          Register
        </Link>
      </p>
    </div>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
