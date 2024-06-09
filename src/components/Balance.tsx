import React from "react";
import { truncateAddress, formatDate, formatValue } from "@/utils/formatters";

interface BalanceDisplayProps {
  balance: string | null;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return balance !== null ? (
    <div className="bg-accent p-6 rounded-lg shadow-lg">
      <h2 className="text-primary text-2xl font-bold mb-2">Current Balance</h2>
      <p>
        <span className="text-white">{formatValue(balance)}</span>
        <span className="font-bold ml-2">ETH</span>
      </p>
    </div>
  ) : null;
};

export default BalanceDisplay;
