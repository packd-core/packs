import { HelpItem } from "@/app/components/content/HelpItem";
import { useEffect } from "react";
import Button from "@/app/components/button/Button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import clsxm from "@/src/lib/clsxm";
import { useClaimState } from "@/app/claim/[key]/useClaimState";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsAvatar } from "wagmi";
import StepperIndicator from "@/app/claim/[key]/steps/components/StepperIndicator";
import Receiver from "~/receiver.svg";
import formatAddress from "@/src/lib/addressFormatter";
import { useEstimateRefundValue } from "@/src/hooks/useEstimateRefundValue";
import Blockies from "react-blockies";

export default function ConnectWalletForm() {
  const nextStep = useClaimState((state) => state.nextStep);
  const previousStep = useClaimState((state) => state.previousStep);
  const setControls = useClaimState((state) => state.setControls);
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();

  const { value: maxRefundValue, isLoading: isEstimateRefundValueLoading } =
    useEstimateRefundValue();
  const setMaxRefundValue = useClaimState((state) => state.setMaxRefundValue);
  useEffect(() => {
    setMaxRefundValue(maxRefundValue);
  }, [maxRefundValue, setMaxRefundValue]);

  useEffect(() => {
    setControls(
      <div className="w-full flex justify-between py-1 items-center">
        <StepperIndicator step={0} />

        {address ? (
          <Button
            onClick={nextStep}
            isLoading={!maxRefundValue}
            variant="navigation"
            rightIcon={<FiArrowRight className="text-inherit inline" />}
          >
            {"Next"}
          </Button>
        ) : (
          <Button
            onClick={openConnectModal}
            variant="navigation"
            rightIcon={<FiArrowRight className="text-inherit inline" />}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    );
  }, [
    nextStep,
    setControls,
    previousStep,
    address,
    openConnectModal,
    maxRefundValue,
  ]);
  if (address)
    return (
      <div className="flex flex-col w-full gap-2 items-center">
        <Blockies
          seed={address as string}
          size={10}
          scale={10}
          className="rounded-full"
        />
        <h2 className="text-lg font-bold text-center">
          <span className="text-primary-500">{formatAddress(address)}</span>{" "}
          Connected
        </h2>
      </div>
    );
  return (
    <div className="flex flex-col w-full gap-2">
      <h2 className="text-lg font-bold text-center">Connect wallet</h2>
      <p className="text-sm text-center text-gray-500 px-4 pb-2">
        Connect with your wallet to proceed. No ETH needed to claim, the pack
        pays for itself for unpacking.
      </p>
      <HelpItem title={"Why am I asked to connect wallet?"}>
        In order to verify your ownership of the address that you want to claim
        with.
      </HelpItem>
    </div>
  );
}
