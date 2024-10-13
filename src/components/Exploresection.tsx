"use client";

import Link from "next/link";
import Campaigncard from "./Campaigncard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoader } from "./Loadercontext";
import { useReadContracts } from "wagmi";
import { abi } from "../app/utils/abi";

interface Campaign {
    id: string;
    data: {
        name: string;
        description?: string;
        goal: string;
        endDate?: number;
        userAddress?: string;
    };
}

interface ContractResult {
    result: any[]; // or whatever type you expect for result
    // Add other properties if there are any
    error: any;
    status: any;
}

interface CombinedResult {
    goal: bigint; // Assuming projectGoal is of type bigint
    endDate: bigint; // Assuming endDate is of type bigint
    amountRaised: bigint; // Assuming projectAmountRaised is of type bigint
    name: string;
    description?: string;
    id: string; // The ID is a string after substring conversion
    creator: string;
}

const Exploresection = () => {
    const [campaigns, setExploreCampaigns] = useState<Campaign[]>([]);
    const { setIsLoading } = useLoader();
    const [contractAddresses, setContractAddresses] = useState<string[]>([]);
    const [exploreResults, setCombinedResults] = useState<CombinedResult[]>([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_WEAVEDB_SERVER_URL as string,
                    {
                        params: {
                            data: {},
                            collection_name: process.env
                                .NEXT_PUBLIC_WEAVEDB_COLLECTION_NAME as string,
                        },
                    },
                );
                setExploreCampaigns(response.data.result);
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
                        .map((campaign) => campaign.data.userAddress)
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
            functionName: "getCampaigns", // Adding function name to each contract
        })),
    });

    useEffect(() => {
        if (contractResults) {
            const combinedResults: CombinedResult[] = [];
            const seenIds = new Set(); // To track unique IDs

            contractResults.flatMap((contract: any) =>
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
                                endDate: result.endDate,
                                amountRaised: result.projectAmountRaised,
                                name: campaign.data.name,
                                description: campaign.data.description,
                                id: id,
                                creator: result.creator,
                            });
                        }
                    }
                }),
            );

            console.log(combinedResults);

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
                            title={res.name}
                            goal={String(res.goal)}
                            amountRaised={String(res.amountRaised)}
                            description={String(res.description)}
                            endDate={Number(res.endDate)}
                            creator={res.creator}
                            id={res.id}
                            key={res.id}
                        />
                    ))}
                </section>
            ) : (
                <section className="flex flex-col py-16 justify-center items-center w-full">
                    <p className="text-center font-bold text-xl">
                        Can't get campaigns at this time, connect wallet or reload page.
                    </p>
                </section>
            )}{" "}
        </section>
    );
};

export default Exploresection;

// "use client";

// import Link from "next/link";
// import Campaigncard from "./Campaigncard";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useLoader } from "./Loadercontext";
// import { useWriteContract, useReadContract, useReadContracts } from "wagmi";
// import { abi } from "../app/utils/abi";

// interface Campaign {
//     id: string;
//     data: {
//         name: string;
//         description?: string;
//         goal: string;
//         endDate?: number;
//         userAddress?: string;
//     };
// }

// const Exploresection = () => {
//     const [campaigns, setExploreCampaigns] = useState<Campaign[]>([]);
//     const { setIsLoading } = useLoader();
//     const [contractResults, setContractResults] = useState<any[]>([]); // State to hold contract results

//     useEffect(() => {
//         const fetchCampaigns = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await axios.get(
//                     process.env.NEXT_PUBLIC_WEAVEDB_SERVER_URL as string,
//                     {
//                         params: {
//                             data: {},
//                             collection_name: process.env
//                                 .NEXT_PUBLIC_WEAVEDB_COLLECTION_NAME as string,
//                         },
//                     },
//                 );
//                 // console.log(response.data);
//                 setExploreCampaigns(response.data.result);
//             } catch (error) {
//                 console.log(error);
//                 setExploreCampaigns([]);
//             } finally {
//                 setIsLoading(false); // Always turn off loading
//             }
//         };

//         fetchCampaigns();
//     }, []);

//     useEffect(() => {
//         if (campaigns.length > 0) {
//             fetchFromContract(campaigns); // Call fetchFromContract when campaigns change
//         }
//     }, [campaigns]);

//     const fetchFromContract = (campaigns: Campaign[]) => {
//         if (campaigns.length > 0) {
//             const addresses = [
//                 ...new Set(
//                     campaigns.map((campaign) => campaign.data.userAddress),
//                 ),
//             ];

//             const contracts = addresses.map((address) => ({
//                 address: `0x${process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string}`,
//                 abi, // Use your ABI
//                 functionName: "getCampaigns",
//                 args: [address],
//             }));

//             // Set the contracts to state to trigger useReadContracts
//             setContractResults(contracts);
//             console.log(contractResults)
//         } else {
//             console.log("nonee");
//         }
//     };

//     const results = useReadContracts({
//         contracts: contractResults, // Pass the contracts from state
//     });

//     return (
//         <section className="flex flex-col justify-start items-start pt-4 space-y-2 w-full">
//             <p className="text-xl font-bold">
//                 Make a Difference: Contribute to or Launch a Campaign
//             </p>
//             <p className="text-sm">
//                 Join a community of changemakers and fund projects that matter.
//             </p>
//             <section className="flex justify-between items-center w-full pt-6">
//                 <p className="rounded-3xl bg-white px-4 py-2 text-gray-900">
//                     All
//                 </p>
//                 <p className="relative">
//                     <input
//                         type="text"
//                         className="pl-9 pr-4 py-2 pb-3 outline-none border-none rounded-3xl glass-background"
//                         placeholder="Search campaigns..."
//                     />
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="#9ca3af"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="absolute top-[0.75rem] left-2 w-5 h-5"
//                     >
//                         <circle cx="10.5" cy="10.5" r="7" />
//                         <line x1="21" y1="21" x2="15.8" y2="15.8" />
//                     </svg>
//                 </p>
//             </section>

//             {campaigns.length > 0 ? (
//                 <section className="grid grid-cols-3 gap-4 pt-4 xl:grid-cols-4">
//                     {campaigns.map((campaign) => (
//                         <Campaigncard
//                             title={campaign.data.name} // Access name from the data property
//                             goal={campaign.data.goal} // Access goal from the data property
//                             key={campaign.id} // Use the id for the key prop
//                         />
//                     ))}
//                 </section>
//             ) : (
//                 <section className="flex flex-col py-16 justify-center items-center w-full">
//                     <p className="text-center font-bold text-xl">
//                         Can't get campaigns at this time, reload page.
//                     </p>
//                 </section>
//             )}
//         </section>
//     );
// };

// export default Exploresection;
