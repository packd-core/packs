import addresses from "../../app/abi/addresses.json";
import {Address, useNetwork} from "wagmi";
import {useMemo} from "react";

type Contracts = keyof typeof addresses["31337"];
export default function usePackdAddresses(chainId?: number) {
    const {chain} = useNetwork();
    return useMemo(() => {
        return getAddressesByChainId(chainId ?? chain?.id ?? 0);
    }, [chain?.id, chainId]);
}

function getAddressesByChainId(chainId: number) {
    const id = chainId + '';
    if (addresses.hasOwnProperty(id)) {
        // @ts-ignore
        return addresses[id] as Record<Contracts, Address>;
    }
    return {} as Record<Contracts, Address>;
}

