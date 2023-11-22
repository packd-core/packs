import {Address} from "wagmi";
import {useErc721TokenUri} from "@/app/abi/generated";
import {useEffect, useState} from "react";

export type NftData = {
    description?: string,
    image?: string,
    name?: string,
}

export function useNftData({tokenId, address, chainId}: {tokenId: bigint, address:Address, chainId?: number}) {
    const {data, isLoading, isError} = useErc721TokenUri({address,args: [tokenId], chainId})
    const [nftData, setNftData] = useState<NftData>()
    const [isNftDataLoading, setIsNftDataLoading] = useState(false)
    useEffect(() => {
        if (data) {
            setIsNftDataLoading(true)
            fetch(`/api/nftData?url=${data}`, {mode: 'no-cors'}).then((response) => {
                if (!response.ok) {
                    return;
                }
                response.json().then((json) => {
                    setNftData(json)
                })
            }).finally(() => setIsNftDataLoading(false));
        }
    }, [data]);
    return {data, nftData, isLoading: isLoading || isNftDataLoading, isError: isError || (!isNftDataLoading && !isLoading && !nftData)}
}
