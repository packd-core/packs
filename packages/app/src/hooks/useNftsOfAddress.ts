import {useEffect, useState} from "react";
import {Address, useAccount, useNetwork} from "wagmi";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export type NftListItem = {
    token_address: Address;
    token_id: string;
    contract_type: 'ERC1155' | 'ERC721';
    media?: {
        original_media_url?: string;
        mimetype?: string;
    };
    name?: string;
}
export const useNftsOfAddress = () => {
    const {address} = useAccount();
    const {chain} = useNetwork()
    const mainAddress = usePackdAddresses(chain?.id).PackMain.toLowerCase();

    const [nftList, setNftList] = useState<NftListItem[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (!address || !chain?.id) {
            return;
        }
        setIsLoading(true);
        fetch(`/api/getNftsOfAddress?address=${address}&chain=${chain?.id}`)
            .then(r => {
                if (!r.ok) {
                    throw new Error("Request failed");
                }
                return r.json();
            }).then((r: NftListItem[]) => r.filter(nft => nft.token_address?.toLowerCase() !== mainAddress))
            .then(setNftList)
            .catch(() => {
                setNftList([])
                setIsError(true)
            })
            .finally(() => setIsLoading(false));
    }, [address, chain?.id]);

    return {nftList, isLoading, isError};

}
