import { render, screen, fireEvent } from '@testing-library/react';
import OrderBook from './OrderBook';
import { OrderBookType } from '../../types';

describe('OrderBook', () => {
  const mockOrderBook: OrderBookType = {
    bids: [['10000.00', '0.5']],
    asks: [['10100.00', '0.25']],
  };

  const mockOnOrderBookClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onRowClick with SELL when BID row clicked', () => {
    render(<OrderBook orderBook={mockOrderBook} onOrderBookClick={mockOnOrderBookClick} />);
    fireEvent.click(screen.getByTestId('bid-0'));
    expect(mockOnOrderBookClick).toHaveBeenCalledWith('SELL', '10000.00');
  });

  it('calls onRowClick with BUY when ASK row clicked', () => {
    render(<OrderBook orderBook={mockOrderBook} onOrderBookClick={mockOnOrderBookClick} />);
    fireEvent.click(screen.getByTestId('ask-0'));
    expect(mockOnOrderBookClick).toHaveBeenCalledWith('BUY', '10100.00');
  });
});
