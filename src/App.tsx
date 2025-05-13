import { useEffect, useState } from 'react';
import { getOrderbook } from './api/api';
import { OrderBook, OrderForm, TradesPlaced } from './Components';
import { TradeType, OrderBookType } from './types';
import './App.css';

function App() {
  const [orderBook, setOrderBook] = useState<OrderBookType>({});
  const [asset, setAsset] = useState('BTC');
  const [trades, setTrades] = useState<TradeType[]>([]);
  const [side, setSide] = useState('BUY');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchOrderBook = async () => {
      // add try catch and handle an alert for error when fetching getOrderBook
      const res = await getOrderbook(asset);
      setOrderBook(res?.data || {});
    };

    fetchOrderBook();
  }, [asset]);

  const onOrderBookClick = (side: string, price: string) => {
    setSide(side);
    setPrice(price);
  };

  return (
    <div className='App'>
      <div className='components-container'>
        <OrderBook orderBook={orderBook} onOrderBookClick ={onOrderBookClick } />
        <OrderForm
          asset={asset}
          setAsset={setAsset}
          orderBook={orderBook}
          onTradePlaced={(trade: TradeType) => setTrades((prev) => [...prev, trade])}
          side={side}
          setSide={setSide}
          price={price}
          setPrice={setPrice}
        />
        <TradesPlaced trades={trades} />
      </div>
    </div>
  );
}

export default App;
