"use client";

import Link from "next/link";
import Exploresection from "src/components/Exploresection";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function Explore() {
    const account = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();

    return (
        <>
            <section className="flex flex-col justify-start items-start w-full mx-auto px-6 pt-8 space-y-4">
                <section className="flex flex-col justify-start items-start space-y-5 pb-6 w-2/3">
                    <h4 className="uppercase font-extrabold text-5xl">
                        Your dreams funded by the community.
                    </h4>
                    <p className="">
                        Join forces to bring your dreams to life. Discover inspiring
                        projects, connect with like-minded individuals, and make a
                        tangible difference in the world.
                    </p>
                    <Link href={"/create"}>
                        <button
                            type="button"
                            className="rounded-lg flex space-x-2 px-5 justify-center items-center py-3 font-bold custom-gradient"
                        >
                            <span>Create a Campaign</span>
                            <img
                                src="./img/right-arrow-icon.png"
                                alt=""
                                className="w-5"
                            />
                        </button>
                    </Link>
                </section>
                <div className="w-full bg-white p-[0.01rem]"></div>
                <Exploresection></Exploresection>
            </section>
        </>
    );
}

export default Explore;
