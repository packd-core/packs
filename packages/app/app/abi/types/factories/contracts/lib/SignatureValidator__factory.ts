/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  SignatureValidator,
  SignatureValidatorInterface,
} from "../../../contracts/lib/SignatureValidator";

const _abi = [
  {
    inputs: [],
    name: "InvalidClaimerSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwnerSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "registryChainId",
        type: "uint256",
      },
    ],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STRUCT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101d861003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c80631da20a4f14610045578063655c638414610079575b600080fd5b7fa3717fa533a51a39e4872e53d65d273a14c33445329e77841b81e5c2cf92b7b35b60405190815260200160405180910390f35b610067610087366004610189565b604080518082018252600581527f5041434b4400000000000000000000000000000000000000000000000000000060209182015281518083018352600181527f31000000000000000000000000000000000000000000000000000000000000009082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527fcd7ff7166051adab515fe3a90c9f493131a92f9e18afcd0986046bbaf5dd363c818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015260808101939093523060a0808501919091528251808503909101815260c0909301909152815191012090565b60006020828403121561019b57600080fd5b503591905056fea26469706673582212209164c38a1b560d48b9987c81b1371aade661d43c19362cdc42a9df07d6a65ff464736f6c63430008140033";

type SignatureValidatorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignatureValidatorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignatureValidator__factory extends ContractFactory {
  constructor(...args: SignatureValidatorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      SignatureValidator & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SignatureValidator__factory {
    return super.connect(runner) as SignatureValidator__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignatureValidatorInterface {
    return new Interface(_abi) as SignatureValidatorInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SignatureValidator {
    return new Contract(address, _abi, runner) as unknown as SignatureValidator;
  }
}