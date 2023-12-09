import {useEffect, useState} from "react";
import {Address, useContractRead} from "wagmi";
import {usePackMainAccountNonce} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export function useAccountNonce({
                                    address, block, enabled
                                }: {
    address: Address, block?: bigint, enabled?: boolean
}) {
    const [value, setValue] = useState(0n);
    const addresses = usePackdAddresses();
    const {data, isLoading, isError, refetch} = usePackMainAccountNonce({
        address: addresses.PackMain,
        args: [address],
        blockNumber: block,
        enabled
    })
    useEffect(() => {
        if (data && !isLoading && !isError) {
            setValue(data);
        }
    }, [data, isLoading, isError]);

    return {nonce: value, isLoading, isError, refetch};
}
