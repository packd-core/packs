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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IPackModuleInterface extends Interface {
  getFunction(
    nameOrSignature: "onCreate" | "onOpen" | "onRevoke"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Created" | "Opened" | "Revoked"
  ): EventFragment;

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

  decodeFunctionResult(functionFragment: "onCreate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onOpen", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onRevoke", data: BytesLike): Result;
}

export namespace CreatedEvent {
  export type InputTuple = [tokenId: BigNumberish, account: AddressLike];
  export type OutputTuple = [tokenId: bigint, account: string];
  export interface OutputObject {
    tokenId: bigint;
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OpenedEvent {
  export type InputTuple = [tokenId: BigNumberish, account: AddressLike];
  export type OutputTuple = [tokenId: bigint, account: string];
  export interface OutputObject {
    tokenId: bigint;
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RevokedEvent {
  export type InputTuple = [tokenId: BigNumberish, account: AddressLike];
  export type OutputTuple = [tokenId: bigint, account: string];
  export interface OutputObject {
    tokenId: bigint;
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IPackModule extends BaseContract {
  connect(runner?: ContractRunner | null): IPackModule;
  waitForDeployment(): Promise<this>;

  interface: IPackModuleInterface;

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

  onCreate: TypedContractMethod<
    [tokenId: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "payable"
  >;

  onOpen: TypedContractMethod<
    [
      tokenId: BigNumberish,
      account: AddressLike,
      claimer: AddressLike,
      additionalData: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  onRevoke: TypedContractMethod<
    [tokenId: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "onCreate"
  ): TypedContractMethod<
    [tokenId: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "onOpen"
  ): TypedContractMethod<
    [
      tokenId: BigNumberish,
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
    [tokenId: BigNumberish, account: AddressLike, additionalData: BytesLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "Created"
  ): TypedContractEvent<
    CreatedEvent.InputTuple,
    CreatedEvent.OutputTuple,
    CreatedEvent.OutputObject
  >;
  getEvent(
    key: "Opened"
  ): TypedContractEvent<
    OpenedEvent.InputTuple,
    OpenedEvent.OutputTuple,
    OpenedEvent.OutputObject
  >;
  getEvent(
    key: "Revoked"
  ): TypedContractEvent<
    RevokedEvent.InputTuple,
    RevokedEvent.OutputTuple,
    RevokedEvent.OutputObject
  >;

  filters: {
    "Created(uint256,address)": TypedContractEvent<
      CreatedEvent.InputTuple,
      CreatedEvent.OutputTuple,
      CreatedEvent.OutputObject
    >;
    Created: TypedContractEvent<
      CreatedEvent.InputTuple,
      CreatedEvent.OutputTuple,
      CreatedEvent.OutputObject
    >;

    "Opened(uint256,address)": TypedContractEvent<
      OpenedEvent.InputTuple,
      OpenedEvent.OutputTuple,
      OpenedEvent.OutputObject
    >;
    Opened: TypedContractEvent<
      OpenedEvent.InputTuple,
      OpenedEvent.OutputTuple,
      OpenedEvent.OutputObject
    >;

    "Revoked(uint256,address)": TypedContractEvent<
      RevokedEvent.InputTuple,
      RevokedEvent.OutputTuple,
      RevokedEvent.OutputObject
    >;
    Revoked: TypedContractEvent<
      RevokedEvent.InputTuple,
      RevokedEvent.OutputTuple,
      RevokedEvent.OutputObject
    >;
  };
}