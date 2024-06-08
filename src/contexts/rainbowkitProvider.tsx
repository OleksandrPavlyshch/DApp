import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { mainnet, sepolia, polygon, optimism, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID", // Obtain this from WalletConnect Cloud
    chains: [mainnet, polygon, optimism, arbitrum],
    ssr: true, // If your dApp uses server-side rendering
});

const RainbowKitProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider chains={config.chains}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiConfig>
    );
};

export default RainbowKitProviderWrapper;
