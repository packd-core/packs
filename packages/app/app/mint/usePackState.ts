import {create} from 'zustand'
import {ReactNode} from "react";


type PackState = {
    step: number,
    error: boolean,
    hash?: `0x${string}`,
    mintedTokenId?: bigint,
    setMintedTokenId: (mintedTokenId: bigint) => void,
    setLoading: (hash?: `0x${string}`) => void,
    nextStep: () => void,
    previousStep: () => void,
    controls: ReactNode,
    setControls: (controls: ReactNode) => void,
    reset: () => void

}

export const usePackState = create<PackState>()((set) => ({
    step: -1,
    error: false,
    hash: undefined,
    controls: null,
    mintedTokenId: undefined,
    setMintedTokenId: (mintedTokenId) => set((state) => ({mintedTokenId})),
    setLoading: (hash) => set((state) => ({hash})),
    nextStep: () => set((state) => ({step: state.step + 1})),
    previousStep: () => set((state) => {
        if (state.step === 2) {
            return ({step: 0});
        }
        return ({step: state.step - 1});
    }),
    setControls: (controls) => set((state) => ({controls})),
    reset: () => set((state) => ({step: 0, error: false, hash: undefined, controls: null, mintedTokenId: undefined}))
}))
