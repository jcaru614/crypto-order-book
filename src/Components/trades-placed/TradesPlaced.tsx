import { TradeType } from '../../types';
import './styles.css';

type Props = {
  trades: TradeType[];
};

const TradesPlaced = ({ trades }: Props) => {
  return (
    <div>
      <h1>Trades</h1>
      <div className='trades'>
        {trades?.map((trade, i) => (
          <div
            key={i}
            data-testid={`trade-${i}`}
            className={`trade ${trade.side === 'BUY' ? 'buy' : 'sell'}`}
          >
            <strong>{trade.side}</strong> {trade.quantity} {trade.asset} @ {trade.price}{' '}
            <em>({trade.type})</em>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesPlaced;
