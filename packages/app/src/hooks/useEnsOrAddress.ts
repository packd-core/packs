import {Address, useEnsName} from "wagmi";
import formatAddress from "@/src/lib/addressFormatter";
import {useMemo} from "react";

export default function useEnsOrFormattedAddress(address?: Address, chainId?: number) {
    const { data } = useEnsName({address, chainId})
    return useMemo(() => {
        if (!address) {
            return undefined;
        }
        return data ?? formatAddress(address);
    }, [address, data]);
}
