"use client";

import Createcampaignform from "src/components/Createcampaignform";
import { useModal } from "src/components/Modalcontext";
import axios from "axios";
import { parseUnits, isHexString, getBytes, toBeHex } from "ethers";
import { abi } from "../utils/abi";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { useLoader } from "src/components/Loadercontext";
import { parseContractError } from "../utils/errors";

function Create() {
    const account = useAccount();
    const { setIcon, setMessage, setIsShown } = useModal();
    const { writeContractAsync } = useWriteContract();
    const { setIsLoading } = useLoader();

    const convertToBigIntString = (value: any) => {
        const factor = 10 ** 18; // Scale for ether to wei conversion
        const bigintValue = BigInt(Math.floor(parseFloat(value) * factor));
        return bigintValue.toString(); // Return the bigint as a string
    };

    function hexToBytes(hexStr: any) {
        if (!hexStr.startsWith("0x")) {
            throw new Error("Invalid hex string");
        }

        return getBytes(hexStr);
    }

    function bytesToHex(bytes: any) {
        return toBeHex(bytes);
    }

    const handleSubmit = async (
        formData: {
            title: string;
            description: string;
            goal: string;
            endDate: number;
        },
        resetForm: () => void,
    ) => {
        if (!account.isConnected) {
            setIcon("no");
            setMessage("Please connect your Wallet");
            setIsShown(true);
            return;
        }

        if (parseFloat(formData.goal) < 0.0001) {
            formData.goal = "0.0001";
        }

        const goalInWei = convertToBigIntString(formData.goal);
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_DB_URL as string}/store`,
                {
                    data: {
                        ...formData,
                        end_date: formData.endDate * 1000,
                        user_address: account.address,
                    },
                },
            );
            // setExploreCampaigns(response.data);
            const metadataHash = `0x${response.data.result}`;

            const result = await writeContractAsync({
                abi,
                address: `0x${
                    process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string
                }`,
                account: account.address,
                functionName: "createCampaign",
                args: [
                    BigInt(formData.endDate),
                    BigInt(goalInWei),
                    `0x${response.data.result}`,
                ],
            });

            if (result) {
                setIsLoading(false);

                setIcon("yes");
                setMessage(
                    "Campaign creation successful. Proceed to profile page to view",
                );
                setIsShown(true);
                return;
            }
            resetForm();
        } catch (error: any) {
            console.log(error);

            setMessage(`ERROR: ${parseContractError(error)}`);
            setIcon("no");
            setIsShown(true);

            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="px-6 flex flex-col justify-start items-start space-y-6 w-full">
                <p className="text-4xl font-extrabold uppercase text-left">
                    Create new campaign
                </p>
                <Createcampaignform
                    onSubmit={handleSubmit}
                ></Createcampaignform>
            </section>
        </>
    );
}

export default Create;
