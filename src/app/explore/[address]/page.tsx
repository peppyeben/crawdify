"use client";

import { background } from "@coinbase/onchainkit/theme";
import axios from "axios";
import { formatEther, parseEther, parseUnits } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { abi } from "src/app/utils/abi";
import { parseContractError } from "src/app/utils/errors";
import { useLoader } from "src/components/Loadercontext";
import { useModal } from "src/components/Modalcontext";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

interface CampaignMetadata {
    title: string;
    description: string;
}

const ExploreCampaign = ({ params }: { params: { address: string } }) => {
    const { address } = params;
    const account = useAccount();
    const { setIsShown, setIcon, setMessage } = useModal();
    const { setIsLoading } = useLoader();
    const { writeContractAsync } = useWriteContract();

    const [isValid, setIsValid] = useState(false);
    const [extractedAddress, setExtractedAddress] = useState("");
    const [extractedNumber, setExtractedNumber] = useState("");
    const [campaignMetadata, setCampaignMetadata] = useState<
        CampaignMetadata[] | []
    >([]);
    const [imageUrl, setImageUrl] = useState(1);

    const [donationAmount, setDonationAmount] = useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDonationAmount(event.target.value);
    };

    useEffect(() => {
        // Regular expression to match Ethereum address followed by a number
        const ethAddressWithNumberRegex = /^(0x[a-fA-F0-9]{40})(\d+)$/;

        const match = address.match(ethAddressWithNumberRegex);

        if (match) {
            const [, ethAddress, number] = match;
            setExtractedAddress(ethAddress);
            setExtractedNumber(number);
            setIsValid(true);
            console.log(`Valid address: ${ethAddress}, Number: ${number}`);
        } else {
            setIsValid(false);
            console.error(
                "Invalid format. Expected an Ethereum address followed by a number.",
            );
        }
    }, [address]);

    useEffect(() => {
        console.log(address);
        setImageUrl(Math.floor(Math.random() * 6) + 1);
    }, []);

    const donateToCampaign = async () => {
        if (!account.isConnected) {
            setMessage("Connect your wallet to donate");
            setIcon("no");
            setIsShown(true);
            return;
        }

        if (Number(donationAmount) <= 0) {
            setMessage("Amount must be greater than 0");
            setIcon("no");
            setIsShown(true);
            return;
        }
        setIsLoading(true);
        try {
            const result = await writeContractAsync({
                abi,
                address: `0x${
                    process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string
                }`,
                account: account.address,
                functionName: "fundCampaign",
                args: [
                    `0x${String(extractedAddress).substring(2)}`,
                    BigInt(extractedNumber),
                ],
                value: parseEther(donationAmount),
            });

            console.log(result);
            if (result) {
                setMessage(`Successfully donated to campaign`);
                setIcon("yes");
                setIsShown(true);
            }
            setDonationAmount("");

            await refetch();
            await fetchCampaignDetails();
            setIsLoading(false);
        } catch (error) {
            console.log(String(error));
            setMessage(`ERROR: ${parseContractError(error)}`);
            setIcon("no");
            setIsShown(true);
            setIsLoading(false);
        }
    };

    const {
        data: campaignData,
        isError,
        isLoading,
        refetch,
    } = useReadContract({
        abi,
        address: `0x${process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string}`,
        functionName: "getCampaign",
        account: account.address,
        args: [`0x${extractedAddress.substring(2)}`, BigInt(extractedNumber)],
    });

    const SCALE_FACTOR = 1000000n;

    const fetchCampaignDetails = async () => {
        if (campaignData) {
            const projectAmountRaised = parseUnits(
                campaignData.projectAmountRaised.toString(),
                "wei",
            );
            const projectGoal = parseUnits(
                campaignData.projectGoal.toString(),
                "wei",
            );

            const percentageRaised =
                (projectAmountRaised * SCALE_FACTOR) / projectGoal;
            console.log(Number(percentageRaised) / Number(SCALE_FACTOR));

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DB_URL as string}/store`,
                    {
                        params: {
                            data: {
                                id: campaignData.projectDetailsHash.substring(
                                    2,
                                ),
                            },
                        },
                    },
                );
                const { title, description } = response.data.campaigns[0];
                console.log(title);
                console.log(description);
                setCampaignMetadata([{ title, description }]);
            } catch (error) {
                setMessage(`ERROR: ${parseContractError(error)}`);
                setIcon("no");
                setIsShown(true);
            }
        }
    };

    useEffect(() => {
        if (campaignData) {
            console.log(campaignData);
            console.log(campaignData.projectDetailsHash.substring(2));

            fetchCampaignDetails();
        }
    }, [campaignData]);

    return (
        <section className="w-full flex flex-col space-y-3 justify-start items-start px-6 glass-background py-4 rounded-lg">
            {isValid ? (
                campaignData ? (
                    Number(campaignData?.dateCreated) > 0 &&
                    campaignMetadata.length > 0 ? (
                        <>
                            <p className="text-3xl font-extrabold">
                                {campaignMetadata[0].title}
                            </p>
                            <div
                                className="w-full max-h-[30rem] h-[30rem] bg-cover bg-center rounded-md"
                                style={{
                                    backgroundImage: `url('../static/${imageUrl}.jpeg')`,
                                }}
                            ></div>
                            <section className="p-5 glass-background rounded-md w-full">
                                {campaignMetadata[0].description}
                            </section>
                            <div className="w-full bg-[#023430] rounded-full h-[0.35rem]">
                                <div
                                    className="bg-[#bce26b] h-full rounded-full"
                                    style={{
                                        width: `${
                                            campaignData.projectAmountRaised.toString() !=
                                            "0n"
                                                ? `${
                                                      Number(
                                                          (parseUnits(
                                                              campaignData.projectAmountRaised.toString(),
                                                              "wei",
                                                          ) *
                                                              SCALE_FACTOR) /
                                                              parseUnits(
                                                                  campaignData.projectGoal.toString(),
                                                                  "wei",
                                                              ),
                                                      ) / Number(SCALE_FACTOR)
                                                  }%`
                                                : "0%"
                                        }`,
                                    }}
                                ></div>
                            </div>
                            <p className="font-bold text-left">
                                {formatEther(campaignData.projectAmountRaised)}{" "}
                                ETH
                                <span className="font-normal"> raised of </span>
                                <span className="font-bold">
                                    {formatEther(campaignData.projectGoal)} ETH
                                </span>
                            </p>
                            {campaignData.creator == account.address ? (
                                <>
                                    {campaignData.projectAmountRaised ==
                                    campaignData.projectGoal ? (
                                        <section className="flex space-x-5 justify-center items-center py-3">
                                            <button
                                                // onClick={() => donateToCampaign()}
                                                className="rounded-lg w-full flex justify-center items-center px-5 py-2 font-bold custom-gradient"
                                            >
                                                Claim funds from campaign
                                            </button>
                                        </section>
                                    ) : (
                                        <>
                                        <p className="text-lg">
                                            Campaign goal not reached yet
                                        </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <input
                                        type="number"
                                        className="rounded-lg px-3 py-2 w-full appearance-none outline-none border-none glass-background"
                                        placeholder="0.1"
                                        min={0}
                                        value={donationAmount}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        onClick={() => donateToCampaign()}
                                        className="rounded-lg w-full flex justify-center items-center px-5 py-2 font-bold custom-gradient"
                                    >
                                        Donate
                                    </button>{" "}
                                </>
                            )}
                        </>
                    ) : (
                        <div className="w-full">
                            <p className="font-bold text-lg text-center">
                                This page doesn't exist yet.
                            </p>
                        </div>
                    )
                ) : (
                    <div className="w-full">
                        <p className="font-bold text-lg text-center">
                            We can't find what you're looking for.
                        </p>
                    </div>
                )
            ) : (
                <div className="w-full">
                    <p className="font-bold text-lg text-center">
                        There's nothing here
                    </p>
                </div>
            )}
        </section>
    );
};

export default ExploreCampaign;
