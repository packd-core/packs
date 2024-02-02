import { useEffect, useMemo, useState } from "react";
import { useAccount, useEnsAvatar } from "wagmi";
import { useClaimState } from "@/app/claim/[key]/useClaimState";
import { useEthersSigner } from "@/src/hooks/useEthersSigner";
import type {
  SigClaimerData,
  SigOwnerData,
  EstimateRefundPreparedData,
} from "@/src/lib/keySignManager";
import { parseEther } from "ethers";
import { usePreparePackMainOpen } from "@/app/abi/generated";
import { ClaimData } from "@/src/hooks/useGenerateClaimData";
import useKeySignManager from "@/src/hooks/useKeySignManager";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import { useEstimateGas } from "@/src/hooks/useEstimateGas";

export function useEstimateRefundValue() {
  const tokenId = useClaimState((state) => state.mintedTokenId);
  const packData = useClaimState((state) => state.packData);
  const claimPrivateKey = useClaimState((state) => state.privateKey);
  const keySignManager = useKeySignManager();
  const signer = useEthersSigner();
  const addresses = usePackdAddresses();
  const { address } = useAccount();

  const [sigData, setSigData] = useState<{
    signatureOwner: string;
    signatureClaimer: string;
    address: string;
  }>();

  const sigOwnerData: SigOwnerData = useMemo(
    () => ({
      values: [Number(tokenId), ""],
      types: ["uint256", "address"],
    }),
    [tokenId]
  );
  const sigClaimerData: SigClaimerData = useMemo(
    () => ({
      maxRefundValue: parseEther("1"),
      refundValue: 0n,
      tokenId: tokenId!,
      moduleData: packData?.moduleData ?? [],
    }),
    [packData?.moduleData, tokenId]
  );
  useEffect(() => {
    if (!address) {
      return;
    }

    keySignManager
      .generateDataForEstimation(
        claimPrivateKey ?? "",
        sigOwnerData,
        sigClaimerData
      )
      .then((data: EstimateRefundPreparedData) => {
        setSigData(data);
      });
  }, [
    keySignManager,
    packData?.moduleData,
    sigClaimerData,
    sigOwnerData,
    claimPrivateKey,
    tokenId,
    address,
  ]);

  let claimData: ClaimData = {
    ...sigClaimerData,
    sigOwner: (sigData?.signatureOwner ?? "") as `0x${string}`,
    sigClaimer: (sigData?.signatureClaimer ?? "") as `0x${string}`,
    claimer: (sigData?.address ?? "") as `0x${string}`,
  };
  const { config, isLoading: isPreparing } = usePreparePackMainOpen({
    address: addresses.PackMain,
    args: [claimData],
    enabled: !!claimData.sigOwner,
  });

  const { estimatedGas, isError, isLoading } = useEstimateGas({
    config: config.request,
    isEnabled: !!claimData.sigOwner && !isPreparing,
  });

  return {
    value: ((estimatedGas ?? 0n) * 12n) / 10n,
    isLoading: !estimatedGas,
  };
}
