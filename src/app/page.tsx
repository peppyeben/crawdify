"use client";
import Footer from "src/components/Footer";
import TransactionWrapper from "src/components/TransactionWrapper";
import WalletWrapper from "src/components/WalletWrapper";
import { ONCHAINKIT_LINK } from "src/links";
import OnchainkitSvg from "src/svg/OnchainkitSvg";
import { useAccount } from "wagmi";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";
import Herohome from "src/components/Herohome";
import Heroexplore from "src/components/Heroexplore";

export default function Page() {
  const { address } = useAccount();

  return (
    <>
      <Herohome></Herohome>
      <Heroexplore></Heroexplore>
    </>
    // <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
    //   {/* <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
    //     <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
    //       <a
    //         href={ONCHAINKIT_LINK}
    //         title="onchainkit"
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         <OnchainkitSvg />
    //       </a>
    //       <div className="flex items-center gap-3">
    //         <SignupButton />
    //         {!address && <LoginButton />}
    //       </div>
    //     </div>
    //   </section> */}
    //   {/* <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">

    //     {address ? (
    //       <TransactionWrapper address={address} />
    //     ) : (
    //       <WalletWrapper
    //         className="w-[450px] max-w-full"
    //         text="Sign in to transact"
    //       />
    //     )}
    //   </section> */}
    //   <Footer />
    // </div>
  );
}
