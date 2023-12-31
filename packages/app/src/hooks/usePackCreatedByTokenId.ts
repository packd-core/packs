import {packMainABI, usePackNftCreationBlock} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {BrowserProvider, ethers, EventLog, JsonRpcSigner} from 'ethers';
import {useEthersSigner} from "./useEthersSigner";
import {Address, useContractRead} from "wagmi";
import {useEffect, useState} from "react";
import {Module} from "../stores/useMintStore";

// export async function findPackCreatedByTokenId(packMain: PackMain, tokenId: number) {
//     const filterByTokenId = packMain.filters.PackCreated(tokenId)
//     const events = await packMain.queryFilter(filterByTokenId);
//     const found = events.map(e => ({ transactionHash: e.transactionHash, blockNumber: e.blockNumber, tokenId: e.args[0], owner: e.args[1], modules: e.args[2] }))
// }

export type RawCreationData = {
    // transfers: {
    //     address: string; from: any; to: any; amountOrTokenID: bigint;
    // }[];
    transactionHash?: string;
    blockNumber?: number;
    tokenId?: string;
    owner?: string;
    modules?: Address[];
    moduleData?: string[];
    decodedModuleData?: any[][];
    fullModuleData?: Module[];
    ethValue?: bigint;
}

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

export async function fetchPackCreatedByTokenId(tokenId: bigint | undefined, packMainAddress: Address, registryAddress: Address, ethersSigner: {
    signer: JsonRpcSigner,
    provider: BrowserProvider
}, creationBlock: bigint) {


    if (ethersSigner && ethersSigner.signer && tokenId !== undefined) {
        const {signer, provider} = ethersSigner;
        const packMain = new ethers.Contract(packMainAddress, packMainABI, signer);

        const filterByTokenId = packMain.filters.PackCreated(tokenId)
        const packCreatedEvents = await packMain.queryFilter(filterByTokenId, creationBlock, creationBlock);
        const transfers = []
        if (packCreatedEvents.length === 0) return undefined

        // Only one is expected to be present
        const packCreatedEvent: RawCreationData | undefined = await packCreatedEvents.map(async e => {
            const el = (e as EventLog)
            return {
                transactionHash: e.transactionHash, blockNumber: e.blockNumber,
                tokenId: el.args.getValue("tokenId") as string, owner: el.args.getValue("owner") as string, modules: el.args.getValue("modules") as Address[], moduleData: el.args.getValue("moduleData"),decodedModuleData: await Promise.all(el.args.getValue("moduleData").map(async (md: string) => await getOriginalData(md)))
            }
        })[0].catch(e => {
            return undefined
        })
        if (packCreatedEvent?.transactionHash) {
            const txReceipt = await provider.getTransaction(packCreatedEvent?.transactionHash);
            if (txReceipt) {
                packCreatedEvent.ethValue = txReceipt.value;
            }
        }



        // // With the creation event , get the rest of the events on the same transaction
        // const receipt = await provider.getTransactionReceipt(packCreatedEvent.transactionHash);
        //
        // if (receipt) {
        //     const packedContracts = [registryAddress, packMainAddress].map(address => address.toLowerCase())
        //     // Filter events from packd
        //     const logs = receipt?.logs.filter(e => !packedContracts.includes(e.address.toLowerCase())).filter(e => e.topics.length === 4)
        //     transfers.push(...logs?.map(e => ({address: e.address, from: formatAddress(e.topics[1]), to: formatAddress(e.topics[2]), amountOrTokenID: ethers.getBigInt(e.topics[3])})));
        // }

        // Returns
        const modules = packCreatedEvent?.modules;
        const moduleData = packCreatedEvent?.decodedModuleData;

        if (modules && moduleData && modules.length === moduleData.length) {
            packCreatedEvent.fullModuleData = modules.map((module: any, i: number) => {
                return {moduleAddress: module, address: moduleData[i][0], value: moduleData[i][1]} as Module
            });
        }


        return {...packCreatedEvent}
    }
    return undefined

}

function formatAddress(address: string): any {
    return address.replace("000000000000000000000000", "")
}

export async function decodeData(types: string[], data: string) {
    const coder = ethers.AbiCoder.defaultAbiCoder();
    return coder.decode(types, data);
}

export async function getOriginalData(data: string) {
    const res = await decodeData(["tuple(address,uint256)[]"], data);
    const items = res.map((item: any) => item[0])[0];
    return [items[0], items[1]];
}
