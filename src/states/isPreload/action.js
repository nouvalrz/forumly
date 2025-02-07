import forumlyApi from '../../data/remote/forumlyApi';
import { setAuthUser } from '../authUser/action';
import { setModalText, setModalOpen } from '../modal/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreload(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function handlePreload() {
  return async (dispatch) => {
    try {
      const authUser = await forumlyApi.getProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      dispatch(
        setModalText(
          `⛔️  ${error.response.data.message || 'Something went wrong'}`
        )
      );
      dispatch(setModalOpen(true));

      dispatch(setAuthUser(null));
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}

export { ActionType, setIsPreload, handlePreload };
