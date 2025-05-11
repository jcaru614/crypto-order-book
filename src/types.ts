export type SideType = 'BUY' | 'SELL';
export type OrderType = 'LIMIT' | 'MARKET';

export type TradeType = {
  asset: string;
  side: SideType;
  quantity: number;
  type: OrderType;
  price: number;
  notional: number;
};

export type OrderBookEntryType = [string, string];

export type OrderBookType = {
  bids?: OrderBookEntryType[];
  asks?: OrderBookEntryType[];
};
