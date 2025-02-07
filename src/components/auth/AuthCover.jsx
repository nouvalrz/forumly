import pinkGridDecor from '../../assets/pink-grid-decor.svg';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Logo from '../ui/Logo';
import RotatingText from '../ui/RotatingText';

function AuthCover({ className }) {
  return (
    <div
      className={clsx(
        'relative p-10 md:p-16 bg-linear-to-br from-red-100 to-zinc-50',
        className
      )}
    >
      <img src={pinkGridDecor} className="absolute bottom-0 right-0" />

      <div className="flex flex-col md:items-start items-center h-full">
        <Logo />

        <div className="flex flex-col md:items-start items-center gap-1">
          <h1 className="text-xl font-extrabold md:text-3xl text-gray-800 max-w-96 mt-10">
            Where
          </h1>
          <h1 className="text-xl font-extrabold md:text-3xl text-gray-800 max-w-96 ">
            Conversations spark
          </h1>
          <RotatingText
            texts={['Links.', 'Network.', 'Synergies.']}
            mainClassName="text-xl font-extrabold md:text-3xl text-pink-600 overflow-hidden"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        <p className="mt-auto md:text-left text-center md:text-lg text-sm">
          Created by Nouval Rizky
        </p>
      </div>
    </div>
  );
}

AuthCover.propTypes = {
  className: PropTypes.string,
};

export default AuthCover;
