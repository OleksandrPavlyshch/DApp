import { useState } from "react";
import { useSendTransaction, useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

const SendTransaction = () => {
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction, data: txData, error: txError, isPending } = useSendTransaction();
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash: txData,
  });
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ethers.utils.isAddress(recipient)) {
      setErrorMessage("Invalid Ethereum address");
      return;
    }

    const amountInWei = parseEther(amount);

    if (balance && ethers.BigNumber.from(balance.value).lt(amountInWei)) {
      setErrorMessage("Insufficient funds");
      return;
    }

    try {
      sendTransaction({
        to: recipient as `0x${string}`,
        value: parseEther(amount) as unknown as bigint,
      });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Transaction failed");
    }
  };

  return (
    <div className="bg-accent p-6 rounded-lg shadow-lg">
      <h2 className="text-primary text-2xl font-bold mb-4">
        Send Transaction
      </h2>
      <form onSubmit={handleSendTransaction}>
        <input
          type="text"
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-4 rounded bg-background text-lightGray border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary mt-2"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 rounded bg-background text-white border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary mt-2"
          required
        />
        <button
          type="submit"
          disabled={!isConnected || isPending}
          className="w-full p-4 bg-orange text-white rounded-lg shadow-lg mt-4 hover:bg-secondary transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </form>
      {txData && <p className="text-lightGray mt-2">Transaction Hash: {txData}</p>}
      {isWaiting && <p className="text-lightGray mt-2">Waiting for confirmation...</p>}
      {isSuccess && <p className="text-lightGray mt-2">Transaction confirmed!</p>}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {txError && <p className="text-red-500 mt-2">{txError.message}</p>}
    </div>
  );
};

export default SendTransaction;
