import type { EtherscanTransaction } from '@/types';
import { ethers } from 'ethers';

const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const etherscanApiUrl = `https://api-sepolia.etherscan.io/api`;

export async function getBalance(address: string): Promise<ethers.BigNumber> {
  const response = await fetch(`${etherscanApiUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${etherscanApiKey}`);
  const data = await response.json();
  if (data.status !== '1') {
    throw new Error(data.message);
  }
  return data.result;
}

export async function getRecentTransactions(address: string): Promise<EtherscanTransaction[]> {
  const response = await fetch(`${etherscanApiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`);
  const data = await response.json();
  if (data.status !== '1') {
    throw new Error(data.message);
  }
  return data.result.slice(0, 10);
}
