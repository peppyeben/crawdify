"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Profile() {
    const account = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <>
            <section className="flex flex-row justify-start items-start w-full mx-auto px-6 pt-8 space-x-4">
                <section className="flex flex-col h-[24rem] justify-start py-4 space-y-4 items-center rounded-lg glass-background w-1/3">
                    <p className="font-medium">Your Balance</p>
                    <p className="flex flex-col justify-center items-center w-full space-y-2">
                        <span className="font-bold text-lg">0.00 ETH</span>
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
                        <img src="./img/search-image.png" alt="" className="w-[12rem]" />
                        <p className="text-center text-xs">
                            You have not created a campaign
                        </p>
                        <Link href={"/create"} className="rounded-xl w-full flex justify-center items-center px-5 py-2 font-bold custom-gradient">
                            Create new campaign
                        </Link>
                    </section>
                </section>
            </section>
        </>
    );
}

export default Profile;
