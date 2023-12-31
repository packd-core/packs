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
  Create2Factory,
  Create2FactoryInterface,
} from "../../../contracts/lib/Create2Factory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "deployed",
        type: "address",
      },
    ],
    name: "Deployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "codeHash",
        type: "bytes32",
      },
    ],
    name: "computeAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "bytecode",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "callbacks",
        type: "bytes[]",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506105a7806100206000396000f3fe60806040526004361061002d5760003560e01c80632276f38314610039578063481286e61461008257600080fd5b3661003457005b600080fd5b34801561004557600080fd5b5061005961005436600461040a565b6100a2565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b34801561008e57600080fd5b5061005961009d3660046104bb565b610195565b6000806100e6888888888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506101a892505050565b905082801561013e5760005b8181101561013c5761012783878784818110610110576101106104dd565b905060200281019061012291906104f3565b6102be565b505080806101349061053a565b9150506100f2565b505b60405173ffffffffffffffffffffffffffffffffffffffff8316815288907fe491e278e37782abe0872fe7c7b549cd7b0713d0c5c1e84a81899a5fdf32087b9060200160405180910390a250979650505050505050565b60006101a1838361038c565b9392505050565b6000834710156101ff5760405162461bcd60e51b815260206004820152601d60248201527f437265617465323a20696e73756666696369656e742062616c616e636500000060448201526064015b60405180910390fd5b81516000036102505760405162461bcd60e51b815260206004820181905260248201527f437265617465323a2062797465636f6465206c656e677468206973207a65726f60448201526064016101f6565b8282516020840186f5905073ffffffffffffffffffffffffffffffffffffffff81166101a15760405162461bcd60e51b815260206004820152601960248201527f437265617465323a204661696c6564206f6e206465706c6f790000000000000060448201526064016101f6565b600060606000808673ffffffffffffffffffffffffffffffffffffffff1686866040516102ec929190610561565b6000604051808303816000865af19150503d8060008114610329576040519150601f19603f3d011682016040523d82523d6000602084013e61032e565b606091505b5091509150816103805760405162461bcd60e51b815260206004820152600860248201527f217375636365737300000000000000000000000000000000000000000000000060448201526064016101f6565b90969095509350505050565b60006101a18383306000604051836040820152846020820152828152600b8101905060ff815360559020949350505050565b60008083601f8401126103d057600080fd5b50813567ffffffffffffffff8111156103e857600080fd5b6020830191508360208260051b850101111561040357600080fd5b9250929050565b6000806000806000806080878903121561042357600080fd5b8635955060208701359450604087013567ffffffffffffffff8082111561044957600080fd5b818901915089601f83011261045d57600080fd5b81358181111561046c57600080fd5b8a602082850101111561047e57600080fd5b60208301965080955050606089013591508082111561049c57600080fd5b506104a989828a016103be565b979a9699509497509295939492505050565b600080604083850312156104ce57600080fd5b50508035926020909101359150565b634e487b7160e01b600052603260045260246000fd5b6000808335601e1984360301811261050a57600080fd5b83018035915067ffffffffffffffff82111561052557600080fd5b60200191503681900382131561040357600080fd5b60006001820161055a57634e487b7160e01b600052601160045260246000fd5b5060010190565b818382376000910190815291905056fea26469706673582212208ef1f2444eab45676b8f55e8995c0b52993843b016016009eb6b0cda3cde4f4764736f6c63430008140033";

type Create2FactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Create2FactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Create2Factory__factory extends ContractFactory {
  constructor(...args: Create2FactoryConstructorParams) {
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
      Create2Factory & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Create2Factory__factory {
    return super.connect(runner) as Create2Factory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Create2FactoryInterface {
    return new Interface(_abi) as Create2FactoryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): Create2Factory {
    return new Contract(address, _abi, runner) as unknown as Create2Factory;
  }
}
