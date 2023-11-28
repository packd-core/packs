import {Address, useAccount} from "wagmi";
import {useCallback, useMemo, useState} from "react";
import Modal from "@/app/components/dialog/Modal";
import {BsSearch, BsX} from "react-icons/bs";
import {isAddress} from "viem";
import clsxm from "@/src/lib/clsxm";
import {useErc721Name, useErc721OwnerOf} from "@/app/abi/generated";
import {NftListItem, useNftsOfAddress} from "@/src/hooks/useNftsOfAddress";
import {AiOutlineLoading3Quarters} from "react-icons/ai";


export default function AddNftModal({isOpen, setIsOpen, onAdd}: {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    onAdd: (address: Address, tokenId: bigint) => void
}) {
    const [nftAddress, setNftAddress] = useState<Address>();
    const [tokenId, setTokenId] = useState<bigint>()
    const {address} = useAccount();
    const {data: nftOwner, isLoading: isOwnerLoading} = useErc721OwnerOf({
        address: nftAddress,
        args: [tokenId ?? BigInt(-1)]
    })



    const hasToken = useMemo(() => address == nftOwner, [address, nftOwner]);
    const {data: tokenName} = useErc721Name({address: nftAddress});

    const {nftList: unfilteredNftList, isLoading} = useNftsOfAddress();
    const [filter, setFilter] = useState('');

    const nftList = useMemo(() => {
        return unfilteredNftList?.filter((nft) => Object.values(nft).some((val) => typeof val === 'string' && val.toLowerCase().includes(filter?.toLowerCase() ?? '')))
    }, [filter, unfilteredNftList]);

    const [isManual, setIsManual] = useState(false);

    const add = useCallback(() => {
        if (!nftAddress || (tokenId ?? -1) < 0 || !hasToken) return;
        setIsOpen(false);
        onAdd(nftAddress, tokenId!);
    }, [setIsOpen, onAdd, nftAddress, tokenId, hasToken]);
    return (
        <Modal panelClassNames='max-w-md md:max-w-lg'
        render={closeModal =>
            <div className='flex flex-col bg-[#202020] rounded-3xl gap-2 text-white p-4'>
                <div className="flex justify-between">
                    <span className='text-card-title'>Select NFT</span>
                    <button className="hover:text-primary-500 pl-2" onClick={closeModal}><BsX/></button>
                </div>
                <div className="border-gray-500 border-b-[1px]">{''}</div>

                <div className="flex flex-col gap-2">
                    {!isManual &&
                        <>
                            <div className="relative">
                                <input className=' w-full pl-8 text-xs py-2'
                                       placeholder={"Search name or paste address"}
                                       onChange={(e) => {
                                           const value = e.target.value;
                                           setFilter(value)
                                       }}/>
                                <BsSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'/>

                            </div>
                            <div className="border-gray-500 border-b-[1px]">{''}</div>
                        </>

                        }
                    {isManual && <>
                        <div className="flex justify-between">
                            <span className='text-card-title'>NFT address</span>
                            {/*{nftAddress && <span className='text-card-title'>Available: {hasToken ? 'yes' : 'no'}</span>}*/}
                        </div>
                        <div className="relative">
                            {tokenName &&
                                <div
                                    className="absolute left-0 top-0 bottom-0 flex items-center pl-2 text-xs font-bold">
                                    {tokenName}
                                </div>}
                            <input className='text-right w-full pl-12 text-xs py-2' onChange={(e) => {
                                const value = e.target.value;
                                if (isAddress(value)) {
                                    setNftAddress(value as Address);
                                } else {
                                    setNftAddress(undefined)
                                }
                            }}/>
                        </div>
                        <div className="flex justify-between">

                            <span className='text-card-title'>TokenID</span>
                            {!isOwnerLoading && !!nftAddress && (tokenId !== undefined) && <span
                                className={clsxm(!hasToken && 'text-red-500', 'text-xs font-semibold')}>Available: {hasToken ? 'yes' : 'You don\'t own this token'}</span>}
                        </div>
                        <input className={clsxm('text-right', ((tokenId ?? -1) < 0 || !hasToken) && 'text-red-500')}
                               onChange={(e) => {
                                   const value = e.target.value;
                                   if (!isNaN(Number(value))) {
                                       setTokenId(BigInt(value));
                                   } else {
                                       setTokenId(BigInt(-1));
                                   }
                               }}/>
                    </>}
                    {isLoading && <div className="flex flex-col gap-2 h-72 overflow-y-auto">
                        <div className="flex justify-center  items-center h-full">
                            <AiOutlineLoading3Quarters className='animate-spin h-8'/>
                        </div>
                    </div>}

                    {
                       !isLoading && <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 h-96 overflow-y-auto">

                            {

                                nftList?.map((nft, ind) => {
                                    return <NftSearchItem key={ind} item={nft} onClick={() => {
                                        onAdd(nft.token_address, BigInt(nft.token_id));
                                        closeModal();
                                    }
                                    }/>
                                })
                            }
                        </div>
                    }

                </div>
            </div>
        } isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}


function NftSearchItem({item, onClick}: {
    item: NftListItem
    onClick: () => void
}) {

    return <div className='hover:border-primary-50 border-transparent border rounded-lg overflow-clip'>
        <button
            onClick={onClick}
            className="w-full h-full text-left flex flex-col  bg-gray-800">
            {/*{token.logoURI ? <img src={token.logoURI} alt={name} className='h-6 mr-2'/> : <Icon className='h-6 mr-2'/>}*/}


            <div className='flex flex-col gap-2 grow justify-end w-full'>
                <div className='w-full overflow-hidden bg-gray-800 grow aspect-square'>
                    {item.media?.original_media_url && <img loading={"lazy"} src={item.media!.original_media_url!} alt={item.name ?? ''}
                                                            className={'object-contain w-full h-full text-center text-sm'}/>}
                </div>
                <span className='text-xs text-gray-400 px-2'>{item.name}</span>
                <div className='w-full flex px-2 pb-2'>
                    <span
                        className='text-xs text-gray-400 text-ellipsis overflow-hidden shrink'>#{item.token_id}</span>
                </div>
            </div>


        </button>
    </div>

}

