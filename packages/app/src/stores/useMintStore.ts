import {create} from 'zustand'
import {Address} from "wagmi";

export type Module = {
    isApproved?: boolean,
    moduleAddress: Address,
    address: Address,
    type?: 'ERC20' | 'ERC721';
    value: bigint
}
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
        if (existingModule && module.type === 'ERC20') {
            existingModule.value += module.value;
            return ({modules: [...state.modules]});
        }
        return ({modules: [...state.modules, module]});
    }),
    removeModule: (module) => set((state) => ({modules: state.modules.filter(m => m !== module)})),
    setApproved: (module) => set((state) => ({modules: state.modules.map(m => m === module ? {...m, isApproved: true} : m)})),
    setClaimKey: (claimKey) => set((state) => ({claimKey})),
    reset: () => set((state) => ({eth: BigInt(0), modules: [], claimKey: null}))
}))
