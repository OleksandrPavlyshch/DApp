import React from "react";
import { truncateAddress, formatDate, formatValue } from "@/utils/formatters";
import { EtherscanTransaction } from "@/types";

interface TransactionsTableProps {
  transactions: EtherscanTransaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  return transactions.length > 0 ? (
    <div className="bg-accent p-6 rounded-lg shadow-lg">
      <h2 className="text-primary text-2xl font-bold mb-2">Recent Transactions</h2>
      <table className="w-full text-left text-lightGray">
        <thead>
          <tr>
            <th className="py-2">Transaction Hash</th>
            <th className="py-2">From</th>
            <th className="py-2">To</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index} className="border-t border-lightGray">
              <td className="py-2">
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {truncateAddress(tx.hash)}
                </a>
              </td>
              <td className="py-2">{truncateAddress(tx.from)}</td>
              <td className="py-2">{truncateAddress(tx.to)}</td>
              <td className="py-2 text-white">{formatValue(tx.value)} ETH</td>
              <td className="py-2">{formatDate(tx.timeStamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default TransactionsTable;
