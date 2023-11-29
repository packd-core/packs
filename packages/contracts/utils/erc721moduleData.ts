import { ethers } from "ethers";

// Common function to encode data
export async function encodeData(types: string[], values: ReadonlyArray<any>) {
  const coder = ethers.AbiCoder.defaultAbiCoder();
  return coder.encode(types, values);
}

export async function generateMintData(data: Array<[string, bigint]>) {
  return encodeData(["tuple(address,uint256)[]"], [data]);
}

export const generateRevokeData = generateMintData;
export const generateClaimData = generateMintData;
