// Skeleton for API calls

import axios from 'axios';

// Orderbook API
export const getOrderbook = async (asset: string) => {
  try {
    const response = await axios.get(`/orderbook/${asset}`);
    return response;
  } catch (e) {
    console.error(e);
  }
};

// Trade API
export const sendTrade = async (order: any) => {
  try {
    const response = await axios.post('/trade', order);
    return response;
  } catch (e) {
    console.error(e);
  }
};
