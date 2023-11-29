/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface ERC20ModuleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "CALL_OPERATION"
      | "CALL_VALUE"
      | "onCreate"
      | "onOpen"
      | "onRevoke"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "CALL_OPERATION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "CALL_VALUE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onCreate",
    values: [BigNumberish, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onOpen",
    values: [BigNumberish, AddressLike, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "onRevoke",
    values: [BigNumberish, AddressLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "CALL_OPERATION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "CALL_VALUE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onCreate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onOpen", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onRevoke", data: BytesLike): Result;
}

export interface ERC20Module extends BaseContract {
  connect(runner?: ContractRunner | null): ERC20Module;
  waitForDeployment(): Promise<this>;

  interface: ERC20ModuleInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  CALL_OPERATION: TypedContractMethod<[], [bigint], "view">;

  CALL_VALUE: TypedContractMethod<[], [bigint], "view">;

  onCreate: TypedContractMethod<
    [arg0: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "payable"
  >;

  onOpen: TypedContractMethod<
    [
      arg0: BigNumberish,
      account: AddressLike,
      claimer: AddressLike,
      additionalData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  onRevoke: TypedContractMethod<
    [arg0: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "CALL_OPERATION"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "CALL_VALUE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "onCreate"
  ): TypedContractMethod<
    [arg0: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "onOpen"
  ): TypedContractMethod<
    [
      arg0: BigNumberish,
      account: AddressLike,
      claimer: AddressLike,
      additionalData: BytesLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "onRevoke"
  ): TypedContractMethod<
    [arg0: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "nonpayable"
  >;

  filters: {};
}
