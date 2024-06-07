import { ethers } from 'ethers';
import type { EtherscanTransaction } from '@/types';

const infuraWsUrl = `wss://sepolia.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`;
const rpcUrl = `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wsProvider = new ethers.providers.WebSocketProvider(infuraWsUrl);

export async function getBalance(address: string): Promise<ethers.BigNumber> {
  return provider.getBalance(address);
}

let subscription: any;

export function subscribeToNewTransactions(address: string, callback: (tx: EtherscanTransaction) => void): void {
  subscription = wsProvider.on('pending', async (txHash: string) => {
    try {
      const tx = await wsProvider.getTransaction(txHash);
      if (tx && (tx.from === address || tx.to === address)) {
        callback(tx as unknown as EtherscanTransaction);
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
    }
  });
}

export function unsubscribeFromNewTransactions(): void {
  if (subscription) {
    wsProvider.removeAllListeners();
    subscription = null;
  }
}
