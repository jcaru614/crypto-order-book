import { useState } from 'react';
import { sendTrade } from '../../api/api';
import { TradeType, OrderBookType } from '../../types';
import './styles.css';

type Props = {
  asset: string;
  setAsset: (val: string) => void;
  orderBook: OrderBookType;
  onTradePlaced: (trade: TradeType) => void;
  side: string;
  setSide: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
};

const OrderForm = ({
  asset,
  setAsset,
  orderBook,
  onTradePlaced,
  side,
  setSide,
  price,
  setPrice,
}: Props) => {
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('LIMIT');

  const notional = () => {
    // useMemo here so no recalcuation on each render
    if (type === 'LIMIT') return Number(quantity) * Number(price);
    const px = side === 'BUY' ? Number(orderBook.asks?.[0]?.[0]) : Number(orderBook.bids?.[0]?.[0]);
    return Number(quantity) * px;
  };

  const getMarketPrice = (): number => {
    if (type === 'MARKET') {
      return side === 'BUY' ? Number(orderBook.asks?.[0]?.[0]) : Number(orderBook.bids?.[0]?.[0]);
    }
    return 0;
  };

  const placeOrder = async () => {
    // handle !isNan for letters or empty values when placing order
    const finalPrice = type === 'LIMIT' ? Number(price) : getMarketPrice();
    if (Number(quantity) <= 0 || finalPrice <= 0) {
      alert('Quantity and price must be positive numbers.');
      return;
    }

    const order: TradeType = {
      asset,
      side: side as 'BUY' | 'SELL',
      quantity: Number(quantity),
      type: type as 'LIMIT' | 'MARKET',
      price: finalPrice,
      notional: notional(),
    };

    try {
      await sendTrade(order);
      onTradePlaced(order);
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error(error);
      alert('Something went wrong placing the order.');
    }
  };

  return (
    <div>
      <h1>Crypto Order Form</h1>
      {/* extract dropdowns as reusable components */}
      <div className='row'>
        <p>Asset</p>
        <select value={asset} onChange={(e) => setAsset(e.target.value)}>
          <option value='BTC'>BTC</option>
          <option value='ETH'>ETH</option>
        </select>
      </div>

      <div className='row'>
        <p>Side</p>
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value='BUY'>Buy</option>
          <option value='SELL'>Sell</option>
        </select>
      </div>

      <div className='row'>
        <p>Type</p>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value='LIMIT'>Limit</option>
          <option value='MARKET'>Market</option>
        </select>
      </div>

      <div className='row wrap'>
        <p>Quantity</p>
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>

      {type === 'LIMIT' && (
        <div className='row wrap'>
          <p>Price</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
      )}

      <div className='row'>
        <p>Notional Value</p>
        <p className='notional'>{`$${notional()}`}</p>
      </div>

      <button className='button' onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default OrderForm;
