import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import storeInstance from '../states';
import { MemoryRouter } from 'react-router';

export const renderWithProvidersAndRouter = (ui, options) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <Provider store={storeInstance}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    ),
    ...options,
  });
};
