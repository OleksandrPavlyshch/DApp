import { ethers } from "ethers";


const apiKey = process.env.NEXT_PUBLIC_VC_API_KEY;
const apiUrl = `https://sepolia.ethereum.validationcloud.io/v1/${apiKey}`;

export function callEthMethod(method: string, params: any[]): Promise<any> {

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: method,
      params: params,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error.message);
      }
      return data.result;
    })
    .catch(error => {
      console.error(`Error calling ${method}:`, error);
      throw error;
    });
}
export async function getRecentTransactions(address: string): Promise<any[]> {
  // const provider = new JsonRpcProvider(apiUrl);
  const provider = new ethers.JsonRpcApiProvider(apiUrl);
  // const history = await provider.getHistory(address);

  return history.slice(0, 10).map(tx => ({
    hash: tx.hash,
    from: tx.from,
    to: tx.to,
    value: ethers.utils.formatEther(tx.value),
    timestamp: tx.timestamp
  }));
}