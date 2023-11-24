import fs from "fs/promises";
import type { BaseContract } from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
export interface DeployedAddresses {
  [key: number]: {
    [key: string]: string;
  };
}

export const saveAddress = async (
  hre: HardhatRuntimeEnvironment,
  contract: BaseContract,
  name: string,
) => {
  const chainId = hre.network.config.chainId ?? 31337;

  const mainFolder = "../app/app";
  const abi = JSON.stringify(
    JSON.parse(contract.interface.formatJson()),
    undefined,
    2,
  ); // hack to format the json
  const address = await contract.getAddress();

  await fs.writeFile(`${mainFolder}/abi/${name}.json`, abi);

  const addressesFile = `${mainFolder}/abi/addresses.json`;
  let currentContent = "{}";
  try {
    currentContent = (await fs.readFile(addressesFile, "utf-8")) || "{}";
  } catch (error) {
    console.log(error);
  }

  const currentRoot: DeployedAddresses = JSON.parse(currentContent);
  const currentChainSection = currentRoot[chainId];
  const addresses = {
    ...currentRoot,
    [chainId]: {
      ...currentChainSection,
      [name]: address,
    },
  };

  await fs.writeFile(addressesFile, JSON.stringify(addresses, undefined, 2));
};

export const getDeployedAddress = async (
  hre: HardhatRuntimeEnvironment,
  name: string,
): Promise<string | null> => {
  const chainId = hre.network.config.chainId ?? 31337;
  const addressesFile = "../app/app/abi/addresses.json";
  let currentContent = "{}";
  try {
    currentContent = (await fs.readFile(addressesFile, "utf-8")) || "{}";
  } catch (error) {
    console.log(error);
  }

  const currentRoot: DeployedAddresses = JSON.parse(currentContent);
  if (!currentRoot[chainId]) {
    return null;
  }
  const currentChainSection = currentRoot[chainId];
  if (!currentChainSection[name]) {
    return null;
  }
  const address = currentChainSection[name];

  return address;
};
