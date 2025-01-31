import pinkGridDecor from '../../assets/pink-grid-decor.svg';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Logo from '../ui/Logo';

function AuthCover({ className }) {
  return (
    <div
      className={clsx(
        'relative p-16 bg-gradient-to-br from-red-100 to-zinc-50',
        className
      )}
    >
      <img src={pinkGridDecor} className="absolute bottom-0 right-0" />

      <div className="flex flex-col items-start h-full">
        <Logo />
        <h1 className="font-extrabold text-3xl text-gray-800 max-w-96 mt-10">
          Where conversations spark connections.
        </h1>

        <p className="mt-auto">Created by Nouval Rizky</p>
      </div>
    </div>
  );
}

AuthCover.propTypes = {
  className: PropTypes.string,
};

export default AuthCover;
