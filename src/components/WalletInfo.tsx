import { useAccount } from "wagmi";

const WalletInfo = () => {
  const { address, isConnected, chain } = useAccount();

  if (!isConnected) return null;

  return (
    <div className="bg-background border border-primary text-lightGray p-4 mt-4 rounded shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-primary">Wallet Connected</p>
          <p className="text-sm">
            Address:{" "}
            <span className="text-white font-bold">{address}</span>
          </p>
          <p className="text-sm">
            Network:{" "}
            <span className="text-white font-bold">
              {chain?.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
