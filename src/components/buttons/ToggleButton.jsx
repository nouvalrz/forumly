import clsx from 'clsx';
import PropTypes from 'prop-types';

function ToggleButton({ title, isActive = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        { 'bg-pink-600 text-white border-0': isActive },
        { 'bg-transparent text-gray-800 border-1': !isActive },
        'rounded-md font-medium  border-gray-300 text-sm px-3 py-1 cursor-pointer'
      )}
    >
      {title}
    </button>
  );
}

ToggleButton.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ToggleButton;
