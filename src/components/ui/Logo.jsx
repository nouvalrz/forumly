import clsx from 'clsx';
import forumlyLogo from '../../assets/forumly-logo.svg';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return <img src={forumlyLogo} className={clsx(className)} />;
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
