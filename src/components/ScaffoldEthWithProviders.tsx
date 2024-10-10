"use client";

import { useEffect, useState } from "react";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { OnchainKitScaffoldProvider } from "./OnchainKitScaffoldProvider";
import { wagmiConfig } from "@/config/wagmi";
import { BlockieAvatar } from "./BlockieAvatar";

export const ScaffoldEthAppWithProviders = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const isDarkMode = true; // You might want to implement actual theme detection here
    const [mounted, setMounted] = useState(false);
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    avatar={BlockieAvatar}
                    theme={isDarkMode ? darkTheme() : lightTheme()}
                >
                    <OnchainKitScaffoldProvider>{children}</OnchainKitScaffoldProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

// "use client";

// import { useEffect, useState } from "react";
// import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
// // import { useTheme } from "next-themes";
// // import { Toaster } from "react-hot-toast";
// import { WagmiProvider } from "wagmi";
// // import { Footer } from "~~/components/Footer";
// // import { Header } from "~~/components/Header";
// // import { BlockieAvatar } from "~~/components/scaffold-eth";
// // import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
// // import { wagmiConfig } from "~~/services/web3/wagmiConfig";
// import { OnchainKitScaffoldProvider } from "./OnchainKitScaffoldProvider";
// import { wagmiConfig } from "@/config/wagmi";
// import { BlockieAvatar } from "./BlockieAvatar";

// const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
//     // useInitializeNativeCurrencyPrice();

//     return (
//         <>
//             <div className="flex flex-col min-h-screen">
//                 {/* <Header />
//         <main className="relative flex flex-col flex-1">{children}</main> */}
//                 {children}
//                 {/* <Footer /> */}
//             </div>
//             {/* <Toaster /> */}
//         </>
//     );
// };

// export const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             refetchOnWindowFocus: false,
//         },
//     },
// });

// export const ScaffoldEthAppWithProviders = ({
//     children,
// }: {
//     children: React.ReactNode;
// }) => {
//     // const { resolvedTheme } = useTheme();
//     // const isDarkMode = resolvedTheme === "dark";
//     const isDarkMode = true;
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     return (
//         <WagmiProvider config={wagmiConfig}>
//             <QueryClientProvider client={queryClient}>
//                 {mounted && (
//                     <RainbowKitProvider
//                         avatar={BlockieAvatar}
//                         theme={isDarkMode ? darkTheme() : lightTheme()}
//                     >
//                         {children}
//                     </RainbowKitProvider>
//                 )}

//                 {/* <ProgressBar height="3px" color="#2299dd" /> */}
//                 {/* <RainbowKitProvider
//                     avatar={BlockieAvatar}
//                     theme={
//                         mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()
//                         // mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()
//                     }
//                 >
//                     <OnchainKitScaffoldProvider>
//                         <ScaffoldEthApp>{children}</ScaffoldEthApp>
//                     </OnchainKitScaffoldProvider>
//                 </RainbowKitProvider> */}
//             </QueryClientProvider>
//         </WagmiProvider>
//     );
// };
