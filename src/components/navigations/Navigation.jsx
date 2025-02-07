import { Link, useLocation } from 'react-router';
import IconButton from '../buttons/IconButton';
import {
  faChartSimple,
  faHouse,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../ui/Logo';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../states/authUser/action';

function Navigation() {
  const location = useLocation();
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <div className="bg-white  w-screen  border-t p-4  lg:p-8  lg:max-w-[18rem] lg:border-t-0 lg:border-r lg:h-screen lg:flex lg:flex-col order-last lg:order-0">
      <div className="hidden lg:block mb-20">
        <Logo />
      </div>
      <div className="flex justify-evenly lg:flex-col lg:items-start lg:gap-[3rem] lg:justify-start lg:h-full">
        <Link to="/" className="flex-1 lg:flex-0 flex justify-center">
          <IconButton
            title="Explore"
            icon={faHouse}
            className={clsx('flex-col gap-1 lg:flex-row lg:gap-3 ', {
              'text-pink-600': location.pathname === '/',
            })}
            titleClass="text-sm order-3 lg:font-semibold lg:text-lg"
            iconClass="lg:text-lg"
          />
        </Link>
        <Link to="/thread" className="flex-1 lg:flex-0  flex justify-center">
          <IconButton
            title="New Thread"
            icon={faSquarePlus}
            className={clsx('flex-col gap-1 lg:flex-row lg:gap-3 ', {
              'text-pink-600': location.pathname === '/thread',
            })}
            titleClass="text-sm order-3 lg:font-semibold lg:text-lg"
            iconClass="lg:text-lg"
          />
        </Link>
        <Link
          to="/leaderboard"
          className="flex-1 lg:flex-0  flex justify-center "
        >
          <IconButton
            title="Leaderboard"
            icon={faChartSimple}
            className={clsx('flex-col gap-1 lg:flex-row lg:gap-3 ', {
              'text-pink-600': location.pathname === '/leaderboard',
            })}
            titleClass="text-sm order-3 lg:font-semibold lg:text-lg"
            iconClass="lg:text-lg"
          />
        </Link>

        <div className="hidden lg:block mt-auto">
          <IconButton
            title={authUser.name}
            icon={faArrowRightFromBracket}
            className="text-md font-semibold gap-2 "
            iconClass="text-pink-600"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
