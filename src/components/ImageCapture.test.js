
import React from 'react';
import { render } from '@testing-library/react';
import ImageCapture from './ImageCapture';

test('renders ImageCapture component', () => {
  const { getByText } = render(<ImageCapture />);
  const linkElement = getByText(/Current Location/i);
  expect(linkElement).toBeInTheDocument();
});
