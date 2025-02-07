import clsx from 'clsx';
import Input from '../form/Input';
import RegularButton from '../buttons/RegularButton';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router';
import useForm from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { handleRegister } from '../../states/users/action';
import { setModalOpen, setModalText } from '../../states/modal/action';

const registerFormInitialValues = {
  name: '',
  email: '',
  password: '',
};

const validateRegisterForm = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }
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

function RegisterForm({ className }) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    registerFormInitialValues,
    validateRegisterForm
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const register = async () => {
    const result = await dispatch(handleRegister(values));
    if (result) {
      dispatch(setModalText('Successfully create new account'));
      dispatch(setModalOpen(true));
      navigate('/');
    }
  };

  return (
    <div
      className={clsx('flex flex-col justify-start items-center', className)}
    >
      <h2 className="md:text-2xl text-xl font-bold text-gray-800 ">
        Create new account
      </h2>
      <p className="text-gray-600 mb-7 md:text-xl text-sm">
        Enter your email and password
      </p>
      <form
        className="flex flex-col items-stretch w-full gap-4"
        onSubmit={handleSubmit(register)}
        // onSubmit={(event) => event.preventDefault()}
      >
        <div>
          <Input
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <RegularButton
          title="Register"
          type={RegularButton.type.submit}
          // onClick={openModal}
        />
      </form>

      <p className="text-sm md:text-md mt-5">
        Already have an account?{' '}
        <Link to="/" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
};

export default RegisterForm;
