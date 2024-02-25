import { Module } from "@/src/stores/useMintStore";
import { ContentCard } from "@/app/components/content/ContentCard";
import { BsX } from "react-icons/bs";
import { useErc721Name } from "@/app/abi/generated";
import { useNftData, useOpenSeaLink } from "@/src/hooks/useNftData";
import { LoadingCard } from "@/app/components/content/LoadingCard";
import { CgSpinner } from "react-icons/cg";
import { useNetwork } from "wagmi";
import { ExternalLink } from "@/app/components/links/ExternalLink";
import clsxm from "@/src/lib/clsxm";
import {useHydrated} from "@/src/hooks/useHydrated";

export default function Erc721Card({
  onClick,
  module,
    chainId
}: {
  onClick?: () => void;
  module: Module;
  chainId?: number;
}) {
  const isHydrated = useHydrated();
  const { data: tokenName } = useErc721Name({ address: module.address });
  const { nftData, isLoading } = useNftData({
    address: module.address!,
    tokenId: module.value!,
    chainId: chainId
  });
  const openSeaLink = useOpenSeaLink({
    address: module.address!,
    tokenId: module.value!,
    chainId: chainId
  });

  const loading = isLoading || !isHydrated;
  // const {nftData, isLoading} = useNftData({tokenId: 5n, address: '0x5b90d70e55c6c2e45d969bacf0335916df7a2009', chainId: 1})
  const isVideo = nftData?.contentType?.includes("video") ?? false;
  return (
    <ContentCard className="self-stretch">
      <div className="flex gap-2 relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 z-10 flex items-center justify-center">
            {" "}
            <CgSpinner className="h-8 w-8 animate-spin" />
          </div>
        )}
        <div
          className={clsxm(
            "w-20 h-20 flex justify-center items-center rounded-lg bg-back shrink-0",
            isVideo && "w-32 h-32"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {isVideo ? (
            <video width="400" controls className="w-full">
              <source src={nftData?.image} type={nftData?.contentType} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
            </video>
          ) : (
            <img
              src={nftData?.image}
              alt={nftData?.name}
              className="rounded-lg zoom-on-hover w-full h-full"
            />
          )}
        </div>
        {!loading && (
          <div className="flex flex-col items-start relative grow">
            {onClick && (
              <button
                className="hover:text-primary-500 right-0 top-0 absolute"
                onClick={onClick}
              >
                <BsX />
              </button>
            )}
            <div>
              <div className="text-xs text-gray-400">
                NFT: {tokenName} #{module.value?.toString()}
              </div>
              <div className="font-bold grow pr-4">{nftData?.name}</div>
            </div>
            <div className="leading-tight text-gray-400">
              <span className="text-card-title mt-2">
                Description:
                <span className="font-normal leading-tight">
                  {" "}
                  {nftData?.description}
                </span>
              </span>
            </div>
            <div>
              <ExternalLink className="text-xs" href={openSeaLink}>
                View on Opensea
              </ExternalLink>
            </div>
          </div>
        )}
      </div>
    </ContentCard>
  );
}
