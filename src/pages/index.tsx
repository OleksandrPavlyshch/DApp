import { NextPage } from "next";
import { useState, useEffect } from "react";
import {
  getBalance,
  subscribeToNewTransactions,
  unsubscribeFromNewTransactions,
} from "@/services/infura.service";
import { getRecentTransactions } from "@/services/etherscan.service";
import Layout from "../components/Layout";
import { truncateAddress, formatDate, formatValue } from "@/utils/formatters";
import { isValidEthAddress } from "@/utils/adress-validation";
import LoadingSpinner from "@/components/LoadingSpinner";

const AddressLookup: NextPage = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(event.target.value);
    cleanState();
  };

  const cleanState = () => {
    setBalance(null);
    setTransactions([]);
    setError(null);
    unsubscribeFromNewTransactions();
  };

  const fetchBalanceAndTransactions = async () => {
    if (!address) {
      setError("Address field cannot be empty");
      return;
    }

    if (!isValidEthAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }

    setLoadingBalance(true);
    setLoadingTransactions(true);

    try {
      const balance = await getBalance(address);
      subscribeToNewTransactions(address, (tx) => {
        const formattedTx = {
          ...tx,
          timeStamp: Date.now(),
        };
        setTransactions((prev) => [formattedTx, ...prev].slice(0, 10));
      });
      setBalance(balance.toString());
      setLoadingBalance(false);

      const txs = await getRecentTransactions(address);
      setTransactions(txs);
      setLoadingTransactions(false);

      setError(null);
    } catch (err) {
      setError("Failed to fetch balance or transactions");
      setLoadingBalance(false);
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    return () => {
      cleanState();
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-center mt-10">
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={handleAddressChange}
            className="w-full md:w-2/3 lg:w-1/2 p-4 rounded bg-accent text-lightGray border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={fetchBalanceAndTransactions}
            disabled={loadingBalance || loadingTransactions}
            className="min-w-[150px] ml-4 p-4 bg-primary text-white rounded-lg shadow-lg hover:bg-secondary transition duration-300"
          >
            {loadingBalance || loadingTransactions ? (
              <LoadingSpinner />
            ) : (
              "Check Address"
            )}
          </button>
        </div>
        {error && (
          <div className="bg-accent p-4 rounded text-red-500">
            {error}
          </div>
        )}
        {balance !== null && (
          <div className="bg-accent p-6 rounded-lg shadow-lg">
            <h2 className="text-primary text-2xl font-bold mb-2">
              Current Balance
            </h2>
            <p>
              <span className="text-white">
                {formatValue(balance)}
              </span>

              <span className="font-bold ml-2">ETH</span>
            </p>
          </div>
        )}
        {transactions.length > 0 && (
          <div className="bg-accent p-6 rounded-lg shadow-lg">
            <h2 className="text-primary text-2xl font-bold mb-2">
              Recent Transactions
            </h2>
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
                  <tr
                    key={index}
                    className="border-t border-lightGray"
                  >
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
                    <td className="py-2">
                      {truncateAddress(tx.from)}
                    </td>
                    <td className="py-2">
                      {truncateAddress(tx.to)}
                    </td>
                    <td className="py-2 text-white">
                      {formatValue(tx.value)} ETH
                    </td>
                    <td className="py-2">
                      {formatDate(tx.timeStamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddressLookup;
