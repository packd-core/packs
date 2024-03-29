import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";
import "hardhat-tracer";
import "hardhat-gas-reporter";

dotenvConfig({ path: __dirname + "/.env" });

import "./tasks";
import { chainIds } from "./utils/constants";

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
// if (!mnemonic) {
//   throw new Error("Please set your MNEMONIC in a .env file");
// }

const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  typechain: {
    outDir: "types/generated",
    target: "ethers-v6",
  },
  networks: {
    localhost: {
      chainId: chainIds.hardhat,
      accounts: {
        mnemonic,
      },
    },
    hardhat: {
      chainId: chainIds.hardhat,
      accounts: {
        mnemonic,
      },
    },
    // Faucet RPC, etc : https://docs.scroll.io/en/developers/developer-quickstart/#hardhat
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts: accounts,
      chainId: chainIds.scrollSepolia,
    },

    //  https://faucet.polygon.technology/
    polygonZkEVMTestnet: {
      url: "https://rpc.public.zkevm-test.net" || "",
      accounts: accounts,
      chainId: chainIds.polygonZkEVMTestnet,
    },

    // Faucets, RPC, etc: https://windranger-io.notion.site/Developer-Starter-Guide-9e9de7a4e60a49dc97dd786c48ffd455
    mantleTestnet: {
      url: "https://rpc.testnet.mantle.xyz" || "",
      accounts: accounts,
      chainId: chainIds.mantleTestnet,
    },
    "base-mainnet": {
      chainId: chainIds.base,
      accounts: accounts,
      url: process.env.BASE_MAINNET_NODE_URL || "",
    },
    "base-goerli": {
      chainId: chainIds.baseGoerli,
      accounts: accounts,
      url: process.env.BASE_GOERLI_NODE_URL || "",
    },
    blastTestnet: {
      chainId: chainIds.blastTestnet,
      accounts: accounts,
      url: process.env.NODE_URL || "https://sepolia.blast.io",
    },
    blast: {
      chainId: chainIds.blast,
      accounts: accounts,
      url: process.env.NODE_URL || "https://blast.io",
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: process.env.ETHERSCAN_SCROLL || "", // https://docs.scroll.io/en/developers/verifying-smart-contracts/
      mantleTest: "abc",
      polygonZkEVMTestnet: process.env.ETHERSCAN_POLYGON_ZKEVM || "",
      "base-mainnet": process.env.ETHERSCAN_BASE_MAINNET || "",
      "base-goerli": process.env.ETHERSCAN_BASE_GOERLI || "",
      "blastTestnet": process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: chainIds.scrollSepolia,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.dev/",
        },
      },
      {
        network: "mantleTest",
        chainId: chainIds.mantleTestnet,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz",
        },
      },
      {
        network: "polygonZkEVMTestnet",
        chainId: chainIds.polygonZkEVMTestnet,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/",
        },
      },
      {
        network: "base-mainnet",
        chainId: chainIds.base,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/",
        },
      },
      {
        network: "base-goerli",
        chainId: chainIds.baseGoerli,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org/",
        },
      },
      {
        network: "blastTestnet",
        chainId: chainIds.blastTestnet,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/168587773/etherscan",
          browserURL: "https://testnet.blastscan.io"
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
  gasReporter: {
    enabled: true,
  },
};

export default config;
