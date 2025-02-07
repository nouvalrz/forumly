import clsx from 'clsx';
import PropTypes from 'prop-types';

function BaseCard({ children, className }) {
  return (
    <div
      className={clsx(
        className,
        'rounded border-1 border-[#EAEAEA] bg-white p-3 md:px-5 md:py-4'
      )}
    >
      {children}
    </div>
  );
}

BaseCard.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default BaseCard;
