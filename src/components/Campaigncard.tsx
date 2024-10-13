"use client";

import { formatEther } from "ethers";
import Link from "next/link";
import { abi } from "src/app/utils/abi";

import { useAccount, useWriteContract, useReadContract } from "wagmi";

interface CampaignCardProps {
    title: string;
    goal: string;
    amountRaised: string;
    description: string;
    endDate: number;
    creator: string;
    id: string;
    // imageUrl: string;
}

const Campaigncard: React.FC<CampaignCardProps> = ({
    title,
    goal,
    amountRaised,
    description,
}) => {
    const account = useAccount();
    const { writeContractAsync } = useWriteContract();

    const donateToCampaign = async (address?: string, metadataHash?: string) => {
        console.log("CLICKED");
        

        // const result = await writeContractAsync({
        //     abi,
        //     address: `0x${
        //         process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string
        //     }`,
        //     account: account.address,
        //     functionName: "fundCampaign",
        //     args: [address],
        // });
    };

    const {data : creatorContracts} = useReadContract({
        abi,
        address: `0x${process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string}`,
        functionName: "getCampaigns",
        args: [`0x${String(address).substring(2)}`],
    });

    console.log(creatorContracts);

    return (
        <section className="flex flex-col rounded-lg justify-start space-y-3 max-w-96 items-start mx-auto p-3 glass-background">
            <img src="./img/planter.png" alt="" className="w-full" />

            {account.isConnected ? (
                <>
                    <p className="font-bold">{title}</p>
                    <div className="w-full bg-[#023430] rounded-full h-[0.35rem]">
                        <div
                            className="bg-[#bce26b] h-full rounded-full"
                            style={{
                                width: `${(Number(formatEther(amountRaised)) / Number(formatEther(goal))) * 100}%`,
                            }}
                        ></div>
                    </div>
                    <p className="font-bold text-left">
                        {formatEther(amountRaised)} ETH raised of{" "}
                        {formatEther(goal)} ETH
                    </p>
                    <input
                        type="number"
                        className="rounded-lg px-3 py-2 w-full appearance-none outline-none border-none glass-background"
                        placeholder="0.1"
                        min={0}
                    />
                    <button
                        onClick={() => donateToCampaign()}
                        className="rounded-lg w-full flex justify-center items-center px-5 py-2 font-bold custom-gradient"
                    >
                        Donate
                    </button>
                </>
            ) : (
                <div>
                    <p className="text-lg font-bold">Connect Wallet</p>
                </div>
            )}
        </section>
    );
};

export default Campaigncard;
