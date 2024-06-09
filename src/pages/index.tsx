import { NextPage } from "next";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Layout from "@/components/Layout";
import Balance from "@/components/Balance";
import TransactionTable from "@/components/TransactionTable";
import {
  getBalance,
  subscribeToNewTransactions,
  unsubscribeFromNewTransactions,
} from "@/services/infura.service";
import { getRecentTransactions } from "@/services/etherscan.service";
import { isValidEthAddress } from "@/utils/adress-validation";

const AddressLookup: NextPage = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddress(event.target.value);
    cleanState();
  };

  const cleanState = (): void => {
    setBalance(null);
    setTransactions([]);
    setError(null);
    unsubscribeFromNewTransactions();
  };

  const fetchBalanceAndTransactions = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!address) {
      setError("Address field cannot be empty");
      return;
    }

    if (!isValidEthAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }

    setLoading(true);

    try {
      const balance = await getBalance(address);
      setBalance(balance.toString());

      const txs = await getRecentTransactions(address);
      setTransactions((prev) => [...prev, ...txs].slice(0, 10));

      subscribeToNewTransactions(address, (tx) => {
        const formattedTx = {
          ...tx,
          timeStamp: Math.floor(Date.now() / 1000)
        };
        setTransactions((prev) => [formattedTx, ...prev].slice(0, 10));
      });

      setError(null);
    } catch (err) {
      setError("Failed to fetch balance or transactions");

    } finally {
      setLoading(false);
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
        <form onSubmit={fetchBalanceAndTransactions} className="flex justify-center mt-10">
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={handleAddressChange}
            className="w-full md:w-2/3 lg:w-1/2 p-4 rounded bg-accent text-lightGray border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            disabled={loading}
            className="min-w-[150px] ml-4 p-4 bg-primary text-white rounded-lg shadow-lg hover:bg-secondary transition duration-300"
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              "Check Address"
            )}
          </button>
        </form>
        {error && (
          <div className="bg-accent p-4 rounded text-red-500">
            {error}
          </div>
        )}
        <Balance balance={balance} />
        <TransactionTable transactions={transactions} />
      </div>
    </Layout>
  );
};

export default AddressLookup;
