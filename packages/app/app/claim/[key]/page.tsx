"use client"
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {Address, useAccount, useNetwork, useSwitchNetwork, useWaitForTransaction} from "wagmi";
import {useHydrated} from "@/src/hooks/useHydrated";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {Card} from "@/app/components/Card";
import SenderToUser from '~/claimprogress.svg'
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import InitialForm from "@/app/claim/[key]/steps/InitialForm";
import ConnectWalletForm from "@/app/claim/[key]/steps/ConnectWalletForm";
import {SignForm} from "@/app/claim/[key]/steps/SignForm";
import ReviewClaimForm from "@/app/claim/[key]/steps/ReviewClaimForm";
import {PackClaimedCard} from "@/app/claim/[key]/steps/PackClaimedCard";
import {useDecodeUrl} from "@/src/hooks/useUrlEncodeDecode";
import {useEffect, useMemo} from "react";
import useEnsOrFormattedAddress from "@/src/hooks/useEnsOrAddress";
import Button from "@/app/components/button/Button";


export default function ClaimPage({params: {key}}: any) {
    const {isConnected, isConnecting, address} = useAccount();
    const {chain} = useNetwork();
    const {tokenId, version, chainId, privateKey} = useDecodeUrl(key);
    const setMintedTokenId = useClaimState(state => state.setMintedTokenId);
    const mintedTokenId = useClaimState(state => state.mintedTokenId);
    const resetStepper = useClaimState(state => state.reset);
    const setPrivateKey = useClaimState(state => state.setPrivateKey);
    const setChainId = useClaimState(state => state.setChainId);
    useEffect(() => {
        resetStepper();
        if (isNaN(tokenId)) {
            return;
        }
        setMintedTokenId(BigInt(tokenId))
        setPrivateKey(privateKey)
        setChainId(chainId)
    }, [chainId, privateKey, resetStepper, setChainId, setMintedTokenId, setPrivateKey, tokenId]);

    const isLoaded = useHydrated()

    const step = useClaimState(state => state.step);

    const hash = useClaimState(state => state.hash)

    const owner = useClaimState(state => state.owner)

    const isSendingToRelayer = useClaimState(state => state.sendingToRelayer)

    const {
        data: receipt,
        isLoading,
        isSuccess,
    } = useWaitForTransaction({hash, enabled: !!hash});
    useEffect(() => {
        if (isSuccess) {
            useClaimState.getState().nextStep();
        }
    }, [isSuccess]);

    const ownerName = useEnsOrFormattedAddress(owner as Address, chainId);

    if (isConnecting || !isLoaded || mintedTokenId == undefined) {
        return <LoadingCard
            title="Connecting"
            text='Waiting for network...'/>
    }

    if (isLoading && hash) return (
        <LoadingCard
            title="Your pack is on the way..."
            text='Waiting for Confirmation...'
            transactionHash={hash}/>

    )
    if (step === 4) {
        return <PackClaimedCard/>
    }
    if (isSendingToRelayer) {
        return <LoadingCard
            title={'Your pack is on the way'}
            text="Sending to Relayer..."/>
    }
    return <Card
        className={'mx-auto w-full'}
        containerClassName=' overflow-y-auto'
        controls={<Controls/>}>
        <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-gray-800 flex justify-center items-center">
                <SenderToUser className='w-20 h-10'/>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl"><span
                className="text-red-500">{ownerName ?? 'Someone'}</span> sent you a
                pack</h1>
            <CurrentChain className='my-4'/>

            {
                chainId !== chain?.id ?
                    <WrongChain chainId={chainId}/> : <ClaimContent step={step}/>
            }


        </div>
    </Card>
}

const WrongChain = ({chainId}: { chainId: number }) => {
    const {chains = []} = useNetwork()
    const {switchNetwork} = useSwitchNetwork({chainId})
    const chain = useMemo(() => chains.find(chain => chain.id === chainId), [chainId, chains])
    const chainName = useMemo(() => chain?.name ?? 'Unknown Network', [chain]);
    return <div className='flex flex-col items-center'>
        <h1 className='text-center font-semibold px-10 '>Your Pack is on the <span className='text-red-500'>{chainName}</span> chain. Please switch to that chain to
            claim it.</h1>
        <Button variant={'primary'} onClick={() => switchNetwork && switchNetwork(chainId)} className='block my-10'>Switch
            to {chainName}</Button>
    </div>
}

const ClaimContent = ({step}: { step: number }) => {
    return useMemo(() => {
        switch (step) {
            case 0:
                return <InitialForm/>
            case 1:
                return <ConnectWalletForm/>
            case 2:
                return <SignForm/>
            case 3:
                return <ReviewClaimForm/>
            default:
                return <div>Unknown state</div>
        }
    }, [step])
}

function Controls() {
    const item = useClaimState(state => state.controls);
    return <>{item}</>;
}
