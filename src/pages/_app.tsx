import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { createClient } from "viem";
import {
    RainbowKitProvider,
    midnightTheme,
    connectorsForWallets,
    darkTheme,
} from "@rainbow-me/rainbowkit";
import {
    metaMaskWallet,
    ledgerWallet,
    rainbowWallet,
    walletConnectWallet,
    coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

coinbaseWallet.preference = "smartWalletOnly";

const connectors = connectorsForWallets(
    [
        {
            groupName: "Wallets Kit",
            wallets: [
                metaMaskWallet,
                ledgerWallet,
                rainbowWallet,
                walletConnectWallet,
                coinbaseWallet,
            ],
        },
    ],
    {
        appName: "RainbowKit App",
        projectId: "13fbf717359c664381cc39484d5ca6f2",
    }
);

const client = new QueryClient();

const config = createConfig({
    connectors,
    chains: [mainnet, sepolia],
    ssr: true,
    client({ chain }) {
        return createClient({ chain, transport: http() });
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: "#FF4D4D",
                        accentColorForeground: "white",
                        borderRadius: "small",
                        fontStack: "system",
                        overlayBlur: "small",
                    })}
                >
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default MyApp;
