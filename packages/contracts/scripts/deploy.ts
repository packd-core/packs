import { ethers, resolveAddress, type Signer } from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

import {
  AccountGuardian,
  Create2Factory,
  ERC20Mock,
  ERC20Mock__factory,
  ERC20Module,
  ERC721Mock,
  ERC721Mock__factory,
  ERC721Module,
  IERC6551Registry,
  Multicall3,
  PackAccount,
  PackMain,
  PackRegistry,
} from "../types";

import { SystemConfig } from "../utils/deployConfig";
import {
  deployContract,
  deployContractWithCreate2,
  logger,
} from "../utils/deployUtils";

const info = logger("info", "deploy");
export interface MocksDeployed {
  erc20MockA: ERC20Mock;
  erc20MockB: ERC20Mock;
  erc721MockA: ERC721Mock;
  erc721MockB: ERC721Mock;
  registry?: IERC6551Registry;
  multicall3?: Multicall3;
}
export interface ExternalConfig {
  registry: string;
  multicall3: string;
  entryPoint: string;
  accountProxy?: string;
  accountV3Upgradable?: string;
}

export interface SystemDeployed {
  packAccount: PackAccount;
  packMain: PackMain;
  erc20Module: ERC20Module;
  erc721Module: ERC721Module;
}
export interface FullSystemDeployed extends SystemDeployed, MocksDeployed {
  create2Factory: Create2Factory;
}

