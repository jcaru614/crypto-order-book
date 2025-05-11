import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('./api/api', () => ({
  getOrderbook: jest.fn(() => Promise.resolve({ data: { bids: [], asks: [] } })),
  sendTrade: jest.fn(() => Promise.resolve({ data: {} })),
}));

test('renders Crypto Order Book header', () => {
  render(<App />);
  expect(screen.getByText(/Crypto Order Book/i)).toBeInTheDocument();
});
