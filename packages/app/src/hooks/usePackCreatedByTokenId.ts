import {packMainABI, usePackNftCreationBlock} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {BrowserProvider, ethers, EventLog, JsonRpcProvider, JsonRpcSigner} from 'ethers';
import {useEthersSigner} from "./useEthersSigner";
import {Address, useContractRead} from "wagmi";
import {useEffect, useState} from "react";
import {Module} from "../stores/useMintStore";
import {JsonRpcApiPollingProvider} from "ethers/lib.commonjs/providers/provider-jsonrpc";
import {fetchPackCreatedByTokenId, RawCreationData} from "@/src/lib/fetchPackCreatedByTokenId";

// export async function findPackCreatedByTokenId(packMain: PackMain, tokenId: number) {
//     const filterByTokenId = packMain.filters.PackCreated(tokenId)
//     const events = await packMain.queryFilter(filterByTokenId);
//     const found = events.map(e => ({ transactionHash: e.transactionHash, blockNumber: e.blockNumber, tokenId: e.args[0], owner: e.args[1], modules: e.args[2] }))
// }


export async function encodeData(types: string[], values: any[]) {
    const coder = ethers.AbiCoder.defaultAbiCoder();
    return coder.encode(types, values);
}

export async function generateMintData(data: Array<[string, bigint]>) {
    return encodeData(["tuple(address,uint256)[]"], [data]);
}

// 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef ==> topic ERCTransfer
export function usePackCreatedByTokenId(tokenId: bigint | undefined) {
    const addresses = usePackdAddresses();
    const ethersSigner = useEthersSigner();
    const {data: creationBlock,isSuccess:isCreationBlockLoaded} = usePackNftCreationBlock({
        address: addresses.PackMain,
        args: [tokenId!],
        enabled: tokenId != undefined
    })

    const [data, setData] = useState<RawCreationData | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!ethersSigner || !addresses.PackMain || !isCreationBlockLoaded) {
            return;
        }
        setIsLoading(true)
        fetchPackCreatedByTokenId(tokenId, addresses.PackMain, addresses.PackRegistry, ethersSigner, creationBlock!).then(result => {
            setData(result);
        }).catch(e => {
            setIsError(true);
            setIsLoading(false)
        }).finally(() => setIsLoading(false));
    }, [tokenId, addresses, ethersSigner,creationBlock,isCreationBlockLoaded])

    return {data, isLoading, isError}


}


function formatAddress(address: string): any {
    return address.replace("000000000000000000000000", "")
}

