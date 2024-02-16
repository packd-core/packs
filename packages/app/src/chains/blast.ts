import { Chain } from 'viem'

export const blastRpc = 'https://sepolia.blast.io'

export const blast = {
    id: 168587773,
    name: 'Blast Sepolia',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: [blastRpc] },
        public: { http: [blastRpc] },
    },
    blockExplorers: {
        default: { name: 'Blastscan', url: 'https://testnet.blastscan.io' },
    },
    network: '',
} as const satisfies Chain
