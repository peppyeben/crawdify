"use client"

import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { Address, Name, Identity, Avatar } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";

export function ConnectButton() {
    return (
        <div className="flex justify-end ">
            <Wallet>
                <ConnectWallet className="rounded-lg px-5 py-2 font-bold custom-gradient">
                    <Avatar className="h-6 w-6" />
                    <Name />
                </ConnectWallet>
                <WalletDropdown>
                    all
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                        <Avatar />
                        <Name />
                        <Address className={color.foregroundMuted} />
                    </Identity>
                    <WalletDropdownDisconnect />
                </WalletDropdown>
            </Wallet>
        </div>
    );
}
