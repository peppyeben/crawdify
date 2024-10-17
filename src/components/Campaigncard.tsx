"use client";

import { formatEther } from "ethers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { abi } from "src/app/utils/abi";

import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { useModal } from "./Modalcontext";
import { parseContractError } from "src/app/utils/errors";

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
    creator,
    id,
}) => {
    const { setIsShown, setIcon, setMessage } = useModal();
    const account = useAccount();
    const { writeContractAsync } = useWriteContract();
    const [creatorContracts, setCreatorContracts] = useState<any>(null);
    const [idFromContract, setIdFromContract] = useState<bigint | null>(null);
    const [donationAmount, setDonationAmount] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDonationAmount(event.target.value);
    };

    const donateToCampaign = async (creator?: string) => {
        console.log("CLICKED");
        if (idFromContract == null) {
            console.log("NULL");
            return;
        }

        if (Number(donationAmount) <= 0) {
            setMessage("Amount must be greater than 0");
            setIcon("no");
            setIsShown(true);
            return;
        }

        try {
            const result = await writeContractAsync({
                abi,
                address: `0x${
                    process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string
                }`,
                account: account.address,
                functionName: "fundCampaign",
                args: [`0x${String(creator).substring(2)}`, idFromContract],
                value: BigInt(donationAmount),
            });

            console.log(result);
            if (result) {
                setMessage(`Successfully donated to campaign`);
                setIcon("yes");
                setIsShown(true);
            }
        } catch (error) {
            console.log(String(error));
            setMessage(`ERROR: ${parseContractError(error)}`);
            setIcon("no");
            setIsShown(true);
        }
    };

    const { data } = useReadContract({
        abi,
        address: `0x${process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string}`,
        functionName: "getCampaigns",
        args: [`0x${String(creator).substring(2)}`],
    });

    useEffect(() => {
        if (data) {
            setCreatorContracts(data);
            console.log("Creator Contracts: ", data);
            const campaign = data.filter(
                (x) => x.projectDetailsHash == `0x${id}`,
            );
            setIdFromContract(campaign[0].id);
        }
    }, [data]);

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
                        value={donationAmount}
                        onChange={handleInputChange}
                    />
                    <button
                        onClick={() => donateToCampaign(creator)}
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
