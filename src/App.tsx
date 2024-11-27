import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { Loader } from "./components/Loader";
import FooterPage from "./components/Footer";
import Header from "./components/Header";
import './i18n/config';
import './styles/Theme';
import './cusdown.less'
import { getAllWallets, SuiTestnetChain, SuiDevnetChain, WalletProvider, Chain, SuiMainnetChain } from '@suiet/wallet-kit'
import { ApolloProvider } from '@apollo/client';
import { client } from "./utils/api";
import { NotificationProvider, useNotification } from "@web3uikit/core";
import AuthWallet from "./components/AuthWallet";



function App() {
    const SupportedChains: Chain[] = [
        // ...DefaultChains,
        SuiDevnetChain,
        SuiTestnetChain,
        SuiMainnetChain
        // NOTE: you can add custom chain (network),
        // but make sure the connected wallet does support it
        // customChain,
    ]

    let element = useRoutes(routes);
    return (
        <>
            <ApolloProvider client={client}>
                <WalletProvider chains={SupportedChains}>
                    <NotificationProvider>
                        {/* <AuthWallet> */}
                            <Header />
                            <Loader element={element} />
                            <FooterPage />
                        {/* </AuthWallet> */}
                    </NotificationProvider>
                </WalletProvider>
            </ApolloProvider>
        </>
    )
}

export default App
