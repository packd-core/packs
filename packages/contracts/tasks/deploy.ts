import { subtask, task, types } from "hardhat/config";
import { config as baseConfig } from "../scripts/base-config";
import { deployFullSystem } from "../scripts/deploy";
import { chainIds } from "../utils/constants";
import { getSystemConfig } from "../utils/deployConfig";
import { logger } from "../utils/deployUtils";
import { getDeployedAddress } from "../utils/saveAddress";
const info = logger("info", "task");

subtask(
  "deploy",
  "Deploy the contracts to the selected chain (defaults to localhost)",
).
setAction(async (args, hre) => {
  info("Subtask deploy");
  const systemConfig = getSystemConfig(hre);
  const configs = {
    // HERE ADD EACH DIFFERENT CHAIN ID
    [chainIds.base]: baseConfig,
    [chainIds.hardhat]: {externalConfig:undefined},
    [-1]: undefined,
};
let config = configs[hre.network.config.chainId??-1];
if (!config) {
    throw new Error(`Config for chain ID ${hre.network.config.chainId} not found`);
}

const signer = await hre.ethers.provider.getSigner();
const fullSystemDeployed = await deployFullSystem(hre, signer, systemConfig, config.externalConfig)
  return {
    ...fullSystemDeployed
  }
});

task("deploy").setAction(async (_, __, runSuper) => {
  return runSuper();
});

task(
  "deploy-dev-env",
  "Deploy all contracts, send ETH  and mint ERC20 to test accounts",
).setAction(async (args, hre) => {
  info("deploy-dev-env");
  await hre.run("deploy", args);
  // Setup 3  test accounts, dao, alice, bob
  await hre.run("fund:account", { account: process.env.ACCOUNT_1 });
});

task("fund:account", "Send ETH, ERC20Mocks, and NFTsMocks to an account")
  .addParam("account", "The account to fund", undefined, types.string)
  .setAction(async (args, hre) => {
    info("fund:account");
    const account = args.account;
    const isLocal =
      hre.network.name === "hardhat" || hre.network.name === "localhost";

    const addresses = {
      erc20MockA: isLocal
        ? "0x3365b5466fa1B621eAEe8c013De6595C53396278"
        : await getDeployedAddress(hre, "ERC20MockA"),
      erc20MockB: isLocal
        ? "0xc2BdF6a06582849da3539754EfE186B23bB4F10F"
        : await getDeployedAddress(hre, "ERC20MockB"),
      erc721MockA: isLocal
        ? "0xfc2061C2A7eC8820Ef27c70BE05b67bD867468c8"
        : await getDeployedAddress(hre, "ERC721MockA"),
      erc721MockB: isLocal
        ? "0x059987287631386316293f23EDC6E79BC059aaAC"
        : await getDeployedAddress(hre, "ERC721MockB"),
    };

    let tokenId = 0;
    for (let i = 1; i <= 3; i++) {
      if (account && account.length === 42) {
        await hre.run("send:eth", { account: account, amount: 1 });
        await hre.run("mint:erc20", {
          account: account,
          tokenaddress: addresses.erc20MockA,
          amount: 1000,
        });
        await hre.run("mint:erc20", {
          account: account,
          tokenaddress: addresses.erc20MockB,
          amount: 1000,
        });

        await hre.run("mint:erc721", {
          account: account,
          tokenaddress: addresses.erc721MockA,
          tokenid: tokenId++,
        });
        await hre.run("mint:erc721", {
          account: account,
          tokenaddress: addresses.erc721MockB,
          tokenid: tokenId++,
        });
      }
    }
  });
