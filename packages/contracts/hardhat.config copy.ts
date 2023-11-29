import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";
import "hardhat-tracer";

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
    "base-mainnet": {
      chainId: chainIds.base,
      accounts: accounts,
      url: process.env.NODE_URL || "",
    },    
  },
  etherscan: {
    apiKey: "94HC92MFZAAPMCHNKZ2MRPHE4RHPE1KNCC",
},
  sourcify: {
    enabled: false
  }
};

export default config;
