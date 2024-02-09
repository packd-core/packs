import { useNetwork} from "wagmi";
import {useMemo} from "react";
import {getAddressesByChainId} from "@/src/lib/getAddressesByChainId";

export default function usePackdAddresses(chainId?: number) {
    const {chain} = useNetwork();
    return useMemo(() => {
        return getAddressesByChainId(chainId ?? chain?.id ?? 0);
    }, [chain?.id, chainId]);
}

