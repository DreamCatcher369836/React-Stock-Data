import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

test('renders application heading', () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);
  const headingElement = screen.getByText(/Stock Market Application/i);
  expect(headingElement).toBeInTheDocument();
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  unmount();
});
