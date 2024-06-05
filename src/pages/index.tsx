import { NextPage } from "next";
import Layout from "../components/Layout";

const AddressLookup: NextPage = () => {
    return (
        <Layout>
            <div className="space-y-8">
                <div className="flex justify-center mt-10">
                    <input
                        type="text"
                        placeholder="Enter address"
                        className="w-full md:w-2/3 lg:w-1/2 p-4 rounded bg-accent text-lightGray border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="bg-accent p-6 rounded-lg shadow-lg">
                    <h2 className="text-primary text-2xl font-bold mb-2">
                        Current Balance
                    </h2>
                    <p className="text-lightGray">Balance: 0 ETH</p>
                </div>
                <div className="bg-accent p-6 rounded-lg shadow-lg">
                    <h2 className="text-primary text-2xl font-bold mb-2">
                        Recent Transactions
                    </h2>
                    <p className="text-lightGray">No recent transactions</p>
                </div>
            </div>
        </Layout>
    );
};

export default AddressLookup;
