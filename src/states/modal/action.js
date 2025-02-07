const ActionType = {
  SET_MODAL_OPEN: 'SET_MODAL_OPEN',
  SET_MODAL_TEXT: 'SET_MODAL_TEXT',
};

function setModalOpen(modalOpen) {
  return {
    type: ActionType.SET_MODAL_OPEN,
    payload: { modalOpen },
  };
}

function setModalText(modalText) {
  return {
    type: ActionType.SET_MODAL_TEXT,
    payload: { modalText },
  };
}

export { ActionType, setModalOpen, setModalText };
