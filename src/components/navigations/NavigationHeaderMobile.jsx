import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../buttons/IconButton';
import Logo from '../ui/Logo';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from '../../states/authUser/action';

function NavigationHeaderMobile() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(handleLogout());
  };
  return (
    <div
      className="flex justify-between p-4 bg-transparent"
      style={{ background: 'transparent' }}
    >
      <Logo className="w-26" />
      <IconButton
        title={authUser.name}
        icon={faArrowRightFromBracket}
        className="text-md font-semibold gap-2"
        iconClass="text-pink-600"
        onClick={logout}
      />
    </div>
  );
}

export default NavigationHeaderMobile;