export async function deployMocks(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  create2Factory: Create2Factory,
): Promise<MocksDeployed> {
  info("Deploying Mocks");
  const deploymentOverrides = {
    gasPrice: hre.ethers.parseUnits("1.0", "gwei"),
  };

  let erc20MockA: ERC20Mock;
  let erc20MockB: ERC20Mock;
  let erc721MockA: ERC721Mock;
  let erc721MockB: ERC721Mock;
  let registry = undefined;
  let multicall3 = undefined;
  // Test mocks

  if (hre.network.name === "hardhat" || hre.network.name === "localhost") {
    // Deploy mocks with create2
    const deployCreate2Options = {
      overrides: deploymentOverrides,
      create2Options: { amount: 0, salt: "test", callbacks: [] },
      waitForBlocks: 0,
    };
    const withSalt = (salt: string) => ({
      ...deployCreate2Options,
      create2Options: { ...deployCreate2Options.create2Options, salt },
    });

    erc20MockA = await deployContractWithCreate2<ERC20Mock, ERC20Mock__factory>(
      hre,
      new ERC20Mock__factory(signer),
      create2Factory,
      "ERC20MockA",
      [],
      withSalt("ERC20MockA"),
    );
    erc20MockB = await deployContractWithCreate2<ERC20Mock, ERC20Mock__factory>(
      hre,
      new ERC20Mock__factory(signer),
      create2Factory,
      "ERC20MockB",
      [],
      withSalt("ERC20MockB"),
    );
    erc721MockA = await deployContractWithCreate2<
      ERC721Mock,
      ERC721Mock__factory
    >(
      hre,
      new ERC721Mock__factory(signer),
      create2Factory,
      "ERC721MockA",
      [],
      withSalt("ERC721MockA"),
    );
    erc721MockB = await deployContractWithCreate2<
      ERC721Mock,
      ERC721Mock__factory
    >(
      hre,
      new ERC721Mock__factory(signer),
      create2Factory,
      "ERC721MockB",
      [],
      withSalt("ERC721MockB"),
    );
    //  Mock external dependencies
    registry = await deployContract<PackRegistry>(
      hre,
      signer,
      "PackRegistry",
      [],
      deploymentOverrides,
    );
    multicall3 = await deployContract<Multicall3>(
      hre,
      signer,
      "Multicall3",
      [],
      deploymentOverrides,
    );
  } else {
    // Deploy mocks without create2
    erc20MockA = await deployContract<ERC20Mock>(
      hre,
      signer,
      "ERC20Mock",
      [],
      deploymentOverrides,
    );
    erc20MockB = await deployContract<ERC20Mock>(
      hre,
      signer,
      "ERC20Mock",
      [],
      deploymentOverrides,
    );
    erc721MockA = await deployContract<ERC721Mock>(
      hre,
      signer,
      "ERC721Mock",
      [],
      deploymentOverrides,
    );
    erc721MockB = await deployContract<ERC721Mock>(
      hre,
      signer,
      "ERC721Mock",
      [],
      deploymentOverrides,
    );
  }

  return {
    erc20MockA,
    erc20MockB,
    erc721MockA,
    erc721MockB,
    registry,
    multicall3,
  };
}
export async function deployFactory(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
): Promise<{ create2Factory: Create2Factory }> {
  info("Deploying deployFactory");
  const deploymentOverrides = {
    // gasPrice: hre.ethers.parseUnits("1.0", "gwei"),
  };

  const create2Factory = await deployContract<Create2Factory>(
    hre,
    signer,
    "Create2Factory",
    [],
    deploymentOverrides,
  );

  return {
    create2Factory,
  };
}
export async function deploySystem(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  systemConfig: SystemConfig,
  externalConfig: ExternalConfig,
): Promise<SystemDeployed> {
  info("Deploying System");
  const deploymentOverrides = {
    gasPrice: hre.ethers.parseUnits("1.0", "gwei"),
  };

  const erc20Module = await deployContract<ERC20Module>(
    hre,
    signer,
    "ERC20Module",
    [],
    deploymentOverrides,
  );
  const erc721Module = await deployContract<ERC721Module>(
    hre,
    signer,
    "ERC721Module",
    [],
    deploymentOverrides,
  );

  // Move to external dependency

  const guardian = await deployContract<AccountGuardian>(
    hre,
    signer,
    "AccountGuardian",
    [await signer.getAddress()],
    deploymentOverrides,
  );
  // mint tokenId 1 during setup for accurate cold call gas measurement
  const packAccount = await deployContract<PackAccount>(
    hre,
    signer,
    "PackAccount",
    [
      externalConfig.entryPoint,
      externalConfig.multicall3,
      externalConfig.registry,
      resolveAddress(guardian.target),
    ],
    deploymentOverrides,
  );
  // TODO - to test full AccountV3Upgradable
  // const upgradableImplementation = await deployContract<AccountV3Upgradable>(
  //   hre,
  //   signer,
  //   "AccountV3Upgradable",
  //   [
  //     "0x0000000000000000000000000000000000000001",
  //     // resolveAddress(entryPoint.target),
  //     resolveAddress(forwarder.target),
  //     resolveAddress(packRegistry.target),
  //     resolveAddress(guardian.target),
  //   ],
  //   deploymentOverrides,
  // );
  // const proxy = await deployContract<AccountProxy>(
  //   hre,
  //   signer,
  //   "AccountProxy",
  //   [
  //     resolveAddress(guardian.target),
  //     resolveAddress(upgradableImplementation.target),
  //   ],
  //   deploymentOverrides,
  // );
  const packMain = await deployContract<PackMain>(
    hre,
    signer,
    "PackMain",
    [
      await signer.getAddress(),
      systemConfig.packConfig.initBaseURI,
      systemConfig.packConfig.name,
      systemConfig.packConfig.symbol,
      externalConfig.registry,
      await packAccount.getAddress(),
      systemConfig.packConfig.registryChainId,
      ethers.encodeBytes32String(systemConfig.packConfig.salt.toString()),
      [await erc20Module.getAddress(), await erc721Module.getAddress()],
    ],
    deploymentOverrides,
  );
  return {
    packAccount,
    packMain,
    erc20Module,
    erc721Module,
  };
}

export async function deployFullSystem(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  systemConfig: SystemConfig,
  externalConfig?: ExternalConfig,
): Promise<FullSystemDeployed> {
  const { create2Factory } = await deployFactory(hre, signer);
  const mocks = await deployMocks(hre, signer, create2Factory);
  let extConfig = externalConfig;
  if (externalConfig === undefined && mocks.registry && mocks.multicall3) {
    // Generate external config from mocks
    extConfig = {
      registry: await mocks.registry.getAddress(),
      multicall3: await mocks.multicall3.getAddress(),
      entryPoint: "0x0000000000000000000000000000000000000001",
    };
  }
  const system = await deploySystem(
    hre,
    signer,
    systemConfig,
    extConfig as ExternalConfig,
  );
  return {
    create2Factory,
    ...mocks,
    ...system,
  };
}
