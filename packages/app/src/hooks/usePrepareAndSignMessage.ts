import type { Address } from "wagmi";
import { useState, useCallback, useEffect } from "react";
import { ethers } from "ethers";

import { useEthersSigner } from "./useEthersSigner";
import useKeySignManager from "@/src/hooks/useKeySignManager";
import { KeySignManager } from "@/src/lib/keySignManager";

export const usePrepareAndSignMessage = (
  tokenId: number | null,
  maxRefundValue: bigint,
  moduleData: Array<any>
) => {
  const [message, setMessage] = useState<Uint8Array | undefined>(undefined);
  const [signData, setSignData] = useState<string | undefined>(undefined);
  const keySignManager = useKeySignManager();
  const signer = useEthersSigner();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // useEffect(() => {
  //
  //     console.log("Signer loaded successfully");
  //     console.log("Signer:", signer);
  // }, [signer]);

  // useEffect(() => {
  //   if (signData) {
  //     console.log("Signature:", signData);
  //   }
  // }, [signData]);

  const handlePrepareAndSignMessage = useCallback(async () => {
    try {
      // const msg = await keySignManager.prepareEncodePacked(
      //   ["uint256", "uint256", "address"],
      //   [Number(tokenId), maxRefundValue, address]
      // );
      const sigClaimer = await keySignManager.generateSignTypedData(
        signer!.signer,
        tokenId!,
          maxRefundValue,
        maxRefundValue,
        moduleData
      );
      // const encodedModuleData = KeySignManager.getModuleDataBytes([]);
      // const { allTypes, allValues } = await keySignManager.getMessage(
      //     ["uint256", "uint256"],
      //     [Number(tokenId), maxRefundValue]
      // );
      //
      // const message = ethers.solidityPackedKeccak256(allTypes, allValues);
      // const messageToSign = ethers.getBytes(message);
      // // const msgH = ethers.getBytes(msg);
      // // console.log("Message:", msgH);
      //
      // setMessage(messageToSign);
      // // const prefixedMsg = toEthSignedMessageHash(msg);
      // // console.log("Prefixed message:", prefixedMsg);
      //
      // // if (isError) {
      // //   console.error("Error signing message:", isError);
      // //   return;
      // // }
      // //
      // // // signMessage({ message: msg });
      // // if (isLoading || !signer) {
      // //   console.log("Signer is loading");
      // //   return;
      // // }
      // setIsLoading(true);
      // signer?.signer?.signMessage(messageToSign).then((signature) => {
      setSignData(sigClaimer);
      setIsLoading(false);
      setIsSuccess(true);
      // });
    } catch (error) {
      console.error("Error preparing message:", error);
      setIsLoading(false);
    }
  }, [keySignManager, tokenId, maxRefundValue, signer?.signer, moduleData]);

  return {
    signData: signData as `0x${string}`,
    // isSignError,
    isLoading,
    isSuccess,
    // isSignSuccess,
    // signMessage,
    handlePrepareAndSignMessage,
  };
};
