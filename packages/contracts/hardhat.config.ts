import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: __dirname + "/.env" });

import "./tasks";

import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const accounts =
  process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: {
        mnemonic: process.env.MNEMONIC,
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
    },

    // Faucets, RPC, etc: https://windranger-io.notion.site/Developer-Starter-Guide-9e9de7a4e60a49dc97dd786c48ffd455
    mantleTestnet: {
      url: "https://rpc.testnet.mantle.xyz/" || "",
      accounts: accounts,
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: "abc", // https://docs.scroll.io/en/developers/verifying-smart-contracts/
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://sepolia-blockscout.scroll.io/api",
          browserURL: "https://sepolia-blockscout.scroll.io/",
        },
      },
    ],
  },
};

export default config;
