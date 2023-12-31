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
  Multicall3,
  Multicall3Interface,
} from "../../../contracts/lib/Multicall3";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes[]",
        name: "returnData",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call3[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call3Value[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3Value",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBasefee",
    outputs: [
      {
        internalType: "uint256",
        name: "basefee",
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
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [
      {
        internalType: "address",
        name: "coinbase",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "gaslimit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610d92806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e1461022f578063bce38bd71461024a578063c3077fa91461025d578063ee82ac5e1461027057600080fd5b80634d2301cc146101ce57806372425d9d146101f657806382ad56cb1461020957806386d516e81461021c57600080fd5b80633408e470116100c65780633408e47014610173578063399542e9146101865780633e64a696146101a857806342cbb15c146101bb57600080fd5b80630f28c97d146100f8578063174dea711461011a578063252dba421461013a57806327e86d6e1461015b575b600080fd5b34801561010457600080fd5b50425b6040519081526020015b60405180910390f35b61012d610128366004610a20565b61028f565b6040516101119190610b1d565b61014d610148366004610a20565b6104a2565b604051610111929190610b37565b34801561016757600080fd5b50436000190140610107565b34801561017f57600080fd5b5046610107565b610199610194366004610ba1565b61063b565b60405161011193929190610bfb565b3480156101b457600080fd5b5048610107565b3480156101c757600080fd5b5043610107565b3480156101da57600080fd5b506101076101e9366004610c23565b6001600160a01b03163190565b34801561020257600080fd5b5044610107565b61012d610217366004610a20565b610656565b34801561022857600080fd5b5045610107565b34801561023b57600080fd5b50604051418152602001610111565b61012d610258366004610ba1565b6107fd565b61019961026b366004610a20565b6109b5565b34801561027c57600080fd5b5061010761028b366004610c4c565b4090565b60606000828067ffffffffffffffff8111156102ad576102ad610c65565b6040519080825280602002602001820160405280156102f357816020015b6040805180820190915260008152606060208201528152602001906001900390816102cb5790505b5092503660005b8281101561044457600085828151811061031657610316610c7b565b6020026020010151905087878381811061033257610332610c7b565b90506020028101906103449190610c91565b60408101359586019590935061035d6020850185610c23565b6001600160a01b0316816103746060870187610cb1565b3360405160200161038793929190610cf8565b60408051601f19818403018152908290526103a191610d1e565b60006040518083038185875af1925050503d80600081146103de576040519150601f19603f3d011682016040523d82523d6000602084013e6103e3565b606091505b50602080850191909152901515808452908501351761043a5762461bcd60e51b600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b50506001016102fa565b508234146104995760405162461bcd60e51b815260206004820152601a60248201527f4d756c746963616c6c333a2076616c7565206d69736d6174636800000000000060448201526064015b60405180910390fd5b50505092915050565b436060828067ffffffffffffffff8111156104bf576104bf610c65565b6040519080825280602002602001820160405280156104f257816020015b60608152602001906001900390816104dd5790505b5091503660005b8281101561063157600087878381811061051557610515610c7b565b90506020028101906105279190610d30565b92506105366020840184610c23565b6001600160a01b031661054c6020850185610cb1565b3360405160200161055f93929190610cf8565b60408051601f198184030181529082905261057991610d1e565b6000604051808303816000865af19150503d80600081146105b6576040519150601f19603f3d011682016040523d82523d6000602084013e6105bb565b606091505b508684815181106105ce576105ce610c7b565b60209081029190910101529050806106285760405162461bcd60e51b815260206004820152601760248201527f4d756c746963616c6c333a2063616c6c206661696c65640000000000000000006044820152606401610490565b506001016104f9565b5050509250929050565b438040606061064b8686866107fd565b905093509350939050565b6060818067ffffffffffffffff81111561067257610672610c65565b6040519080825280602002602001820160405280156106b857816020015b6040805180820190915260008152606060208201528152602001906001900390816106905790505b5091503660005b828110156104995760008482815181106106db576106db610c7b565b602002602001015190508686838181106106f7576106f7610c7b565b90506020028101906107099190610d46565b92506107186020840184610c23565b6001600160a01b031661072e6040850185610cb1565b3360405160200161074193929190610cf8565b60408051601f198184030181529082905261075b91610d1e565b6000604051808303816000865af19150503d8060008114610798576040519150601f19603f3d011682016040523d82523d6000602084013e61079d565b606091505b5060208084019190915290151580835290840135176107f45762461bcd60e51b600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b506001016106bf565b6060818067ffffffffffffffff81111561081957610819610c65565b60405190808252806020026020018201604052801561085f57816020015b6040805180820190915260008152606060208201528152602001906001900390816108375790505b5091503660005b828110156109ab57600084828151811061088257610882610c7b565b6020026020010151905086868381811061089e5761089e610c7b565b90506020028101906108b09190610d30565b92506108bf6020840184610c23565b6001600160a01b03166108d56020850185610cb1565b336040516020016108e893929190610cf8565b60408051601f198184030181529082905261090291610d1e565b6000604051808303816000865af19150503d806000811461093f576040519150601f19603f3d011682016040523d82523d6000602084013e610944565b606091505b5060208301521515815287156109a25780516109a25760405162461bcd60e51b815260206004820152601760248201527f4d756c746963616c6c333a2063616c6c206661696c65640000000000000000006044820152606401610490565b50600101610866565b5050509392505050565b60008060606109c66001868661063b565b919790965090945092505050565b60008083601f8401126109e657600080fd5b50813567ffffffffffffffff8111156109fe57600080fd5b6020830191508360208260051b8501011115610a1957600080fd5b9250929050565b60008060208385031215610a3357600080fd5b823567ffffffffffffffff811115610a4a57600080fd5b610a56858286016109d4565b90969095509350505050565b60005b83811015610a7d578181015183820152602001610a65565b50506000910152565b60008151808452610a9e816020860160208601610a62565b601f01601f19169290920160200192915050565b600081518084526020808501808196508360051b8101915082860160005b85811015610b1057828403895281518051151585528501516040868601819052610afc81870183610a86565b9a87019a9550505090840190600101610ad0565b5091979650505050505050565b602081526000610b306020830184610ab2565b9392505050565b600060408201848352602060408185015281855180845260608601915060608160051b870101935082870160005b82811015610b9357605f19888703018452610b81868351610a86565b95509284019290840190600101610b65565b509398975050505050505050565b600080600060408486031215610bb657600080fd5b83358015158114610bc657600080fd5b9250602084013567ffffffffffffffff811115610be257600080fd5b610bee868287016109d4565b9497909650939450505050565b838152826020820152606060408201526000610c1a6060830184610ab2565b95945050505050565b600060208284031215610c3557600080fd5b81356001600160a01b0381168114610b3057600080fd5b600060208284031215610c5e57600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b60008235607e19833603018112610ca757600080fd5b9190910192915050565b6000808335601e19843603018112610cc857600080fd5b83018035915067ffffffffffffffff821115610ce357600080fd5b602001915036819003821315610a1957600080fd5b8284823760609190911b6bffffffffffffffffffffffff19169101908152601401919050565b60008251610ca7818460208701610a62565b60008235603e19833603018112610ca757600080fd5b60008235605e19833603018112610ca757600080fdfea26469706673582212200d8c0b07483778b2e79f2ac8adbdff25dbc53e26e12d3e07c5e4fdab1fd2046b64736f6c63430008140033";

type Multicall3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Multicall3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Multicall3__factory extends ContractFactory {
  constructor(...args: Multicall3ConstructorParams) {
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
      Multicall3 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Multicall3__factory {
    return super.connect(runner) as Multicall3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Multicall3Interface {
    return new Interface(_abi) as Multicall3Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): Multicall3 {
    return new Contract(address, _abi, runner) as unknown as Multicall3;
  }
}
