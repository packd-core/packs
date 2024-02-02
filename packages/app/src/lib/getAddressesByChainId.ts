import addresses from "@/app/abi/addresses.json";
import {Address} from "wagmi";

export type Contracts = keyof typeof addresses["31337"];

export function getAddressesByChainId(chainId: number) {
    const id = chainId + '';
    if (addresses.hasOwnProperty(id)) {
        // @ts-ignore
        return addresses[id] as Record<Contracts, Address>;
    }
    return {} as Record<Contracts, Address>;
}
