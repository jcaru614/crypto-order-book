import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from './OrderForm';
import { OrderBookType } from '../../types';
import '@testing-library/jest-dom';

jest.mock('../../api/api', () => ({
  sendTrade: jest.fn(() => Promise.resolve({ data: {} })),
}));

const mockOrderBook: OrderBookType = {
  bids: [['29000', '1']],
  asks: [['31000', '1']],
};

describe('OrderForm', () => {
  it('shows alert when submitting with empty quantity', () => {
    const mockOnTradePlaced = jest.fn();
    const mockSetAsset = jest.fn();
    window.alert = jest.fn();
    const mockSetSide = jest.fn();
    const mockSetPrice = jest.fn();
    
    render(
      <OrderForm
        asset='BTC'
        setAsset={mockSetAsset}
        orderBook={mockOrderBook}
        onTradePlaced={mockOnTradePlaced}
        side='BUY'
        setSide={mockSetSide}
        price=''
        setPrice={mockSetPrice}
      />
    );

    fireEvent.click(screen.getByText('Place Order'));

    expect(window.alert).toHaveBeenCalledWith('Quantity and price must be positive numbers.');
    expect(mockOnTradePlaced).not.toHaveBeenCalled();
  });
});
