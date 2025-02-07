import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import AppRouter from './routes/AppRouter';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './states';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
