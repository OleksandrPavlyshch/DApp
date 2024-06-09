// pages/account.tsx
import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import Layout from "../components/Layout";
import ConnectWallet from "../components/ConnectWallet";
import WalletInfo from "../components/WalletInfo";
import SendTransaction from "../components/SendTransaction";
import TokenPricesBlock from "../components/TokenPricesBlock";
import type { TokenPrices } from "@/types";
import { fetchTokenPrices } from "@/services/priceService.service";

interface AccountProps {
  initialTokenPrices: TokenPrices;
  error: string | null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialTokenPrices = await fetchTokenPrices(
      ["ethereum", "tether", "usd-coin", "dai", "chainlink", "uniswap"]
    );
    return {
      props: {
        initialTokenPrices,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        initialTokenPrices: null,
        error: "Failed to fetch token prices",
      },
    };
  }
};

const Account: NextPage<AccountProps> = ({ initialTokenPrices, error }) => {
  const [tokenPrices, setTokenPrices] = useState<TokenPrices | null>(
    initialTokenPrices
  );
  const [transactionStatus, setTransactionStatus] = useState<string | null>(
    null
  );

  return (
    <Layout>
      <div className="space-y-8 mt-10">
        <ConnectWallet />
        <WalletInfo />
        <SendTransaction />
        <TokenPricesBlock tokenPrices={tokenPrices} error={error} />
      </div>
    </Layout>
  );
};

export default Account;
