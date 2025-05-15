import axios from 'axios';

export const getOrderbook = async (asset: string) => {
  try {
    const response = await axios.get(`/orderbook/${asset}`);
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const sendTrade = async (order: any) => {
  try {
    const response = await axios.post('/trade', order);
    return response;
  } catch (e) {
    console.error(e);
  }
};
