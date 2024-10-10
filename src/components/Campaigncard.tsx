"use client"

import Link from "next/link";

const Campaigncard = () => {
    return (
        <section className="flex flex-col rounded-lg justify-start space-y-3 max-w-96 items-start mx-auto p-3 glass-background">
            <img src="./img/planter.png" alt="" className="w-full" />
            <p className="font-bold">GreenFund: Sustain Earth</p>
            <div className="w-full bg-[#023430] rounded-full h-[0.35rem]">
                <div className="bg-[#bce26b] h-full rounded-full w-1/2"></div>
            </div>
            <p className="font-bold text-left">1.34ETH raised of 2.5ETH</p>
            <input
                type="number"
                className="rounded-lg px-3 py-2 w-full appearance-none outline-none border-none glass-background"
                placeholder="0.1"
                min={0}
            />
            <button className="rounded-lg w-full flex justify-center items-center px-5 py-2 font-bold custom-gradient">
                Donate
            </button>
        </section>
    );
};

export default Campaigncard;
