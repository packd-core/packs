import {decodeUrl} from "@/src/lib/encodeUrl";
import {JsonRpcProvider} from "ethers";
import {getRpcUrl} from "@/pages/api/claim";
import {getAddressesByChainId} from "@/src/hooks/usePackdAddresses";
import {PackMain__factory, PackNFT__factory} from "@/app/abi/types/factories/contracts";
import {fetchPackCreatedByTokenId} from "@/src/lib/fetchPackCreatedByTokenId";
import {Module, OfflineModule} from "@/src/stores/useMintStore";

export type FullPackDetail = Awaited<ReturnType<typeof fetchFullPackDetail>>;
export async function fetchFullPackDetail({key}:{key: string}) {
    try {
        const {tokenId, version, chainId, privateKey} = decodeUrl(key);
        const provider = new JsonRpcProvider(getRpcUrl({chainId}));
        const addresses = getAddressesByChainId(chainId);
        const mainAddress = addresses.PackMain;
        const packd = PackMain__factory.connect(mainAddress, provider)
        const packdNft = PackNFT__factory.connect(mainAddress, provider)
        const stateBlock = await packd.packState(tokenId)
        const creationBlock = await packdNft.creationBlock(tokenId)
        const content = await fetchPackCreatedByTokenId(BigInt(tokenId), addresses.PackMain, addresses.PackRegistry, {
            signer: provider,
            provider: provider
        }, creationBlock!)
        // content.offlineModuleData = await Promise.all(content?.fullModuleData?.map(async (m: Module) => { return {...m} satisfies OfflineModule}) ?? [])
        return {tokenId, version, chainId, privateKey, stateBlock, content};

    } catch (e) {
        console.error(e)
        return null;
    }
}
