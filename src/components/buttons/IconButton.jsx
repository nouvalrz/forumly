import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import PropTypes from 'prop-types';

function IconButton({
  title,
  icon,
  iconClass,
  titleClass,

  onClick,
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={clsx('flex items-center cursor-pointer', className)}
    >
      <span className={clsx(titleClass)}>{title}</span>
      <FontAwesomeIcon icon={icon} className={clsx(iconClass)} />
    </button>
  );
}

IconButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconClass: PropTypes.string,
  titleClass: PropTypes.string,
};

export default IconButton;
