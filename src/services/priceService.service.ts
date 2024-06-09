import type { TokenPrices } from '@/types';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/';

/**
 * Fetches token prices from Coingecko API
 * @param {string[]} ids - array of token ids
 * @param {string[]} vs_currencies array of currencies
 * @returns
 */
export async function fetchTokenPrices(tokensIds: string[], currencies: string[] = ['usd']) {
  const ids = tokensIds.join(',');
  const vs_currencies = currencies.join(',');
  try {
    const response = await fetch(`${COINGECKO_API_URL}simple/price?ids=${ids}&vs_currencies=${vs_currencies}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: TokenPrices = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw new Error('Could not fetch token prices');
  }
}
