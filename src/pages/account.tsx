import { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import type { TokenPrices } from "@/types";
import { fetchTokenPrices } from "@/services/priceService.service";

const Account: NextPage = () => {
    const [tokenPrices, setTokenPrices] = useState<TokenPrices | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTokenPrices = async () => {
            try {
                const prices = await fetchTokenPrices();
                setTokenPrices(prices);
            } catch (error) {
                setError("Failed to fetch token prices");
            }
        };

        getTokenPrices();
    }, []);

    return (
        <Layout>
            <div className="space-y-8 mt-10">
                <button className="w-full md:w-2/3 lg:w-1/2 mx-auto p-4 bg-primary text-white rounded-lg shadow-lg block hover:bg-secondary transition duration-300">
                    Connect Wallet
                </button>
                <div className="bg-accent p-6 rounded-lg shadow-lg">
                    <h2 className="text-primary text-2xl font-bold mb-4">
                        Send Transaction
                    </h2>
                    <input
                        type="text"
                        placeholder="Recipient address"
                        className="w-full p-4 rounded bg-background text-lightGray border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full p-4 rounded bg-background text-white border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                    />
                    <button className="w-full p-4 bg-orange text-white rounded-lg shadow-lg mt-4 hover:bg-secondary transition duration-300">
                        Send
                    </button>
                </div>
                <div className="bg-accent p-6 rounded-lg shadow-lg">
                    <h2 className="text-primary text-2xl font-bold mb-2">
                        Transaction Status
                    </h2>
                    <p className="text-lightGray">No transaction in progress</p>
                </div>
                <h2 className="text-primary text-2xl font-bold mb-4">
                    Token Prices
                </h2>
                {error && <p className="text-red-500">{error}</p>}
                {tokenPrices ? (
                    <ul className="grid grid-cols-2 gap-4 text-lightGray">
                        {Object.keys(tokenPrices).map((key) => (
                            <li
                                key={key}
                                className="bg-secondary p-4 rounded shadow-lg flex justify-between items-center text-white"
                            >
                                <span className="font-bold">
                                    {key.toUpperCase()}:
                                </span>
                                <span>
                                    ${tokenPrices[key as keyof TokenPrices].usd}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lightGray animate-pulse">Loading...</p>
                )}
            </div>
        </Layout>
    );
};

export default Account;
