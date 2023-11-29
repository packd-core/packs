import {Module} from "@/src/stores/useMintStore";
import {ContentCard} from "@/app/components/content/ContentCard";
import {BsX} from "react-icons/bs";
import {useErc721Name} from "@/app/abi/generated";
import {useNftData, useOpenSeaLink} from "@/src/hooks/useNftData";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {CgSpinner} from "react-icons/cg";
import {useNetwork} from "wagmi";
import {ExternalLink} from "@/app/components/links/ExternalLink";

export default function Erc721Card({onClick, module}: { onClick?: () => void, module: Module }) {
    const {data: tokenName} = useErc721Name({address: module.address});
    const {nftData, isLoading} = useNftData({address: module.address!, tokenId: module.value!})
    const openSeaLink = useOpenSeaLink({address: module.address!, tokenId: module.value!})
    // const {nftData, isLoading} = useNftData({tokenId: 5n, address: '0x5b90d70e55c6c2e45d969bacf0335916df7a2009', chainId: 1})
    return <ContentCard className="self-stretch">
        <div className='flex gap-2 relative'>
            {isLoading && <div className="absolute inset-0 bg-gray-800 bg-opacity-50 z-10 flex items-center justify-center"> <CgSpinner className='h-8 w-8 animate-spin'/></div>}
            <div className="w-20 h-20 flex justify-center items-center rounded-lg bg-back">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={nftData?.image} alt={nftData?.name} className='rounded-lg'/>
            </div>
            {!isLoading && <div className='flex flex-col items-start relative grow'>
                {onClick && <button className="hover:text-primary-500 right-0 top-0 absolute" onClick={onClick}><BsX/></button>}

                <div>
                    <div className="font-bold grow line-clamp-1 pr-4">
                        {tokenName} #{module.value?.toString()} - {nftData?.name}
                    </div>
                </div>
                <div>
                   <span className="text-card-title line-clamp-2 mt-2">Description:
                       <span className='font-normal'> {nftData?.description}</span>
                   </span>
                </div>
                <div>
                    <ExternalLink className='text-xs' href={openSeaLink}>View on Opensea</ExternalLink>
                </div>
            </div>}
        </div>
    </ContentCard>;
}

