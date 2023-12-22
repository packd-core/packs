'use client'
import {Card} from "@/app/components/Card";
import Present from "~/present.svg";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {AssetsForm} from "@/app/mint/pack/AssetsForm";
import {useEffect, useMemo, useState} from "react";
import {ApproveForm} from "@/app/mint/pack/ApproveForm";
import {SignForm} from "@/app/mint/pack/SignForm";
import {ReviewForm} from "@/app/mint/pack/ReviewForm";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {PackCreatedCard} from "@/app/mint/pack/PackCreatedCard";
import {useAccount, useWaitForTransaction} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useMintStore} from "@/src/stores/useMintStore";
import {usePackState} from "@/app/mint/usePackState";
import {useHydrated} from "@/src/hooks/useHydrated";
import {decodeEventLog} from "viem";
import {packMainABI} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

const MintPage = () => {
    const {isConnected, isConnecting, address} = useAccount();
    const isLoaded = useHydrated()
    const hash = usePackState(state => state.hash)

    const addresses = usePackdAddresses();
    const setMintedTokenId = usePackState(state => state.setMintedTokenId);
    const mintedTokenId = usePackState(state => state.mintedTokenId);

    const {
        data: receipt,
        isLoading,
        isSuccess,
    } = useWaitForTransaction({hash, enabled: !!hash});



    useEffect(() => {
        if (receipt?.status === "success") {
            const logs = receipt.logs.filter(
                (log) =>
                    log.address.toLowerCase() === addresses.PackMain.toLowerCase()
            );
            logs.forEach((log) => {
                try {
                    const decodedLog = decodeEventLog({
                        abi: packMainABI,
                        data: log.data,
                        topics: log.topics,
                    });
                    if (decodedLog.eventName === "PackCreated") {
                        setMintedTokenId((decodedLog.args as any).tokenId);
                    }
                } catch (e) {
                    //ignore error
                }
            });
        }
    }, [addresses.PackMain, receipt, setMintedTokenId]);

    const isLoadingState = useMemo(() => isConnecting || !isLoaded, [isConnecting, isLoaded]);
    const isNotConnected = useMemo(() => !isConnecting && !isConnected, [isConnected, isConnecting]);
    const loadingHash = useMemo(() => isLoading ? hash : undefined, [isLoading, hash]);
    return useMemo(() => {
        if (isLoadingState) {
            return <LoadingCard
                title="Connecting"
                text='Waiting for network...'/>
        }
        if (isNotConnected) {
            return <Card
                className={'mx-auto w-full'}
                containerClassName=' overflow-y-auto'
                controls={<div className="text-center"> Connect to a network</div>}>
                <div className="flex flex-col items-center pb-4">
                    <div className="p-2 rounded-full bg-gray-800">
                        <Present className={'h-6 w-6'}/>
                    </div>
                    <h1 className="text-lg sm:text-xl md:text-2xl mb-10">Create new Pack</h1>
                    <ConnectButton/>
                </div>
            </Card>
        }

        if (loadingHash) return (
            <LoadingCard
                title="Your pack is being created..."
                text='Waiting for Confirmation...'
                transactionHash={loadingHash}/>

        )
        if (mintedTokenId !== undefined) return (
            <PackCreatedCard/>
        )
        return (
            <Card
                className={'mx-auto w-full'}
                containerClassName=' overflow-y-auto'
                controls={<MintPageControls/>}>
                <div className="flex flex-col items-center gap-2">
                    <div className="p-2 rounded-full bg-gray-800">
                        <Present className={'h-6 w-6'}/>
                    </div>
                    <h1 className="text-lg sm:text-xl md:text-2xl">Create new Pack</h1>
                    <CurrentChain className='my-4'/>
                    <MintPageContent/>
                </div>
            </Card>
        );
    }, [isLoadingState, isNotConnected, loadingHash, mintedTokenId])
};

const MintPageControls = () => {
    const controls = usePackState(state => state.controls);
    return useMemo(() => {
        return controls ?? <div></div>;
    }, [controls]);
}
const MintPageContent = () => {
    const step = usePackState(state => state.step);
    const modules = useMintStore(state => state.modules);
    const manualApprove = useMintStore(state => state.manualApprove);
    const nextStep = usePackState(state => state.nextStep)
    const isAllApproved = useMemo(() => modules.every(m => m.isApproved), [modules]);
    useEffect(() => {
        if (isAllApproved && step === 1 && !manualApprove) {
            nextStep();
        }
    }, [isAllApproved, step, nextStep, manualApprove]);
    return useMemo(() => {
        switch (step) {
            case 0:
                return <AssetsForm/>;
            case 1:
                return <ApproveForm/>;
            case 2:
                return <SignForm/>;
            case 3:
                return <ReviewForm/>;
            default:
                return <div>Invalid state</div>
        }
    }, [step]);


}

export default MintPage;
