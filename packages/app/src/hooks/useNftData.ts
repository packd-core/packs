import { Address, useContractRead, useNetwork } from "wagmi";
import { erc1155HolderABI, useErc721TokenUri } from "@/app/abi/generated";
import { useEffect, useMemo, useState } from "react";
import { erc1155 } from "@contracts/types/generated/@openzeppelin/contracts/token";

export type NftData = {
  description?: string;
  image?: string;
  name?: string;
  contentType?: string;
};

export function useNftData({
  tokenId,
  address,
  chainId,
}: {
  tokenId: bigint;
  address: Address;
  chainId?: number;
}) {
  const {
    data: tokenUri,
    isLoading,
    isError,
  } = useErc721TokenUri({ address, args: [tokenId], chainId });
  const {
    data: uri,
    isLoading: isErc1155Loading,
    isError: isErc1155Error,
  } = useContractRead({
    abi: [
      {
        stateMutability: "view",
        type: "function",
        inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
        name: "tokenURI",
        outputs: [{ name: "", internalType: "string", type: "string" }],
      },
    ],
    functionName: "tokenURI",
    address,
    args: [tokenId],
    chainId,
  });
  const [nftData, setNftData] = useState<NftData>();
  const [isNftDataLoading, setIsNftDataLoading] = useState(false);
  const data = tokenUri || (uri as string);
  console.log({ tokenUri, uri });
  useEffect(() => {
    if (data) {
      const url = data
        .replace("ipfs://", "https://ipfs.io/ipfs/")
        .replace("/ipfs/ipfs", "/ipfs");
      setIsNftDataLoading(true);
      fetch(`/api/nftData?url=${url}`, { mode: "no-cors" })
        .then((response) => {
          if (!response.ok) {
            return;
          }
          response.json().then(async (json) => {
            if ("image" in json) {
              json["image"] = json["image"].replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              );
              const res = await fetch(json["image"], { method: "HEAD" }).catch(
                () => {}
              );
              if (res?.ok) {
                json["contentType"] = response.headers.get("Content-Type");
              }
            }
            setNftData(json);
          });
        })
        .finally(() => setIsNftDataLoading(false));
    }
  }, [data]);
  return {
    data,
    nftData,
    isLoading: isLoading || isNftDataLoading,
    isError: isError || (!isNftDataLoading && !isLoading && !nftData),
  };
}

export function useOpenSeaLink({
  address,
  tokenId,
}: {
  address: Address;
  tokenId: bigint;
}) {
  const { chain } = useNetwork();
  return useMemo(() => {
    if (!chain) {
      return "";
    }
    return `https://opensea.io/assets/${chain?.network}/${address}/${tokenId}`;
  }, [address, chain, tokenId]);
}
