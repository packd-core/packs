import {Address} from "wagmi";
import {useErc721TokenUri} from "@/app/abi/generated";
import {useEffect, useState} from "react";

export type NftData = {
    description?: string,
    image?: string,
    name?: string,
}

export function useNftData({tokenId, address}: {tokenId: bigint, address:Address}) {
    //0x5b90d70e55c6c2e45d969bacf0335916df7a2009#readContract
    //tokenId: 5
    const {data, isLoading, isError} = useErc721TokenUri({address, chainId: 1, args: [tokenId]})
    const [nftData, setNftData] = useState<NftData>()

    useEffect(() => {
        if (data) {
            fetch(`/api/nftData?url=${data}`, {mode: 'no-cors'}).then((response) => {
                if (!response.ok) {
                    return;
                }
                response.json().then((json) => {
                    setNftData(json)
                })
            })
        }
    }, [data]);
    return {data, nftData, isLoading, isError};
}
