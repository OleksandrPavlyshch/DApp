import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

export async function fetchTokenPrices() {
  const ids = 'ethereum,tether,usd-coin,dai,chainlink,uniswap';
  const vs_currencies = 'usd';

  try {
    const response = await axios.get(COINGECKO_API_URL, {
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
