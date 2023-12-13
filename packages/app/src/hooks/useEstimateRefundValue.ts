import { useEffect, useMemo, useState } from "react";
import { useClaimState } from "@/app/claim/[key]/useClaimState";
import { useAccount } from "wagmi";
import { useEthersSigner } from "@/src/hooks/useEthersSigner";
import { SigClaimerData, SigOwnerData } from "@/src/lib/keySignManager";
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
    keySignManager
      .generateDataForEstimation(
        claimPrivateKey ?? "",
        sigOwnerData,
        sigClaimerData
      )
      .then((data) => {
        setSigData(data);
      });
  }, [
    keySignManager,
    packData?.moduleData,
    sigClaimerData,
    sigOwnerData,
    claimPrivateKey,
    tokenId,
  ]);

  let claimData: ClaimData = {
    ...sigClaimerData,
    sigOwner: (sigData?.signatureOwner ?? "") as `0x${string}`,
    sigClaimer: (sigData?.signatureClaimer ?? "") as `0x${string}`,
    claimer: (sigData?.address ?? "") as `0x${string}`,
  };
  const { config } = usePreparePackMainOpen({
    address: addresses.PackMain,
    args: [claimData],
    enabled: !!claimData.sigOwner,
  });

  const { estimatedGas, isError, isLoading } = useEstimateGas({
    config,
    isEnabled: !!claimData.sigOwner,
  });

  return {
    value: ((estimatedGas ?? 0n) * 12n) / 10n,
    isLoading: !estimatedGas,
  };
}
