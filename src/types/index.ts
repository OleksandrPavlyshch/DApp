export interface TokenPrices {
  ethereum: { usd: number };
  tether: { usd: number };
  'usd-coin': { usd: number };
  dai: { usd: number };
  chainlink: { usd: number };
  uniswap: { usd: number };
}

export interface EtherscanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

export interface PriceResponse {
  [key: string]: {
    usd: number;
  };
}