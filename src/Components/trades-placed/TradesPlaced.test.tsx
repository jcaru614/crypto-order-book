import { render, screen } from '@testing-library/react';
import TradesPlaced from './TradesPlaced';
import { TradeType } from '../../types';
import '@testing-library/jest-dom';

const mockTrades: TradeType[] = [
  {
    asset: 'BTC',
    side: 'BUY',
    quantity: 1,
    type: 'LIMIT',
    price: 30000,
    notional: 30000,
  },
  {
    asset: 'ETH',
    side: 'SELL',
    quantity: 2,
    type: 'MARKET',
    price: 2000,
    notional: 4000,
  },
];

describe('TradesPlaced', () => {
  it('renders all trades', () => {
    render(<TradesPlaced trades={mockTrades} />);
    expect(screen.getByTestId('trade-0')).toHaveTextContent('BUY 1 BTC @ 30000 (LIMIT)');
    expect(screen.getByTestId('trade-1')).toHaveTextContent('SELL 2 ETH @ 2000 (MARKET)');
  });
});
