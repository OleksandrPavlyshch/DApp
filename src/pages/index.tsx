import { NextPage } from "next";
import { useState } from "react";
import { ethers } from "ethers";
import Layout from "../components/Layout";

const AddressLookup: NextPage = () => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAddressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAddress(event.target.value);
        setBalance(null);
        setError(null);
    };

    const isValidEthereumAddress = (address: string) => {
        return ethers.utils.isAddress(address);
    };

    const fetchBalance = async () => {
        if (!address) {
            setError("Address field cannot be empty");
            return;
        }

        if (!isValidEthereumAddress(address)) {
            setError("Invalid Ethereum address");
            return;
        }

        try {
            const provider = new ethers.providers.getDefaultProvider("sepolia");
            const balance = await provider.getBalance(address);
            setBalance(ethers.utils.formatEther(balance));
            setError(null); // Clear any previous error
        } catch (err) {
            setError("Failed to fetch balance");
        }
    };

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
                        onClick={fetchBalance}
                        className="ml-4 p-4 bg-primary text-lightGray rounded-lg shadow-lg hover:bg-secondary transition duration-300"
                    >
                        Check Balance
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
                        <p className="text-lightGray">{balance} ETH</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AddressLookup;
