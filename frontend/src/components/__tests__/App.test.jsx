// src/App.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../App';
import '@testing-library/jest-dom/extend-expect';

/**
 * @jest-environment jsdom
 */

test('renders Welcome component for the root route', () => {
  render(
    <App />
  );

  expect(screen.getByText('Welcome to Baymax')).toBeInTheDocument();
  expect(screen.getByText('Monitor and manage your devices seamlessly.')).toBeInTheDocument();
  expect(screen.getByText('User Page')).toBeInTheDocument();
  expect(screen.getByText('Camera Page')).toBeInTheDocument();
  expect(screen.getByText('History')).toBeInTheDocument();
  expect(screen.getByText('Record')).toBeInTheDocument();
  expect(screen.getByText('Histories')).toBeInTheDocument();
});
