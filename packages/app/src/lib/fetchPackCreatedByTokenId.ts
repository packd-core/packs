import {ethers, EventLog, JsonRpcProvider, JsonRpcSigner} from "ethers";
import {JsonRpcApiPollingProvider} from "ethers/lib.commonjs/providers/provider-jsonrpc";
import {packMainABI} from "@/app/abi/generated";
import {Address} from "wagmi";
import {Module, OfflineModule} from "@/src/stores/useMintStore";

export async function fetchPackCreatedByTokenId(tokenId: bigint | undefined, packMainAddress: Address, registryAddress: Address, ethersSigner: {
    signer: JsonRpcSigner | JsonRpcProvider,
    provider: JsonRpcApiPollingProvider
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
    offlineModuleData?: OfflineModule[];
    ethValue?: bigint;
}

export async function getOriginalData(data: string) {
    const res = await decodeData(["tuple(address,uint256)[]"], data);
    const items = res.map((item: any) => item[0])[0];
    return [items[0], items[1]];
}


export async function decodeData(types: string[], data: string) {
    const coder = ethers.AbiCoder.defaultAbiCoder();
    return coder.decode(types, data);
}

