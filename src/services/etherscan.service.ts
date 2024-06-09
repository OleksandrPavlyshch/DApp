import type { EtherscanTransaction } from '@/types';

const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const etherscanApiUrl = `https://api-sepolia.etherscan.io/api`;

/**
 * This function get wallet recent transactions
 * @param address wallet address
 * @returns recent transactions of the wallet
 */

export async function getRecentTransactions(address: string): Promise<EtherscanTransaction[]> {
  const response = await fetch(`${etherscanApiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`);
  const data = await response.json();
  if (data.status !== '1') {
    throw new Error(data.message);
  }
  if (!Array.isArray(data.result)) {
    return [];
  }
  return data.result.slice(0, 10);
}
