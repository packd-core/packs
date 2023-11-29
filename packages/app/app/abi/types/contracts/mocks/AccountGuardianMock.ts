/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
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

export interface AccountGuardianMockInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptOwnership"
      | "isTrustedExecutor"
      | "isTrustedImplementation"
      | "owner"
      | "pendingOwner"
      | "renounceOwnership"
      | "setTrustedExecutor"
      | "setTrustedImplementation"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "OwnershipTransferStarted"
      | "OwnershipTransferred"
      | "TrustedExecutorUpdated"
      | "TrustedImplementationUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedExecutor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isTrustedImplementation",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setTrustedExecutor",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setTrustedImplementation",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedExecutor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTrustedExecutor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTrustedImplementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferStartedEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TrustedExecutorUpdatedEvent {
  export type InputTuple = [executor: AddressLike, trusted: boolean];
  export type OutputTuple = [executor: string, trusted: boolean];
  export interface OutputObject {
    executor: string;
    trusted: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TrustedImplementationUpdatedEvent {
  export type InputTuple = [implementation: AddressLike, trusted: boolean];
  export type OutputTuple = [implementation: string, trusted: boolean];
  export interface OutputObject {
    implementation: string;
    trusted: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface AccountGuardianMock extends BaseContract {
  connect(runner?: ContractRunner | null): AccountGuardianMock;
  waitForDeployment(): Promise<this>;

  interface: AccountGuardianMockInterface;

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

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  isTrustedExecutor: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  isTrustedImplementation: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pendingOwner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setTrustedExecutor: TypedContractMethod<
    [executor: AddressLike, trusted: boolean],
    [void],
    "nonpayable"
  >;

  setTrustedImplementation: TypedContractMethod<
    [implementation: AddressLike, trusted: boolean],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "isTrustedExecutor"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isTrustedImplementation"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pendingOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setTrustedExecutor"
  ): TypedContractMethod<
    [executor: AddressLike, trusted: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setTrustedImplementation"
  ): TypedContractMethod<
    [implementation: AddressLike, trusted: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferStarted"
  ): TypedContractEvent<
    OwnershipTransferStartedEvent.InputTuple,
    OwnershipTransferStartedEvent.OutputTuple,
    OwnershipTransferStartedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "TrustedExecutorUpdated"
  ): TypedContractEvent<
    TrustedExecutorUpdatedEvent.InputTuple,
    TrustedExecutorUpdatedEvent.OutputTuple,
    TrustedExecutorUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "TrustedImplementationUpdated"
  ): TypedContractEvent<
    TrustedImplementationUpdatedEvent.InputTuple,
    TrustedImplementationUpdatedEvent.OutputTuple,
    TrustedImplementationUpdatedEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferStarted(address,address)": TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;
    OwnershipTransferStarted: TypedContractEvent<
      OwnershipTransferStartedEvent.InputTuple,
      OwnershipTransferStartedEvent.OutputTuple,
      OwnershipTransferStartedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "TrustedExecutorUpdated(address,bool)": TypedContractEvent<
      TrustedExecutorUpdatedEvent.InputTuple,
      TrustedExecutorUpdatedEvent.OutputTuple,
      TrustedExecutorUpdatedEvent.OutputObject
    >;
    TrustedExecutorUpdated: TypedContractEvent<
      TrustedExecutorUpdatedEvent.InputTuple,
      TrustedExecutorUpdatedEvent.OutputTuple,
      TrustedExecutorUpdatedEvent.OutputObject
    >;

    "TrustedImplementationUpdated(address,bool)": TypedContractEvent<
      TrustedImplementationUpdatedEvent.InputTuple,
      TrustedImplementationUpdatedEvent.OutputTuple,
      TrustedImplementationUpdatedEvent.OutputObject
    >;
    TrustedImplementationUpdated: TypedContractEvent<
      TrustedImplementationUpdatedEvent.InputTuple,
      TrustedImplementationUpdatedEvent.OutputTuple,
      TrustedImplementationUpdatedEvent.OutputObject
    >;
  };
}