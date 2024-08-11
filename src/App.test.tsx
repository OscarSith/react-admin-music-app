import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './components/Footer';

test('renders learn react footer', () => {
  render(<Footer />);
  const linkElement = screen.queryByText(/Pie/)?.innerHTML;
  expect(linkElement).toBe('Pie de página');
});
