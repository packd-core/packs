import {useEffect, useState} from "react";
import {Address, useContractRead} from "wagmi";
import {usePackMainAccountNonce} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export function useAccountNonce(address: Address, block?: bigint) {
    const [value, setValue] = useState(0);
    const addresses = usePackdAddresses();
    const {data, isLoading, isError, refetch} = usePackMainAccountNonce({
        address: addresses.PackAccount,
        args: [address],
        blockNumber: block,
    })
    useEffect(() => {
        if (data && !isLoading && !isError) {
            setValue(Number(data));
        }
    }, [data, isLoading, isError]);

    return {nonce: value, isLoading, isError, refetch};
}
