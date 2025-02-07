import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../buttons/IconButton';
import Logo from '../ui/Logo';
import { useSelector } from 'react-redux';

function NavigationHeaderMobile() {
  const authUser = useSelector((states) => states.authUser);
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
      />
    </div>
  );
}

export default NavigationHeaderMobile;
