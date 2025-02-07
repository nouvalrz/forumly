import clsx from 'clsx';
import PropTypes from 'prop-types';

function RegularButton({ title, type = 'button', onClick, className }) {
  if (type === RegularButton.type.button) {
    return (
      <button
        className={clsx(
          className,
          'w-full rounded-md bg-pink-600 text-white px-3 py-2 font-semibold hover:bg-pink-700 transition-all cursor-pointer'
        )}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }

  if (type === RegularButton.type.submit) {
    return (
      <input
        type="submit"
        className={clsx(
          className,
          'w-full rounded-md bg-pink-600 text-white px-3 py-2 font-semibold hover:bg-pink-700 transition-all cursor-pointer'
        )}
        value={title}
      />
    );
  }
}

RegularButton.type = {
  button: 'button',
  submit: 'submit',
};

RegularButton.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([RegularButton.type.button, RegularButton.type.submit]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default RegularButton;
