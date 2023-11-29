import type { Address } from "wagmi";
import { useEffect, useState } from "react";
import useKeySignManager from "@/src/hooks/useKeySignManager";

export interface ClaimData {
  tokenId: number | bigint;
  sigOwner: string; // Signature from the Pack owner
  claimer: string; // Address of the claimer
  sigClaimer: string; // Signature from the claimer
  refundValue: bigint; // Value to refund to the relayer
  maxRefundValue: bigint; // Maximum refundable value (to prevent over-refund)
  moduleData: Array<any>; // Data for the module
}

export const useGenerateClaimData = (
  address: Address,
  maxRefundValue: bigint,
  sigClaimer: string,
  tokenId: bigint,
  privateKeyDecoded: string,
  moduleData: Array<any>
) => {
  const [claimData, setClaimData] = useState<ClaimData>({
    tokenId: 0,
    sigOwner: "",
    claimer: address,
    sigClaimer,
    refundValue: BigInt(0),
    maxRefundValue,
    moduleData,
  });
  const keySignManager = useKeySignManager();

  useEffect(() => {
    const generateSignature = async () => {
      if (tokenId==undefined || !privateKeyDecoded) {
        return;
      }
      const sigOwner = await keySignManager.generateClaimSignature(
        privateKeyDecoded,
        ["uint256", "address"],
        [Number(tokenId), address]
      );
      const sigOwnerResolved = await sigOwner.claimSignature;
      setClaimData((prev) => {
        return ({
          ...prev,
          tokenId,
          sigOwner: sigOwnerResolved,
          sigClaimer,
        });
      });
    };

    generateSignature();
  }, [address, tokenId, privateKeyDecoded, sigClaimer, keySignManager]);

  return claimData;
};
