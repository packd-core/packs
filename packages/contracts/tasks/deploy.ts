import { subtask, task, types } from "hardhat/config";
import { config as baseConfig } from "../scripts/base-config";
import { config as baseGoerliConfig } from "../scripts/base-goerli-config";
import { deployFullSystem } from "../scripts/deploy";
import { chainIds } from "../utils/constants";
import { getSystemConfig } from "../utils/deployConfig";
import { logger } from "../utils/deployUtils";
import { getDeployedAddress } from "../utils/saveAddress";
import { deployOnchainChroniclesNFT } from "../scripts/deploy";
const info = logger("info", "task");

subtask(
  "deploy",
  "Deploy the contracts to the selected chain (defaults to localhost)"
).setAction(async (args, hre) => {
  info("Subtask deploy");
  const systemConfig = getSystemConfig(hre);
  const configs = {
    // HERE ADD EACH DIFFERENT CHAIN ID
    [chainIds.base]: baseConfig,
    [chainIds.baseGoerli]: baseGoerliConfig,
    [chainIds.hardhat]: { externalConfig: undefined },
    [-1]: undefined,
  };

  const config = configs[hre.network.config.chainId ?? -1];
  if (!config) {
    throw new Error(
      `Config for chain ID ${hre.network.config.chainId} not found`
    );
  }

  const signer = await hre.ethers.provider.getSigner();
  const fullSystemDeployed = await deployFullSystem(
    hre,
    signer,
    systemConfig,
    config.externalConfig
  );
  return {
    ...fullSystemDeployed,
  };
});

task("deploy").setAction(async (_, __, runSuper) => {
  return runSuper();
});

task(
  "deploy-dev-env",
  "Deploy all contracts, send ETH  and mint ERC20 to test accounts"
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

    const addresses = {
      erc20MockA: await getDeployedAddress(hre, "ERC20MockA"),
      erc20MockB: await getDeployedAddress(hre, "ERC20MockB"),
      erc721MockA: await getDeployedAddress(hre, "ERC721MockA"),
      erc721MockB: await getDeployedAddress(hre, "ERC721MockB"),
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

task("deploy:onchain-chronicles-nft", "Deploy OnchainChroniclesNFT")
  .addParam("owner", "The owner of the contract", undefined, types.string)
  .setAction(async (args, hre) => {
    if (!args.owner) {
      throw new Error("owner is required");
    }

    info("deploy:onchain-chronicles-nft");
    const signer = await hre.ethers.provider.getSigner();
    const { onchainChroniclesNFT } = await deployOnchainChroniclesNFT(
      hre,
      signer,
      args.owner
    );

    const onchainChroniclesNFTAddress = await onchainChroniclesNFT.getAddress();
    info(`OnchainChroniclesNFT deployed at ${onchainChroniclesNFTAddress}`);
    return {
      onchainChroniclesNFT,
    };
  });
