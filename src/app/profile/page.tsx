"use client";

import Link from "next/link";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi } from "../utils/abi";
import { useEffect, useState } from "react";
import WalletWrapper from "src/components/WalletWrapper";
import axios from "axios";
import { useModal } from "src/components/Modalcontext";
import { useLoader } from "src/components/Loadercontext";
import { parseContractError } from "../utils/errors";

interface ProfileData {
    noOfCampaignsFunded: bigint;
    noOfCampaignsCreated: bigint;
    totalAmountDonated: bigint;
    dateCreated: bigint;
    profileBalance: bigint;
    profileOwner: `0x${string}`;
    profileDetailsHash: `0x${string}`;
}

interface FormData {
    user_name: string;
    bio: string;
}

function Profile() {
    const account = useAccount();
    const { setIsShown, setMessage, setIcon } = useModal();
    const { setIsLoading } = useLoader();
    const { writeContractAsync } = useWriteContract();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [formData, setFormData] = useState<FormData>({
        user_name: "",
        bio: "",
    });

    const createProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usernamePattern = /^[A-Za-z]+$/;

        if (
            !usernamePattern.test(formData.user_name) ||
            formData.user_name.length < 5 ||
            formData.user_name.length > 15
        ) {
            setMessage(
                "Invalid username. Only letters allowed, and must be between 5 and 15 characters.",
            );
            setIcon("no");
            setIsShown(true);

            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_DB_URL as string}/profile`,
                {
                    data: {
                        ...formData,
                        user_address: account.address,
                    },
                },
            );
            const metadataHash = `0x${response.data.result}`;
            const result = await writeContractAsync({
                abi,
                address: `0x${
                    process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string
                }`,
                account: account.address,
                functionName: "createProfile",
                args: [`0x${response.data.result}`],
            });

            console.log(result);
            setMessage("Profile successfully created");
            setIcon("yes");
            setIsShown(true);
            setIsLoading(false);
            await refetch();
        } catch (error: any) {
            setMessage(`ERROR: ${parseContractError(error)}`);
            setIcon("no");
            setIsShown(true);

            setIsLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const {
        data: profileData,
        isError,
        isLoading,
        refetch,
    } = useReadContract({
        abi,
        address: `0x${process.env.NEXT_PUBLIC_CRAWDIFY_BASE_SEPOLIA as string}`,
        functionName: "getProfile",
        account: account.address,
    });

    useEffect(() => {
        if (account.isConnected && account.address) {
            refetch();
        }
    }, [account.isConnected, account.address, refetch]);

    useEffect(() => {
        if (profileData) {
            console.log(profileData);
            setProfile(profileData as ProfileData);
        }
    }, [profileData]);

    return (
        <>
            {account.isConnected ? (
                profile ? (
                    Number(profile.dateCreated) > 0 ? (
                        <section className="flex flex-row justify-start items-start w-full mx-auto px-6 pt-8 space-x-4">
                            <section className="flex flex-col h-[24rem] justify-start py-4 space-y-4 items-center rounded-lg glass-background w-1/3">
                                <p className="font-medium">Your Balance</p>
                                <p className="flex flex-col justify-center items-center w-full space-y-2">
                                    <span className="font-bold text-lg">
                                        {profile
                                            ? Number(profile.profileBalance) /
                                              1e18
                                            : "0.00"}{" "}
                                        ETH
                                    </span>
                                    <button className="rounded-lg flex justify-center items-center px-5 py-2 font-bold custom-gradient">
                                        Withdraw
                                    </button>
                                </p>
                            </section>
                            <section className="flex flex-col min-h-[24rem] justify-start space-y-3 px-4 items-center rounded-lg glass-background w-2/3 py-4">
                                <section className="flex flex-col justify-start items-center self-start">
                                    <p className="font-bold text-lg text-left self-start">
                                        Manage your Campaigns
                                    </p>
                                    <p className="text-sm text-left self-start">
                                        Monitor your campaign's progress here.
                                    </p>
                                </section>
                                <section className="flex flex-col justify-center items-center space-y-2">
                                    {profile &&
                                    Number(profile.noOfCampaignsCreated) > 0 ? (
                                        <p>
                                            You have created{" "}
                                            {profile.noOfCampaignsCreated.toString()}{" "}
                                            campaign(s)
                                        </p>
                                    ) : (
                                        <>
                                            <img
                                                src="./img/search-image.png"
                                                alt=""
                                                className="w-[12rem]"
                                            />
                                            <p className="text-center text-xs">
                                                You have not created a campaign
                                            </p>
                                        </>
                                    )}
                                    <Link
                                        href={"/create"}
                                        className="rounded-xl w-full flex justify-center items-center px-5 py-2 font-bold custom-gradient"
                                    >
                                        Create new campaign
                                    </Link>
                                </section>
                            </section>
                        </section>
                    ) : (
                        <section className="flex flex-row justify-start items-start w-full mx-auto rounded-lg px-4 py-4 space-x-4 glass-background">
                            <form
                                onSubmit={createProfile}
                                className="flex flex-col space-y-2 w-1/2 h-full justify-start rounded-lg items-start"
                            >
                                <p className="relative w-full">
                                    <span className="text-xs absolute z-10 left-4 bg-transparent top-1 shadow-none text-white text-opacity-50">
                                        Your Name
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Crawdify"
                                        className="px-4 py-6 pb-3 outline-none border-none rounded-lg glass-background w-full"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        name="user_name"
                                        minLength={5}
                                        maxLength={15}
                                        required
                                        autoComplete="off"
                                    />
                                </p>
                                <p className="relative w-full">
                                    <span className="text-xs absolute z-10 left-4 bg-transparent top-1 shadow-none text-white text-opacity-50">
                                        Bio
                                    </span>

                                    <textarea
                                        name="bio"
                                        rows={6} // Set default rows, but we'll control the height with CSS
                                        className="w-full flex-grow glass-background appearance-none resize-none outline-none border-none rounded-lg px-4 py-6 pb-3 max-h-96 overflow-hidden custom-textarea"
                                        placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, eveniet!..."
                                        style={{
                                            overflowY: "hidden", // Hides the scrollbar
                                            resize: "none", // Prevents resizing by user
                                        }}
                                        value={formData.bio}
                                        onChange={handleChange}
                                        minLength={15}
                                        maxLength={80}
                                        required
                                    ></textarea>
                                </p>
                                <button
                                    type="submit"
                                    className="rounded-lg px-5 py-3 font-bold custom-gradient"
                                >
                                    Create Profile
                                </button>
                            </form>
                            <section className="flex flex-col space-y-4 w-1/2 h-full justify-center rounded-lg items-center p-4">
                                <p className="text-lg font-bold pt-10">
                                    You don't have a profile yet
                                </p>
                            </section>
                        </section>
                    )
                ) : (
                    <div></div>
                )
            ) : (
                <section className="flex flex-col justify-center items-center space-y-5 py-16">
                    <p className="text-lg font-bold">
                        Please connect your wallet to view your profile
                    </p>
                    <WalletWrapper
                        withWalletAggregator={true}
                        text="Connect Wallet"
                        className="rounded-lg !text-white px-5 py-2 font-bold custom-gradient"
                    ></WalletWrapper>
                </section>
            )}
        </>
    );
}

export default Profile;
