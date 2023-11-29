import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";
import "hardhat-tracer";

dotenvConfig({ path: __dirname + "/.env" });

import "./tasks";

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
    hardhat: {
      chainId: 31337,
      accounts: {
        mnemonic,
      },
    },
    // Faucet RPC, etc : https://docs.scroll.io/en/developers/developer-quickstart/#hardhat
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts: accounts,
      chainId: 534351,
    },

    //  https://faucet.polygon.technology/
    polygonZkEVMTestnet: {
      url: "https://rpc.public.zkevm-test.net" || "",
      accounts: accounts,
      chainId: 1442,
    },

    // Faucets, RPC, etc: https://windranger-io.notion.site/Developer-Starter-Guide-9e9de7a4e60a49dc97dd786c48ffd455
    mantleTestnet: {
      url: "https://rpc.testnet.mantle.xyz" || "",
      accounts: accounts,
      chainId: 5001,
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: process.env.ETHERSCAN_SCROLL || "", // https://docs.scroll.io/en/developers/verifying-smart-contracts/
      mantleTest: "abc",
      polygonZkEVMTestnet: process.env.ETHERSCAN_POLYGON_ZKEVM || "",
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.dev/",
        },
      },
      {
        network: "mantleTest",
        chainId: 5001,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz",
        },
      },
      {
        network: "polygonZkEVMTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com/",
        },
      },
    ],
  },
};

export default config;
