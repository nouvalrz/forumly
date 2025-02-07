import { ActionType } from './action';

const initialValues = {
  modalOpen: false,
  modalText: '',
};

function modalReducer(modal = initialValues, action = {}) {
  switch (action.type) {
  case ActionType.SET_MODAL_OPEN:
    return { ...modal, modalOpen: action.payload.modalOpen };
  case ActionType.SET_MODAL_TEXT:
    return { ...modal, modalText: action.payload.modalText };
  default:
    return modal;
  }
}

export default modalReducer;
