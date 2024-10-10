"use client";

import { background } from "@coinbase/onchainkit/theme";
import { useRouter } from "next/router";

const ExploreCampaign = ({ params }: { params: { address: string } }) => {
    const { address } = params;

    return (
        <section className="w-full flex flex-col space-y-3 justify-start items-start px-6 glass-background py-4 rounded-lg">
            <p className="text-3xl font-extrabold">GreenFund: Sustain Earth</p>
            <div
                className="w-full max-h-[30rem] h-[30rem] bg-cover bg-center rounded-md"
                style={{ backgroundImage: "url('../img/planter.png')" }}
            ></div>
            <section className="p-5 glass-background rounded-md">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam totam
                cupiditate, harum consequatur doloribus ut rem inventore! Necessitatibus,
                adipisci obcaecati corporis dolorum placeat cupiditate quis sed.
                Voluptatem maiores architecto quis nihil eveniet animi tenetur doloribus
                similique nam eligendi expedita, et ipsam hic ex aperiam totam explicabo
                ad, commodi nemo, doloremque optio vero dolorem dignissimos. Fugit veniam
                inventore eos tempore aliquam unde. Excepturi repellendus voluptatum
                aspernatur magnam accusamus corrupti ad eaque eveniet ullam voluptas
                ratione iure, quidem obcaecati animi deleniti reprehenderit quod delectus
                officiis impedit possimus tenetur aliquid? Architecto libero, nisi
                suscipit voluptatibus repellendus necessitatibus nemo laboriosam commodi
                ea omnis quis?
            </section>
            <div className="w-full bg-[#023430] rounded-full h-[0.35rem]">
                <div className="bg-[#bce26b] h-full rounded-full w-1/2"></div>
            </div>
            <p className="font-bold text-left">
                {" "}
                1.34ETH <span className="font-normal">raised of </span>
                <span className="font-bold">2.5ETH</span>
            </p>
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

export default ExploreCampaign;
