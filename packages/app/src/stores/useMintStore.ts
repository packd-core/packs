import {create} from 'zustand'
import {Address} from "wagmi";

export type Module = {
    isApproved?: boolean,
    moduleAddress: Address,
    address?: Address,
    type?: 'ERC20' | 'ERC721';
    value?: bigint,
    id?: number,
    isValid?: boolean,
}
export type OfflineModule = {
    symbol: string,
    decimals: number,
    icon?: string,
    name: string,
} & Module

type ClaimKey = {
    private: string,
    public: string,
}

type MintState = {
    eth: bigint
    modules: Module[]
    claimKey: ClaimKey | null
    setEth: (amount: bigint) => void
    addModule: (module: Module) => void
    updateModule: (module: Module) => void
    removeModule: (module: Module) => void
    setApproved: (module: Module) => void
    setClaimKey: (claimKey: ClaimKey) => void
    reset: () => void
}

export const useMintStore = create<MintState>()((set, get) => ({
    eth: BigInt(0),
    setEth: (amount) => set((state) => ({eth: amount})),
    modules: [],
    claimKey: null,
    addModule: (module) => set((state) => {
        const existingModule = state.modules.find(m => m.moduleAddress === module.moduleAddress && m.address === module.address && m.type === module.type);
        module.id = state.modules.length ? (state.modules[state.modules.length - 1].id ?? 0) + 1 : 0;
        if (existingModule && module.type === 'ERC20') {
            return ({});
        }
        if (existingModule && module.type === 'ERC721' && module.value === existingModule.value) {
            return ({});
        }
        return ({modules: [...state.modules, module]});
    }),
    updateModule: (module) => set((state) => ({modules: state.modules.map(m => m.id === module.id ? module : m)})),
    removeModule: (module) => set((state) => ({modules: state.modules.filter(m => m.id !== module.id)})),
    setApproved: (module) => set((state) => ({modules: state.modules.map(m => m === module ? {...m, isApproved: true} : m)})),
    setClaimKey: (claimKey) => set((state) => ({claimKey})),
    reset: () => set((state) => ({eth: BigInt(0), modules: [], claimKey: null}))
}))
