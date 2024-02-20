"use client"
import {Address, useAccount, useNetwork, useSwitchNetwork, useWaitForTransaction} from "wagmi";
import {useEffect, useMemo} from "react";
import Button from "@/app/components/button/Button";
import InitialForm from "@/app/claim/[key]/steps/InitialForm";
import ConnectWalletForm from "@/app/claim/[key]/steps/ConnectWalletForm";
import {SignForm} from "@/app/claim/[key]/steps/SignForm";
import ReviewClaimForm from "@/app/claim/[key]/steps/ReviewClaimForm";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import {useHydrated} from "@/src/hooks/useHydrated";
import useEnsOrFormattedAddress from "@/src/hooks/useEnsOrAddress";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {PackClaimedCard} from "@/app/claim/[key]/steps/PackClaimedCard";
import {Card} from "@/app/components/Card";
import Blockies from "react-blockies";
import Present from "~/present.svg";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {fetchFullPackDetail} from "@/src/lib/fetchFullPackDetail";

export type PackInitData = Awaited<ReturnType<typeof fetchFullPackDetail>>
export default function ClaimForm({claimKey, tokenData}: {claimKey:string, tokenData?: PackInitData}) {
    const { isConnected, isConnecting, address } = useAccount();
    const { chain } = useNetwork();
    const resetStepper = useClaimState((state) => state.reset);
    const setFullPackDetails = useClaimState((state) => state.setFullPackDetails);
    const goToInitialStep = useClaimState((state) => state.initialStep);
    useEffect(() => {
        resetStepper();
        if (tokenData == undefined) return;
        setFullPackDetails(tokenData);
    }, [
        tokenData,
        resetStepper,
        setFullPackDetails,
    ]);

    useEffect(() => {
        if (chain?.id !== tokenData?.chainId) {
            goToInitialStep();
        }
    }, [chain?.id, goToInitialStep, tokenData?.chainId]);
    useEffect(() => {
        goToInitialStep();
    }, [address, goToInitialStep]);

    const isLoaded = useHydrated();

    const step = useClaimState((state) => state.step);

    const hash = useClaimState((state) => state.hash);

    const owner = tokenData?.content?.owner;

    const isSendingToRelayer = useClaimState((state) => state.sendingToRelayer);

    const {
        data: receipt,
        isLoading,
        isSuccess,
    } = useWaitForTransaction({ hash, enabled: !!hash });
    useEffect(() => {
        if (isSuccess) {
            useClaimState.getState().nextStep();
        }
    }, [isSuccess]);

    const ownerName = useEnsOrFormattedAddress(owner as Address);

    // if (isConnecting || !isLoaded || mintedTokenId == undefined) {
    //   return <LoadingCard title="Connecting" text="Waiting for network..." />;
    // }

    if (isLoading && hash)
        return (
            <LoadingCard
                title="Your pack is on the way..."
                text="Waiting for Confirmation..."
                transactionHash={hash}
            />
        );
    if (step === 4) {
        return <PackClaimedCard />;
    }
    if (isSendingToRelayer) {
        return (
            <LoadingCard
                title={"Your pack is on the way"}
                text="Sending to Relayer..."
            />
        );
    }
    return (
        <Card
            className={"mx-auto w-full"}
            containerClassName=" overflow-y-auto"
            controls={<Controls />}
        >
            <div className="flex flex-col items-center gap-2">
                <div className="p-3 gap-1.5 rounded-full bg-gray-800 flex justify-center items-center">
                    <Blockies
                        seed={(tokenData?.content?.owner ?? '')}
                        size={8}
                        scale={3}
                        className="rounded-full h-6 w-6"
                    />
                    <p className='text-xl leading-none before:content-["»"] before:absolute before:inset-0 before:pl-0.5 h-6 w-4 relative before:text-center'></p>
                    <Present className="w-6 h-6" />
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl">
                    <span className="text-red-500">{ownerName ?? "Someone"}</span> sent
                    you a pack
                </h1>
                {isConnected && <CurrentChain className="my-4" />}

                {/*{isConnected ? (*/}
                {/*    tokenData?.chainId !== chain?.id ? (*/}
                {/*        <WrongChain chainId={tokenData?.chainId ?? 1} />*/}
                {/*    ) : null*/}
                {/*) : (*/}
                {/*    <ConnectWallet />*/}
                {/*)}*/}
                <ClaimContent step={step} initData={tokenData!} />
            </div>
        </Card>
    );
}

const WrongChain = ({ chainId }: { chainId: number }) => {
    const { chains = [] } = useNetwork();
    const { switchNetwork } = useSwitchNetwork({ chainId });
    const chain = useMemo(
        () => chains.find((chain) => chain.id === chainId),
        [chainId, chains]
    );
    const chainName = useMemo(() => chain?.name ?? "Unknown Network", [chain]);
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center font-semibold px-10 ">
                Your Pack is on the <span className="text-red-500">{chainName}</span>{" "}
                chain. Please switch to that chain to claim it.
            </h1>
            <Button
                variant={"primary"}
                onClick={() => switchNetwork && switchNetwork(chainId)}
                className="block my-10"
            >
                Switch to {chainName}
            </Button>
        </div>
    );
};

const ClaimContent = ({ step, initData }: { step: number, initData: PackInitData }) => {
    return useMemo(() => {
        switch (step) {
            case 0:
                return <InitialForm initData={initData} />;
            case 1:
                return <ConnectWalletForm />;
            case 2:
                return <SignForm />;
            case 3:
                return <ReviewClaimForm />;
            default:
                return <div>Unknown state</div>;
        }
    }, [step]);
};

function Controls() {
    const item = useClaimState((state) => state.controls);
    return <>{item}</>;
}
