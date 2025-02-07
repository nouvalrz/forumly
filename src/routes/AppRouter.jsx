import { Route, Routes } from 'react-router';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import Navigation from '../components/navigations/Navigation';
import NavigationHeaderMobile from '../components/navigations/NavigationHeaderMobile';
import AddPage from '../pages/AddPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import LoadingBar from 'react-redux-loading-bar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePreload } from '../states/isPreload/action';
import Modal from '../components/modal/Modal';
import DetailPage from '../pages/DetailPage';

function AppRouter() {
  const dispatch = useDispatch();

  const { authUser = null, isPreload = false } = useSelector(
    (states) => states
  );

  useEffect(() => {
    dispatch(handlePreload());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <main>
        <LoadingBar
          showFastActions
          style={{ backgroundColor: 'oklch(0.592 0.249 0.584)', zIndex: 100 }}
        />
        <Modal />
        <Routes>
          <Route path="/*" element={<AuthPage type={AuthPage.type.login} />} />
          <Route
            path="/register"
            element={<AuthPage type={AuthPage.type.login} />}
          />
        </Routes>
      </main>
    );
  }

  return (
    <main className="bg-[linear-gradient(170deg,_rgba(255,228,239,1)_0%,_rgba(255,255,255,1)_23%)] lg:bg-none">
      <LoadingBar
        showFastActions
        style={{ backgroundColor: 'oklch(0.592 0.249 0.584)', zIndex: 100 }}
      />
      <Modal />

      <div className="min-w-screen h-dvh flex flex-col lg:flex-row">
        <div className="lg:hidden">
          <NavigationHeaderMobile />
        </div>
        <Navigation />
        <div className="flex-1 overflow-scroll lg:bg-[linear-gradient(170deg,_rgba(255,228,239,1)_0%,_rgba(255,255,255,1)_23%)]">
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/thread/:id" element={<DetailPage />} />
            <Route path="/thread" element={<AddPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default AppRouter;
