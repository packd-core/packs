import {Address, useEnsName} from "wagmi";
import formatAddress from "@/src/lib/addressFormatter";
import {useMemo} from "react";

export default function useEnsOrFormattedAddress(address?: Address, chainId?: number) {
    const { data } = useEnsName({address, chainId: chainId ?? 1})
    return useMemo(() => {
        if (!address) {
            return undefined;
        }
        return data ?? formatAddress(address);
    }, [address, data]);
}
