import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import storeInstance from '../states';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';

// export function renderWithProviders(ui, extendedRenderOptions = {}) {
//   const {
//     preloadedState = {},
//     // Automatically create a store instance if no store was passed in
//     store = storeInstance(preloadedState),
//     ...renderOptions
//   } = extendedRenderOptions;

//   const Wrapper = ({ children }) => (
//     <Provider store={store}>{children}</Provider>
//   );

//   // Return an object with the store and all of RTL's query functions
//   return {
//     store,
//     ...render(ui, { wrapper: Wrapper, ...renderOptions }),
//   };
// }

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
