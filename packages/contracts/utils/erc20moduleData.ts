import { ethers } from "ethers";

// Common function to encode data
export async function encodeData(types: string[], values: any[]) {
  const coder = ethers.AbiCoder.defaultAbiCoder();
  return coder.encode(types, values);
}

export async function generateMintData(data: Array<[string, bigint]>) {
  return encodeData(["tuple(address,uint256)[]"], [data]);
}

export async function generateRevokeData(tokenAddresses: string[]) {
  return encodeData(["address[]"], [tokenAddresses]);
}

export const generateClaimData = generateRevokeData;
