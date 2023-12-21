import {Address, erc721ABI, useAccount, usePublicClient} from "wagmi";
import {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "@/app/components/dialog/Modal";
import {BsSearch, BsX} from "react-icons/bs";
import {isAddress} from "viem";
import clsxm from "@/src/lib/clsxm";
import {erc721EnumerableABI, useErc721Name, useErc721OwnerOf} from "@/app/abi/generated";
import {NftListItem, useNftsOfAddress} from "@/src/hooks/useNftsOfAddress";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {getPublicClient} from "@wagmi/core";


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


    //async function getNFTsOfOwner() {
    //   const contract = new ethers.Contract(contractAddress, erc721ABI, provider);
    //   const balance = await contract.balanceOf(ownerAddress); //Returns the number of tokens owned by the address
    //
    //   let tokenIds = [];
    //
    //   for(let i = 0; i < balance.toNumber(); i++) {
    //     const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i); //Get the token ID based on the index from the balanceOf call
    //     tokenIds.push(tokenId.toString());
    //   }
    //
    //   console.log(`Token IDs owned by ${ownerAddress}: ${tokenIds}`);
    // }

    const queryNftAddress = useCallback(async (contractAddress: Address) => {
        const pc = getPublicClient();
        if (!address) {
            return;
        }
        const name = await pc.readContract({
            address: contractAddress,
            abi: erc721ABI,
            functionName: 'name',
        });

        const items = await pc.getContractEvents({
            address: contractAddress,
            abi: erc721ABI,
            eventName: 'Transfer',
            fromBlock: 0n,
            toBlock: 'latest',
            args: {
                to: address
            }
        }).then((res) => {
            return Promise.all(res.map((event) => event.args.tokenId).map(async (tokenId) => {
                return pc.readContract({
                    address: contractAddress,
                    abi: erc721ABI,
                    functionName: 'tokenURI',
                    args: [tokenId!]
                }).then((tokenURI) => {
                    console.log({tokenId, tokenURI})
                    if (!tokenURI) return {
                        name,
                        token_address: contractAddress,
                        token_id: tokenId?.toString(),
                        contract_type: 'ERC721',
                    } as NftListItem;
                    return fetch(tokenURI).then((res) => res.json()).then((res) => {
                        console.log(res)
                        return {
                            name,
                            token_address: contractAddress,
                            token_id: tokenId?.toString(),
                            contract_type: 'ERC721',
                            media: res.image ? { original_media_url : res.image } : undefined,
                        } as NftListItem;

                    })
                })

            }));
        })
        console.log({name, items})
        return items;


    }, [address]);


    const [nftList, setNftList] = useState<NftListItem[]>();
    useEffect(() => {
        const list = (unfilteredNftList ?? []).filter((nft) => Object.values(nft).some((val) => typeof val === 'string' && val.toLowerCase().includes(filter?.toLowerCase() ?? '')))
        setNftList(list);
        if (filter && isAddress(filter)) {
            // if (!list.length && filter && isAddress(filter)) {
            queryNftAddress(filter).then(value => {
                console.log({value})
                setNftList(value);
            })
        }
    }, [filter, queryNftAddress, unfilteredNftList])


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
                                       <BsSearch
                                           className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'/>

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
                               <input
                                   className={clsxm('text-right', ((tokenId ?? -1) < 0 || !hasToken) && 'text-red-500')}
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
                               !isLoading && !!nftList?.length && <div className=" h-96 overflow-y-auto">
                                   <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2'>
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

                               </div>
                           }

                           {!isLoading && !nftList?.length &&
                               <div className="flex justify-center items-center w-full  h-72">
                                   <span className='text-gray-400'>You do not have any NFTs in your wallet</span>
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

    const mediaUrl = item.media?.original_media_url?.replace('ipfs://', 'https://ipfs.io/ipfs/')
    const isVideo = item.media?.mimetype?.includes('video') ?? false
    return <div className='hover:border-primary-50 border-transparent border rounded-lg overflow-clip'>
        <button
            onClick={onClick}
            className="w-full h-full text-left flex flex-col  bg-gray-800">
            {/*{token.logoURI ? <img src={token.logoURI} alt={name} className='h-6 mr-2'/> : <Icon className='h-6 mr-2'/>}*/}


            <div className='flex flex-col gap-2 grow justify-end w-full'>
                <div className='w-full overflow-hidden bg-gray-800 grow aspect-square'>
                    {mediaUrl && <>
                        {isVideo ? <video width="400" controls>
                            <source src={mediaUrl} type={item.media!.mimetype}/>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                        </video> : <img loading={"lazy"} src={mediaUrl} alt={item.name ?? ''}
                                        className={'object-contain w-full h-full text-center text-sm'}/>
                        }
                    </>}

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

