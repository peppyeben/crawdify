"use client";

import Link from "next/link";
import Campaigncard from "./Campaigncard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoader } from "./Loadercontext";
import { useAccount, useReadContracts } from "wagmi";
import { abi } from "../app/utils/abi";

interface Campaign {
    id: string;
    title: string;
    description?: string;
    goal: string;
    end_date?: number;
    user_address?: string;
}

interface ContractResult {
    result: any[]; // or whatever type you expect for result
    // Add other properties if there are any
    error: any;
    status: any;
}

interface CombinedResult {
    goal: bigint; // Assuming projectGoal is of type bigint
    end_date: bigint; // Assuming endDate is of type bigint
    amountRaised: bigint; // Assuming projectAmountRaised is of type bigint
    title: string;
    description?: string;
    id: string; // The ID is a string after substring conversion
    creator: string;
}

const Exploresection = () => {
    const [campaigns, setExploreCampaigns] = useState<Campaign[]>([]);
    const { setIsLoading } = useLoader();
    const [contractAddresses, setContractAddresses] = useState<string[]>([]);
    const [exploreResults, setCombinedResults] = useState<CombinedResult[]>([]);
    const account = useAccount();

    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DB_URL as string}/store`,
                    {
                        params: {
                            data: {},
                        },
                    },
                );

                const mappedCampaigns =
                    response.data.campaigns.length > 0
                        ? response.data.campaigns.map((campaign: any) => ({
                              ...campaign,
                              id: campaign._id,
                              end_date:
                                  new Date(campaign.end_date).getTime() / 1000,
                              _id: undefined,
                          }))
                        : [];
                // console.log(mappedCampaigns);

                setExploreCampaigns(mappedCampaigns);
            } catch (error) {
                console.log(error);
                setExploreCampaigns([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    useEffect(() => {
        if (campaigns.length > 0) {
            const addresses = [
                ...new Set(
                    campaigns
                        .map((campaign) => campaign.user_address)
                        .filter((address) => address !== undefined),
                ),
            ];
            setContractAddresses(addresses);
        }
    }, [campaigns]);
    const getCampaignContracts = contractAddresses.map(
        (address) =>
            ({
                address: `0x${process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string}`,
                args: [address],
                abi,
            }) as const,
    );

    const { data: contractResults } = useReadContracts<ContractResult[]>({
        contracts: getCampaignContracts.map((contract) => ({
            ...contract,
            functionName: "getCampaigns",
        })),
    });

    useEffect(() => {
        if (contractResults) {
            const combinedResults: CombinedResult[] = [];
            const seenIds = new Set(); // To track unique IDs

            // console.log(contractResults.filter(i => i.status == "success"));
            const filteredContractResults = contractResults.filter(
                (i) => i.status == "success",
            );

            filteredContractResults.flatMap((contract: any) =>
                contract.result.map((result: any) => {
                    // Convert the id to string for comparison
                    const campaignId = result.projectDetailsHash.toString();

                    // Find the corresponding campaign based on the id
                    const campaign = campaigns.find(
                        (c) => c.id === String(campaignId).substring(2),
                    );

                    // If a matching campaign is found, return the combined data
                    if (campaign) {
                        const id = String(campaignId).substring(2);

                        // Check if the ID has already been seen
                        if (!seenIds.has(id)) {
                            // Mark this ID as seen
                            seenIds.add(id);

                            // Add the combined data to the results
                            combinedResults.push({
                                goal: result.projectGoal,
                                end_date: result.end_date,
                                amountRaised: result.projectAmountRaised,
                                title: campaign.title,
                                description: campaign.description,
                                id: id,
                                creator: result.creator,
                            });
                        }
                    }
                }),
            );

            setCombinedResults(combinedResults);
        }
    }, [contractResults]);

    return (
        <section className="flex flex-col justify-start items-start pt-4 space-y-2 w-full">
            <p className="text-xl font-bold">
                Make a Difference: Contribute to or Launch a Campaign
            </p>
            <p className="text-sm">
                Join a community of changemakers and fund projects that matter.
            </p>
            <section className="flex justify-between items-center w-full pt-6">
                <p className="rounded-3xl bg-white px-4 py-2 text-gray-900">
                    All
                </p>
                <p className="relative">
                    <input
                        type="text"
                        className="pl-9 pr-4 py-2 pb-3 outline-none border-none rounded-3xl glass-background"
                        placeholder="Search campaigns..."
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute top-[0.75rem] left-2 w-5 h-5"
                    >
                        <circle cx="10.5" cy="10.5" r="7" />
                        <line x1="21" y1="21" x2="15.8" y2="15.8" />
                    </svg>
                </p>
            </section>
            {exploreResults.length > 0 ? (
                <section className="grid grid-cols-3 gap-4 pt-4 xl:grid-cols-4">
                    {exploreResults.map((res) => (
                        <Campaigncard
                            title={res.title}
                            goal={String(res.goal)}
                            amountRaised={String(res.amountRaised)}
                            description={String(res.description)}
                            endDate={Number(res.end_date)}
                            creator={res.creator}
                            id={res.id}
                            key={res.id}
                        />
                    ))}
                </section>
            ) : (
                <section className="flex flex-col py-16 justify-center items-center w-full">
                    <p className="text-center font-bold text-xl">
                        Can't get campaigns at this time, connect wallet or
                        reload page.
                    </p>
                </section>
            )}{" "}
        </section>
    );
};

export default Exploresection;
