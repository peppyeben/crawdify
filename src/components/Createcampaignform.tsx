"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";

const Createcampaignform = () => {
    const [campaignDate, setCampaignDate] = useState<string>("");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    const createCampaign = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };

    return (
        <form
            onSubmit={createCampaign}
            className="flex flex-row space-x-4 w-full h-full justify-between rounded-lg items-start p-4 glass-background"
        >
            <div className="flex flex-col space-y-4 w-1/2">
                <p className="relative">
                    <span className="text-xs absolute z-10 left-4 bg-transparent top-1 shadow-none text-white text-opacity-50">
                        Name of Campaign
                    </span>
                    <input
                        type="text"
                        placeholder="GreenFund: Sustain Earth
                    "
                        className="px-4 py-6 pb-3 outline-none border-none rounded-lg glass-background w-full"
                    />
                </p>
                <p className="relative">
                    <span className="text-xs absolute z-10 left-4 bg-transparent top-1 shadow-none text-white text-opacity-50">
                        Campaign Goal (ETH)
                    </span>
                    <input
                        type="number"
                        className="px-4 py-6 pb-3 outline-none border-none rounded-lg glass-background w-full"
                        placeholder="0.5"
                    />
                </p>
                <p className="relative">
                    <span className="text-xs absolute z-10 left-4 bg-transparent top-1 shadow-none text-white text-opacity-50">
                        Campaign End Date
                    </span>
                    <input
                        type="date"
                        value={campaignDate}
                        onChange={(e) => setCampaignDate(e.target.value)}
                        min={minDate}
                        className="px-4 py-6 pb-3 outline-none border-none rounded-lg glass-background w-full"
                    />
                </p>
                <button
                    type="submit"
                    className="rounded-lg px-5 py-3 font-bold custom-gradient"
                >
                    Create
                </button>
            </div>
            <p className="relative w-1/2">
                <span className="text-xs absolute z-10 left-4 bg-transparent top-1 shadow-none text-white text-opacity-50">
                    Campaign Description
                </span>

                <textarea
                    name=""
                    id=""
                    rows={10} // Set default rows, but we'll control the height with CSS
                    className="w-full flex-grow glass-background appearance-none resize-none outline-none border-none rounded-lg px-4 py-6 pb-3 max-h-96 overflow-hidden custom-textarea"
                    placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, eveniet!..."
                    style={{
                        overflowY: "hidden", // Hides the scrollbar
                        resize: "none", // Prevents resizing by user
                    }}
                ></textarea>
            </p>
        </form>
    );
};

export default Createcampaignform;
