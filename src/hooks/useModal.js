import { useState } from 'react';

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setIsModalText] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
    modalText,
    setIsModalText,
  };
}

export default useModal;
