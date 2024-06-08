import type { TokenPrices } from "@/types";

const TokenPricesBlock = ({
    tokenPrices,
    error,
}: {
    tokenPrices: TokenPrices | null;
    error: string | null;
}) => {
    return (
        <>
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
        </>
    );
};

export default TokenPricesBlock;
