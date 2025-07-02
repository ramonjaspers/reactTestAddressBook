import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './core/reducers';

test('Should render base app.tsx', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const heading = screen.getByText(/create your own address book/i);
  expect(heading).toBeTruthy();
});
