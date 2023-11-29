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
  ERC721Module,
  ERC721ModuleInterface,
} from "../../../contracts/modules/ERC721Module";

const _abi = [
  {
    inputs: [],
    name: "CALL_OPERATION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CALL_VALUE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "additionalData",
        type: "bytes",
      },
    ],
    name: "onCreate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "additionalData",
        type: "bytes",
      },
    ],
    name: "onOpen",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "additionalData",
        type: "bytes",
      },
    ],
    name: "onRevoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506108ce806100206000396000f3fe60806040526004361061005a5760003560e01c8063c56d786e11610043578063c56d786e146100a9578063d3f43c78146100bc578063f37e724e146100e357600080fd5b806315a3966f1461005f5780631d19868814610081575b600080fd5b34801561006b57600080fd5b5061007f61007a366004610541565b610103565b005b34801561008d57600080fd5b50610096600081565b6040519081526020015b60405180910390f35b61007f6100b73660046105b0565b610272565b3480156100c857600080fd5b506100d1600081565b60405160ff90911681526020016100a0565b3480156100ef57600080fd5b5061007f6100fe3660046105b0565b610376565b60006101118284018461067a565b905060005b815181101561026957856001600160a01b031663519454478383815181106101405761014061074e565b602002602001015160000151600089898787815181106101625761016261074e565b60209081029190910181015101516040516001600160a01b039384166024820152929091166044830152606482015260840160408051601f198184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16632142170760e11b1790525160e085901b7fffffffff0000000000000000000000000000000000000000000000000000000016815261020f93929190600090600401610788565b6000604051808303816000875af115801561022e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261025691908101906107dd565b508061026181610871565b915050610116565b50505050505050565b60006102808284018461067a565b905060005b815181101561036e578181815181106102a0576102a061074e565b6020026020010151600001516001600160a01b03166323b872dd33878585815181106102ce576102ce61074e565b60209081029190910181015101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401600060405180830381600087803b15801561034357600080fd5b505af1158015610357573d6000803e3d6000fd5b50505050808061036690610871565b915050610285565b505050505050565b60006103848284018461067a565b905060005b815181101561036e57846001600160a01b031663519454478383815181106103b3576103b361074e565b602002602001015160000151600088338787815181106103d5576103d561074e565b60209081029190910181015101516040516001600160a01b039384166024820152929091166044830152606482015260840160408051601f198184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff16632142170760e11b1790525160e085901b7fffffffff0000000000000000000000000000000000000000000000000000000016815261048293929190600090600401610788565b6000604051808303816000875af11580156104a1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104c991908101906107dd565b50806104d481610871565b915050610389565b80356001600160a01b03811681146104f357600080fd5b919050565b60008083601f84011261050a57600080fd5b50813567ffffffffffffffff81111561052257600080fd5b60208301915083602082850101111561053a57600080fd5b9250929050565b60008060008060006080868803121561055957600080fd5b85359450610569602087016104dc565b9350610577604087016104dc565b9250606086013567ffffffffffffffff81111561059357600080fd5b61059f888289016104f8565b969995985093965092949392505050565b600080600080606085870312156105c657600080fd5b843593506105d6602086016104dc565b9250604085013567ffffffffffffffff8111156105f257600080fd5b6105fe878288016104f8565b95989497509550505050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156106435761064361060a565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156106725761067261060a565b604052919050565b6000602080838503121561068d57600080fd5b823567ffffffffffffffff808211156106a557600080fd5b818501915085601f8301126106b957600080fd5b8135818111156106cb576106cb61060a565b6106d9848260051b01610649565b818152848101925060069190911b8301840190878211156106f957600080fd5b928401925b8184101561074357604084890312156107175760008081fd5b61071f610620565b610728856104dc565b815284860135868201528352604090930192918401916106fe565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b60005b8381101561077f578181015183820152602001610767565b50506000910152565b6001600160a01b038516815283602082015260806040820152600083518060808401526107bc8160a0850160208801610764565b60ff93909316606083015250601f91909101601f19160160a0019392505050565b6000602082840312156107ef57600080fd5b815167ffffffffffffffff8082111561080757600080fd5b818401915084601f83011261081b57600080fd5b81518181111561082d5761082d61060a565b610840601f8201601f1916602001610649565b915080825285602082850101111561085757600080fd5b610868816020840160208601610764565b50949350505050565b60006001820161089157634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212203cf26f02d74d35ea098f3988381490d5ae38c3303669415fc98c4081e620d15b64736f6c63430008140033";

type ERC721ModuleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ModuleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721Module__factory extends ContractFactory {
  constructor(...args: ERC721ModuleConstructorParams) {
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
      ERC721Module & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC721Module__factory {
    return super.connect(runner) as ERC721Module__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721ModuleInterface {
    return new Interface(_abi) as ERC721ModuleInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ERC721Module {
    return new Contract(address, _abi, runner) as unknown as ERC721Module;
  }
}