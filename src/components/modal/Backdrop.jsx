import clsx from 'clsx';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setModalOpen } from '../../states/modal/action';

function Backdrop({ children, className }) {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(setModalOpen(false));
  };
  return (
    <motion.div
      className={clsx(
        'absolute top-0 left-0 h-screen w-screen flex justify-center items-center z-20',
        className
      )}
      onClick={close}
      initial={{ opacity: 0, transition: { duration: 0.3 } }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

Backdrop.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default Backdrop;
