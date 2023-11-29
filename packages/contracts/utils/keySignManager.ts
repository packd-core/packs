import type { BytesLike, Signer } from "ethers";
import { ethers } from "ethers";

export class KeySignManager {
  private packdMainAddress: string;
  private registryChainId: any;
  private salt: BytesLike;

  constructor(
    registryChainId: number,
    salt: BytesLike,
    packdMainAddress: string,
  ) {
    this.registryChainId = registryChainId;
    this.salt = salt;
    this.packdMainAddress = packdMainAddress;
  }

  setPackdMainAddress(address: string) {
    this.packdMainAddress = address;
  }

  async getTailMessage() {
    return {
      types: ["uint256", "bytes32", "address"],
      values: [this.registryChainId, this.salt, this.packdMainAddress],
    };
  }

  async getMessage(types: string[], values: any[]) {
    const tailMessage = await this.getTailMessage();
    const allTypes = types.concat(tailMessage.types);
    const allValues = values.concat(tailMessage.values);
    return { allTypes, allValues };
  }

  async prepareMessage(types: string[], values: any[]) {
    const { allTypes, allValues } = await this.getMessage(types, values);
    return ethers.solidityPackedKeccak256(allTypes, allValues);
  }

  async generateClaimKey(
    signerOrSignature: Signer | string,
    types: string[],
    values: any[],
  ) {
    const { allTypes, allValues } = await this.getMessage(types, values);
    let signature;

    if (typeof signerOrSignature === "string") {
      signature = signerOrSignature;
    } else if ("signMessage" in signerOrSignature) {
      signature = await signerOrSignature.signMessage(
        ethers.getBytes(ethers.solidityPackedKeccak256(allTypes, allValues)),
      );
    } else {
      throw new Error("Invalid signerOrSignature type");
    }

    const claimPrivateKey = signature.slice(0, 66);
    const claimPublicKey = new ethers.Wallet(claimPrivateKey).address;

    return { claimPrivateKey, claimPublicKey };
  }

  async generateClaimSignature(
    claimPrivateKey: string | Signer,
    types: string[],
    values: any[],
  ) {
    const { allTypes, allValues } = await this.getMessage(types, values);
    const messageToSign = ethers.solidityPackedKeccak256(allTypes, allValues);

    let claimSignature: string;

    if (typeof claimPrivateKey === "string")
      claimSignature = await new ethers.Wallet(claimPrivateKey).signMessage(
        ethers.getBytes(messageToSign),
      );
    else if ("signMessage" in claimPrivateKey)
      claimSignature = await claimPrivateKey.signMessage(
        ethers.getBytes(messageToSign),
      );
    else throw new Error("Invalid claimPrivateKey type");

    return { claimSignature };
  }

  async generateSignTypedData(
    signer: Signer,
    tokenId: number | bigint,
    refundValue: number | bigint,
    maxRefundValue: number | bigint,
    moduleData: Array<any>,
  ) {
    const domain = {
      name: "PACKD",
      version: "1",
      chainId: this.registryChainId,
      verifyingContract: this.packdMainAddress,
    };

    const types = {
      Claim: [
        { name: "tokenId", type: "uint256" },
        { name: "claimer", type: "address" },
        { name: "refundValue", type: "uint256" },
        { name: "maxRefundValue", type: "uint256" },
        { name: "moduleData", type: "bytes32" },
      ],
    };

    const encodedModuleData = KeySignManager.getModuleDataBytes(moduleData);

    const message = {
      tokenId: tokenId,
      claimer: await signer.getAddress(),
      refundValue: refundValue,
      maxRefundValue: maxRefundValue,
      moduleData: encodedModuleData,
    };

    return signer.signTypedData(domain, types, message);
  }

  static getModuleDataBytes(moduleData: Array<any>) {
    const bytesArray = moduleData.map((data) => ethers.getBytes(data));

    const coder = ethers.AbiCoder.defaultAbiCoder();
    const encoded = coder.encode(["bytes[]"], [bytesArray]);

    return ethers.keccak256(encoded);
  }
}
