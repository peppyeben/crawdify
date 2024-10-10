"use client";

import Createcampaignform from "src/components/Createcampaignform";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Create() {
    const account = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <>
            <section className="px-6 flex flex-col justify-start items-start space-y-6 w-full">
                <p className="text-4xl font-extrabold uppercase text-left">Create new campaign</p>
                <Createcampaignform></Createcampaignform>
            </section>
        </>
    );
}

export default Create;
