import { OrderBookType } from '../../types';
import './styles.css';

type Props = {
  orderBook: OrderBookType;
  onOrderBookClick: (side: string, price: string) => void;
};

const OrderBook = ({ orderBook, onOrderBookClick }: Props) => {
  return (
    <div>
      <h1>Crypto Order Book</h1>
      <div className='container'>
        <div>
          <h2 className='bids-title'>Bids</h2>
          <div className='header'>
            <span>Price</span>
            <span>Qty</span>
          </div>
          {/* install react-window for lazy loading orderBook bids and asks */}
          <div className='list bids-bg'>
            {orderBook.bids?.map(([price, qty], i) => (
              <div
                key={i}
                data-testid={`bid-${i}`}
                onClick={() => onOrderBookClick('SELL', price)}
                className='order'
              >
                <span>
                  {Number(price).toFixed(2)}
                  <strong> | </strong>
                  {qty}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className='asks-title'>Asks</h2>
          <div className='header'>
            <span>Price</span>
            <span>Qty</span>
          </div>
          <div className='list asks-bg'>
            {orderBook.asks?.map(([price, qty], i) => (
              <div
                key={i}
                data-testid={`ask-${i}`}
                onClick={() => onOrderBookClick('BUY', price)}
                className='order'
              >
                <span>
                  {Number(price).toFixed(2)}
                  <strong> | </strong>
                  {qty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
