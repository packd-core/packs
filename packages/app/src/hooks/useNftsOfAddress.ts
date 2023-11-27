import {useEffect, useState} from "react";
import {Address, useAccount, useNetwork} from "wagmi";

export type NftListItem = {
    token_address: Address;
    token_id: string;
    contract_type: 'ERC1155' | 'ERC721';
    media?: {
        original_media_url?: string;
    };
    name?: string;
}
export const useNftsOfAddress = () => {
    const {address} = useAccount();
    const {chain} = useNetwork()

    const [nftList, setNftList] = useState<NftListItem[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (!address || !chain?.id) {
            return;
        }
        setIsLoading(true);
        fetch(`/api/getNftsOfAddress?address=${address}&chain=${chain?.id}`)
            .then(r => r.json())
            .then(setNftList)
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [address, chain?.id]);

    return {nftList, isLoading, isError};

}
