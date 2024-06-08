import axios from 'axios';
import type { TokenPrices } from '@/types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export async function fetchTokenPrices(ids: string, vs_currencies: string = 'usd') {
  try {
    const response = await axios.get<TokenPrices>(COINGECKO_API_URL, {
      params: {
        ids,
        vs_currencies,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw new Error('Could not fetch token prices');
  }
}
