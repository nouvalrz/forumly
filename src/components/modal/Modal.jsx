import PropTypes from 'prop-types';
import Backdrop from './Backdrop';
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const dropAnimation = {
  hidden: {
    opacity: 0,
    y: -100, // Muncul dari atas layar
  },
  visible: {
    opacity: 1,
    y: 0, // Berhenti di posisi normal
    transition: {
      duration: 0.3,
      type: 'spring',
    },
  },
  exit: {
    opacity: 0,
    y: -100, // Kembali ke atas saat menghilang
  },
};

function Modal({ children, className }) {
  const modalText = useSelector((states) => states.modal.modalText);
  const modalOpen = useSelector((states) => states.modal.modalOpen);

  return (
    <AnimatePresence>
      {modalOpen && (
        <Backdrop>
          <motion.div
            onClick={(event) => event.stopPropagation()}
            className={clsx(
              className,
              'bg-[#fff6f6] rounded px-5 py-3 absolute top-5 shadow '
            )}
            variants={dropAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="text-gray-800 capitalize font-semibold">
              {modalText}
            </p>
            {children && children}
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  text: PropTypes.string,
};

export default Modal;
