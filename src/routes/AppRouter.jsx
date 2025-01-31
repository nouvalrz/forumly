import { Route, Routes } from 'react-router';
import AuthPage, { AUTH_PAGE_TYPE } from '../pages/AuthPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage type={AUTH_PAGE_TYPE.login} />} />
      <Route
        path="/register"
        element={<AuthPage type={AUTH_PAGE_TYPE.register} />}
      />
    </Routes>
  );
}

export default AppRouter;
