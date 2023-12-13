import {create} from 'zustand'
import {Address} from "wagmi";
import {ReactNode} from "react";
import {RawCreationData} from "@/src/hooks/usePackCreatedByTokenId";


type ClaimState = {
    step: number,
    error: boolean,
    hash?: `0x${string}`,
    sendingToRelayer?: boolean,
    setSendingToRelayer: (sendingToRelayer: boolean) => void,
    owner?: string,
    setOwner: (owner: string) => void,
    privateKey?: string,
    setPrivateKey: (privateKey: string) => void,
    signedMessage?: `0x${string}`,
    setSignedMessage: (signedMessage: `0x${string}`) => void,
    maxRefundValue: bigint,
    setMaxRefundValue: (refundValue: bigint) => void,
    mintedTokenId?: bigint,
    setMintedTokenId: (mintedTokenId: bigint) => void,
    setLoading: (hash?: `0x${string}`) => void,
    packData?:RawCreationData,
    setPackData: (packData: RawCreationData) => void,
    nextStep: () => void,
    previousStep: () => void,
    controls: ReactNode,
    setControls: (controls: ReactNode) => void,
    setChainId: (chainId: number) => void,
    chainId?: number,
    reset: () => void

}

export const useClaimState = create<ClaimState>()((set) => ({
    step: -1,
    error: false,
    hash: undefined,
    controls: null,
    mintedTokenId: undefined,
    maxRefundValue: BigInt(0),
    signedMessage: undefined,
    privateKey: undefined,
    owner: undefined,
    sendingToRelayer: false,
    packData: undefined,
    chainId: undefined,
    setChainId: (chainId) => set((state) => ({chainId})),
    setPackData: (packData) => set((state) => ({packData})),
    setSendingToRelayer: (sendingToRelayer) => set((state) => ({sendingToRelayer})),
    setOwner: (owner) => set((state) => ({owner})),
    setPrivateKey: (privateKey) => set((state) => ({privateKey})),
    setSignedMessage: (signedMessage) => set((state) => ({signedMessage})),
    setMaxRefundValue: (maxRefundValue) => set((state) => ({maxRefundValue})),
    setMintedTokenId: (mintedTokenId) => set((state) => ({mintedTokenId})),
    setLoading: (hash) => set((state) => ({hash})),
    nextStep: () => set((state) => ({step: state.step + 1})),
    previousStep: () => set((state) => ({step: state.step - 1})),
    setControls: (controls) => set((state) => ({controls})),
    reset: () => set((state) => ({step: 0, error: false, hash: undefined, controls: null, mintedTokenId: undefined, signedMessage: undefined, maxRefundValue: BigInt(0)}))
}))
