import {Address, useEnsName} from "wagmi";
import formatAddress from "@/src/lib/addressFormatter";
import {useEffect, useMemo, useState} from "react";

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() });
export default function useEnsOrFormattedAddress(address?: Address) {
    const [ensName, setEnsName] = useState<string | null | undefined>(undefined);
    useEffect(() => {
        if (!address) {
            setEnsName(null);
            return;
        }
        client.getEnsName({
            address: address!,
        }).then(setEnsName);
    }, [address])

  return ensName
}
