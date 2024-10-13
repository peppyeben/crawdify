"use client";
import Footer from "src/components/Footer";
import TransactionWrapper from "src/components/TransactionWrapper";
import WalletWrapper from "src/components/WalletWrapper";
import { ONCHAINKIT_LINK } from "src/links";
import OnchainkitSvg from "src/svg/OnchainkitSvg";
import { useAccount } from "wagmi";
import Herohome from "src/components/Herohome";
import Heroexplore from "src/components/Heroexplore";

export default function Page() {
  const { address } = useAccount();

  return (
    <>
      <Herohome></Herohome>
      <Heroexplore></Heroexplore>
    </>
    
  );
}
