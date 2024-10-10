"use client"

import Link from "next/link";
import Campaigncard from "./Campaigncard";

const Exploresection = () => {
    return (
        <section className="flex flex-col justify-start items-start pt-4 space-y-2 w-full">
            <p className="text-xl font-bold">
                Make a Difference: Contribute to or Launch a Campaign
            </p>
            <p className="text-sm">
                Join a community of changemakers and fund projects that matter.
            </p>
            <section className="flex justify-between items-center w-full pt-6">
                <p className="rounded-3xl bg-white px-4 py-2 text-gray-900">All</p>
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="absolute top-[0.75rem] left-2 w-5 h-5"
                    >
                        <circle cx="10.5" cy="10.5" r="7" />
                        <line x1="21" y1="21" x2="15.8" y2="15.8" />
                    </svg>
                </p>
            </section>
            <section className="grid grid-cols-3 gap-4 pt-4 xl:grid-cols-4">
                {[0, 1, 2, 3, 4, 5].map((x) => (
                    <Campaigncard key={x}></Campaigncard>
                ))}
            </section>
        </section>
    );
};

export default Exploresection;
