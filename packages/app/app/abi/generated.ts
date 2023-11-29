import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccountGuardian
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accountGuardianABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'executor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'trusted', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TrustedExecutorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'trusted', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TrustedImplementationUpdated',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isTrustedExecutor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isTrustedImplementation',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'trusted', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTrustedExecutor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'trusted', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTrustedImplementation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccountGuardianMock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accountGuardianMockABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'executor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'trusted', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TrustedExecutorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'trusted', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TrustedImplementationUpdated',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isTrustedExecutor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isTrustedImplementation',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'trusted', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTrustedExecutor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'trusted', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTrustedImplementation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccountProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accountProxyABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_guardian', internalType: 'address', type: 'address' },
      {
        name: '_initialImplementation',
        internalType: 'address',
        type: 'address',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'AlreadyInitialized' },
  { type: 'error', inputs: [], name: 'InvalidImplementation' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccountV3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accountV3ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'entryPoint_', internalType: 'address', type: 'address' },
      { name: 'multicallForwarder', internalType: 'address', type: 'address' },
      { name: 'erc6551Registry', internalType: 'address', type: 'address' },
      { name: '_guardian', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'AccountLocked' },
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'ExceedsMaxLockTime' },
  { type: 'error', inputs: [], name: 'InvalidAccountProof' },
  { type: 'error', inputs: [], name: 'InvalidERC6551Registry' },
  { type: 'error', inputs: [], name: 'InvalidEntryPoint' },
  { type: 'error', inputs: [], name: 'InvalidInput' },
  { type: 'error', inputs: [], name: 'InvalidMulticallForwarder' },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'OwnershipCycle' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockedUntil',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LockUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'selector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'OverrideUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'hasPermission',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'PermissionUpdated',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entryPoint',
    outputs: [
      { name: '', internalType: 'contract IEntryPoint', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc6551Registry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'operations',
        internalType: 'struct BatchExecutor.Operation[]',
        type: 'tuple[]',
        components: [
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'operation', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    name: 'executeBatch',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
      {
        name: 'proof',
        internalType: 'struct NestedAccountExecutor.ERC6551AccountInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'tokenContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'executeNested',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'forwarder', internalType: 'address', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigner',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_lockedUntil', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lock',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lockedUntil',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'overrides',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'permissions',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
      { name: 'implementations', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'setOverrides',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'callers', internalType: 'address[]', type: 'address[]' },
      { name: '_permissions', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'setPermissions',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'userOpHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'missingAccountFunds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateUserOp',
    outputs: [
      { name: 'validationData', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccountV3Upgradable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accountV3UpgradableABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'entryPoint_', internalType: 'address', type: 'address' },
      { name: 'multicallForwarder', internalType: 'address', type: 'address' },
      { name: 'erc6551Registry', internalType: 'address', type: 'address' },
      { name: 'guardian', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'AccountLocked' },
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'ExceedsMaxLockTime' },
  { type: 'error', inputs: [], name: 'InvalidAccountProof' },
  { type: 'error', inputs: [], name: 'InvalidERC6551Registry' },
  { type: 'error', inputs: [], name: 'InvalidEntryPoint' },
  { type: 'error', inputs: [], name: 'InvalidImplementation' },
  { type: 'error', inputs: [], name: 'InvalidInput' },
  { type: 'error', inputs: [], name: 'InvalidMulticallForwarder' },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'OwnershipCycle' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockedUntil',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LockUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'selector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'OverrideUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'hasPermission',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'PermissionUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entryPoint',
    outputs: [
      { name: '', internalType: 'contract IEntryPoint', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc6551Registry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'operations',
        internalType: 'struct BatchExecutor.Operation[]',
        type: 'tuple[]',
        components: [
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'operation', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    name: 'executeBatch',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
      {
        name: 'proof',
        internalType: 'struct NestedAccountExecutor.ERC6551AccountInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'tokenContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'executeNested',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'forwarder', internalType: 'address', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigner',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_lockedUntil', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lock',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lockedUntil',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'overrides',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'permissions',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
      { name: 'implementations', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'setOverrides',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'callers', internalType: 'address[]', type: 'address[]' },
      { name: '_permissions', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'setPermissions',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'userOpHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'missingAccountFunds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateUserOp',
    outputs: [
      { name: 'validationData', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BaseAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const baseAccountABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entryPoint',
    outputs: [
      { name: '', internalType: 'contract IEntryPoint', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'userOpHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'missingAccountFunds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateUserOp',
    outputs: [
      { name: 'validationData', internalType: 'uint256', type: 'uint256' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BaseExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const baseExecutorABI = [
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BatchExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const batchExecutorABI = [
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'operations',
        internalType: 'struct BatchExecutor.Operation[]',
        type: 'tuple[]',
        components: [
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'operation', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    name: 'executeBatch',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create2Factory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const create2FactoryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'deployed',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Deployed',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'codeHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'computeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
      { name: 'callbacks', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'deploy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Dummy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dummyABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155Holder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155HolderABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155ReceiverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1967Upgrade
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1967UpgradeABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Mock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20MockABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Module
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ModuleABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_OPERATION',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_VALUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onCreate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'claimer', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onOpen',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onRevoke',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC2771Context
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc2771ContextABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'forwarder', internalType: 'address', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC4337Account
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc4337AccountABI = [
  { type: 'error', inputs: [], name: 'InvalidEntryPoint' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entryPoint',
    outputs: [
      { name: '', internalType: 'contract IEntryPoint', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'userOpHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'missingAccountFunds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateUserOp',
    outputs: [
      { name: 'validationData', internalType: 'uint256', type: 'uint256' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC6551Account
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc6551AccountABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigner',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC6551Executor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc6551ExecutorABI = [
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721EnumerableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Holder
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721HolderABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Mock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721MockABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Module
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ModuleABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_OPERATION',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_VALUE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onCreate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'claimer', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onOpen',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onRevoke',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAccountABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'userOpHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'missingAccountFunds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateUserOp',
    outputs: [
      { name: 'validationData', internalType: 'uint256', type: 'uint256' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccountGuardian
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAccountGuardianABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'defaultImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'isTrustedExecutor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'isTrustedImplementation',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'executor', internalType: 'address', type: 'address' },
      { name: 'trusted', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTrustedExecutor',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'trusted', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTrustedImplementation',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAggregator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAggregatorABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'userOps',
        internalType: 'struct UserOperation[]',
        type: 'tuple[]',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregateSignatures',
    outputs: [
      { name: 'aggregatedSignature', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'userOps',
        internalType: 'struct UserOperation[]',
        type: 'tuple[]',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'validateSignatures',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'validateUserOpSignature',
    outputs: [{ name: 'sigForUserOp', internalType: 'bytes', type: 'bytes' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBeacon
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBeaconABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ReceiverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1271
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1271ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1822Proxiable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1822ProxiableABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1967
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1967ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6551Account
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6551AccountABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'context', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigner',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6551Executable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6551ExecutableABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6551Registry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6551RegistryABI = [
  { type: 'error', inputs: [], name: 'AccountCreationFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'salt',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ERC6551AccountCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'account',
    outputs: [{ name: 'account', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [{ name: 'account', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721EnumerableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IEntryPoint
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iEntryPointABI = [
  {
    type: 'error',
    inputs: [
      { name: 'preOpGas', internalType: 'uint256', type: 'uint256' },
      { name: 'paid', internalType: 'uint256', type: 'uint256' },
      { name: 'validAfter', internalType: 'uint48', type: 'uint48' },
      { name: 'validUntil', internalType: 'uint48', type: 'uint48' },
      { name: 'targetSuccess', internalType: 'bool', type: 'bool' },
      { name: 'targetResult', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'ExecutionResult',
  },
  {
    type: 'error',
    inputs: [
      { name: 'opIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'reason', internalType: 'string', type: 'string' },
    ],
    name: 'FailedOp',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'SenderAddressResult',
  },
  {
    type: 'error',
    inputs: [{ name: 'aggregator', internalType: 'address', type: 'address' }],
    name: 'SignatureValidationFailed',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'returnInfo',
        internalType: 'struct IEntryPoint.ReturnInfo',
        type: 'tuple',
        components: [
          { name: 'preOpGas', internalType: 'uint256', type: 'uint256' },
          { name: 'prefund', internalType: 'uint256', type: 'uint256' },
          { name: 'sigFailed', internalType: 'bool', type: 'bool' },
          { name: 'validAfter', internalType: 'uint48', type: 'uint48' },
          { name: 'validUntil', internalType: 'uint48', type: 'uint48' },
          { name: 'paymasterContext', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: 'senderInfo',
        internalType: 'struct IStakeManager.StakeInfo',
        type: 'tuple',
        components: [
          { name: 'stake', internalType: 'uint256', type: 'uint256' },
          { name: 'unstakeDelaySec', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'factoryInfo',
        internalType: 'struct IStakeManager.StakeInfo',
        type: 'tuple',
        components: [
          { name: 'stake', internalType: 'uint256', type: 'uint256' },
          { name: 'unstakeDelaySec', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'paymasterInfo',
        internalType: 'struct IStakeManager.StakeInfo',
        type: 'tuple',
        components: [
          { name: 'stake', internalType: 'uint256', type: 'uint256' },
          { name: 'unstakeDelaySec', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'ValidationResult',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'returnInfo',
        internalType: 'struct IEntryPoint.ReturnInfo',
        type: 'tuple',
        components: [
          { name: 'preOpGas', internalType: 'uint256', type: 'uint256' },
          { name: 'prefund', internalType: 'uint256', type: 'uint256' },
          { name: 'sigFailed', internalType: 'bool', type: 'bool' },
          { name: 'validAfter', internalType: 'uint48', type: 'uint48' },
          { name: 'validUntil', internalType: 'uint48', type: 'uint48' },
          { name: 'paymasterContext', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: 'senderInfo',
        internalType: 'struct IStakeManager.StakeInfo',
        type: 'tuple',
        components: [
          { name: 'stake', internalType: 'uint256', type: 'uint256' },
          { name: 'unstakeDelaySec', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'factoryInfo',
        internalType: 'struct IStakeManager.StakeInfo',
        type: 'tuple',
        components: [
          { name: 'stake', internalType: 'uint256', type: 'uint256' },
          { name: 'unstakeDelaySec', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'paymasterInfo',
        internalType: 'struct IStakeManager.StakeInfo',
        type: 'tuple',
        components: [
          { name: 'stake', internalType: 'uint256', type: 'uint256' },
          { name: 'unstakeDelaySec', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'aggregatorInfo',
        internalType: 'struct IEntryPoint.AggregatorStakeInfo',
        type: 'tuple',
        components: [
          { name: 'aggregator', internalType: 'address', type: 'address' },
          {
            name: 'stakeInfo',
            internalType: 'struct IStakeManager.StakeInfo',
            type: 'tuple',
            components: [
              { name: 'stake', internalType: 'uint256', type: 'uint256' },
              {
                name: 'unstakeDelaySec',
                internalType: 'uint256',
                type: 'uint256',
              },
            ],
          },
        ],
      },
    ],
    name: 'ValidationResultWithAggregation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'userOpHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'factory',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'paymaster',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AccountDeployed',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'BeforeExecution' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'totalDeposit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'aggregator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'SignatureAggregatorChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'totalStaked',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'unstakeDelaySec',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeLocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'withdrawTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeUnlocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'withdrawAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'userOpHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'paymaster',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'success', internalType: 'bool', type: 'bool', indexed: false },
      {
        name: 'actualGasCost',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'actualGasUsed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UserOperationEvent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'userOpHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'revertReason',
        internalType: 'bytes',
        type: 'bytes',
        indexed: false,
      },
    ],
    name: 'UserOperationRevertReason',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'withdrawAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_unstakeDelaySec', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'addStake',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'depositTo',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'getDepositInfo',
    outputs: [
      {
        name: 'info',
        internalType: 'struct IStakeManager.DepositInfo',
        type: 'tuple',
        components: [
          { name: 'deposit', internalType: 'uint112', type: 'uint112' },
          { name: 'staked', internalType: 'bool', type: 'bool' },
          { name: 'stake', internalType: 'uint112', type: 'uint112' },
          { name: 'unstakeDelaySec', internalType: 'uint32', type: 'uint32' },
          { name: 'withdrawTime', internalType: 'uint48', type: 'uint48' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'uint192', type: 'uint192' },
    ],
    name: 'getNonce',
    outputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'initCode', internalType: 'bytes', type: 'bytes' }],
    name: 'getSenderAddress',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'getUserOpHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'opsPerAggregator',
        internalType: 'struct IEntryPoint.UserOpsPerAggregator[]',
        type: 'tuple[]',
        components: [
          {
            name: 'userOps',
            internalType: 'struct UserOperation[]',
            type: 'tuple[]',
            components: [
              { name: 'sender', internalType: 'address', type: 'address' },
              { name: 'nonce', internalType: 'uint256', type: 'uint256' },
              { name: 'initCode', internalType: 'bytes', type: 'bytes' },
              { name: 'callData', internalType: 'bytes', type: 'bytes' },
              {
                name: 'callGasLimit',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'verificationGasLimit',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'preVerificationGas',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'maxFeePerGas',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'maxPriorityFeePerGas',
                internalType: 'uint256',
                type: 'uint256',
              },
              {
                name: 'paymasterAndData',
                internalType: 'bytes',
                type: 'bytes',
              },
              { name: 'signature', internalType: 'bytes', type: 'bytes' },
            ],
          },
          {
            name: 'aggregator',
            internalType: 'contract IAggregator',
            type: 'address',
          },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'beneficiary', internalType: 'address payable', type: 'address' },
    ],
    name: 'handleAggregatedOps',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'ops',
        internalType: 'struct UserOperation[]',
        type: 'tuple[]',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'beneficiary', internalType: 'address payable', type: 'address' },
    ],
    name: 'handleOps',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'key', internalType: 'uint192', type: 'uint192' }],
    name: 'incrementNonce',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'op',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'targetCallData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'simulateHandleOp',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'simulateValidation',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unlockStake',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'withdrawAddress',
        internalType: 'address payable',
        type: 'address',
      },
    ],
    name: 'withdrawStake',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'withdrawAddress',
        internalType: 'address payable',
        type: 'address',
      },
      { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawTo',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INonceManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iNonceManagerABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'key', internalType: 'uint192', type: 'uint192' },
    ],
    name: 'getNonce',
    outputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'key', internalType: 'uint192', type: 'uint192' }],
    name: 'incrementNonce',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPackModule
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPackModuleABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onCreate',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'claimer', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onOpen',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'additionalData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onRevoke',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISandboxExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSandboxExecutorABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IStakeManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iStakeManagerABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'totalDeposit',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'totalStaked',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'unstakeDelaySec',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeLocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'withdrawTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeUnlocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'withdrawAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'StakeWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'withdrawAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawn',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_unstakeDelaySec', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'addStake',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'depositTo',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'getDepositInfo',
    outputs: [
      {
        name: 'info',
        internalType: 'struct IStakeManager.DepositInfo',
        type: 'tuple',
        components: [
          { name: 'deposit', internalType: 'uint112', type: 'uint112' },
          { name: 'staked', internalType: 'bool', type: 'bool' },
          { name: 'stake', internalType: 'uint112', type: 'uint112' },
          { name: 'unstakeDelaySec', internalType: 'uint32', type: 'uint32' },
          { name: 'withdrawTime', internalType: 'uint48', type: 'uint48' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'unlockStake',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'withdrawAddress',
        internalType: 'address payable',
        type: 'address',
      },
    ],
    name: 'withdrawStake',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'withdrawAddress',
        internalType: 'address payable',
        type: 'address',
      },
      { name: 'withdrawAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawTo',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LibSandbox
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const libSandboxABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'footer',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'header',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lockable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lockableABI = [
  { type: 'error', inputs: [], name: 'ExceedsMaxLockTime' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockedUntil',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LockUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_lockedUntil', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lock',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lockedUntil',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Multicall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multicall3ABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct Multicall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct Multicall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct Multicall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct Multicall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct Multicall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct Multicall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct Multicall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct Multicall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct Multicall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct Multicall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct Multicall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NestedAccountExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nestedAccountExecutorABI = [
  { type: 'error', inputs: [], name: 'AccountLocked' },
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'InvalidAccountProof' },
  { type: 'error', inputs: [], name: 'InvalidERC6551Registry' },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc6551Registry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
      {
        name: 'proof',
        internalType: 'struct NestedAccountExecutor.ERC6551AccountInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'tokenContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'executeNested',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Overridable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const overridableABI = [
  { type: 'error', inputs: [], name: 'InvalidInput' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'selector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'OverrideUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'overrides',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
      { name: 'implementations', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'setOverrides',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable2Step
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownable2StepABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackAccount
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packAccountABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '__entryPoint', internalType: 'address', type: 'address' },
      { name: '_multicallForwarder', internalType: 'address', type: 'address' },
      { name: '_erc6551Registry', internalType: 'address', type: 'address' },
      { name: '_guardian', internalType: 'address', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'AccountLocked' },
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'ExceedsMaxLockTime' },
  { type: 'error', inputs: [], name: 'InvalidAccountProof' },
  { type: 'error', inputs: [], name: 'InvalidERC6551Registry' },
  { type: 'error', inputs: [], name: 'InvalidEntryPoint' },
  { type: 'error', inputs: [], name: 'InvalidInput' },
  { type: 'error', inputs: [], name: 'InvalidMulticallForwarder' },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  { type: 'error', inputs: [], name: 'OwnershipCycle' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lockedUntil',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LockUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'selector',
        internalType: 'bytes4',
        type: 'bytes4',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'OverrideUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'hasPermission',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'PermissionUpdated',
  },
  { stateMutability: 'payable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'entryPoint',
    outputs: [
      { name: '', internalType: 'contract IEntryPoint', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc6551Registry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'operations',
        internalType: 'struct BatchExecutor.Operation[]',
        type: 'tuple[]',
        components: [
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'operation', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    name: 'executeBatch',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
      {
        name: 'proof',
        internalType: 'struct NestedAccountExecutor.ERC6551AccountInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'tokenContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'executeNested',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'isLocked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'forwarder', internalType: 'address', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSigner',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_lockedUntil', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lock',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lockedUntil',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'overrides',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'permissions',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
      { name: 'implementations', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'setOverrides',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'callers', internalType: 'address[]', type: 'address[]' },
      { name: '_permissions', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'setPermissions',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'userOp',
        internalType: 'struct UserOperation',
        type: 'tuple',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'initCode', internalType: 'bytes', type: 'bytes' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
          { name: 'callGasLimit', internalType: 'uint256', type: 'uint256' },
          {
            name: 'verificationGasLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'preVerificationGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'maxFeePerGas', internalType: 'uint256', type: 'uint256' },
          {
            name: 'maxPriorityFeePerGas',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'paymasterAndData', internalType: 'bytes', type: 'bytes' },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      { name: 'userOpHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'missingAccountFunds', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateUserOp',
    outputs: [
      { name: 'validationData', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackMain
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packMainABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'initialOwner_', internalType: 'address', type: 'address' },
      { name: 'baseTokenURI_', internalType: 'string', type: 'string' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      { name: 'registry_', internalType: 'address', type: 'address' },
      { name: 'implementation_', internalType: 'address', type: 'address' },
      { name: 'registryChainId_', internalType: 'uint256', type: 'uint256' },
      { name: 'salt_', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'modulesWhitelist_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
  },
  { type: 'error', inputs: [], name: 'EtherTransferFailed' },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidClaimerSignature' },
  { type: 'error', inputs: [], name: 'InvalidEthValue' },
  {
    type: 'error',
    inputs: [
      { name: 'modulesLength', internalType: 'uint256', type: 'uint256' },
      { name: 'moduleDataLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidLengthOfData',
  },
  { type: 'error', inputs: [], name: 'InvalidOwnerSignature' },
  { type: 'error', inputs: [], name: 'InvalidRefundValue' },
  {
    type: 'error',
    inputs: [{ name: 'modules', internalType: 'address', type: 'address' }],
    name: 'ModulesNotWhitelisted',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'OnlyOwnerOf',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenNotInExpectedState',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'modules',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
      {
        name: 'moduleData',
        internalType: 'bytes[]',
        type: 'bytes[]',
        indexed: false,
      },
    ],
    name: 'PackCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'claimer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PackOpened',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PackRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'CALL_OPERATION',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'account',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'accountNonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'claimPublicKey',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'creationBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'modulesWhitelist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'data',
        internalType: 'struct ClaimData',
        type: 'tuple',
        components: [
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'sigOwner', internalType: 'bytes', type: 'bytes' },
          { name: 'claimer', internalType: 'address', type: 'address' },
          { name: 'sigClaimer', internalType: 'bytes', type: 'bytes' },
          { name: 'refundValue', internalType: 'uint256', type: 'uint256' },
          { name: 'maxRefundValue', internalType: 'uint256', type: 'uint256' },
          { name: 'moduleData', internalType: 'bytes[]', type: 'bytes[]' },
        ],
      },
    ],
    name: 'open',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to_', internalType: 'address', type: 'address' },
      { name: 'claimPublicKey_', internalType: 'address', type: 'address' },
      { name: 'modules', internalType: 'address[]', type: 'address[]' },
      { name: 'moduleData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'pack',
    outputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'newAccount', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'packModules',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packState',
    outputs: [
      { name: '', internalType: 'enum PackNFT.PackState', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packStateURIs',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registry',
    outputs: [
      { name: '', internalType: 'contract IERC6551Registry', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'registryChainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'tokenId_', internalType: 'uint256', type: 'uint256' },
      { name: 'moduleData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'revoke',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'salt',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'modules', internalType: 'address[]', type: 'address[]' },
      { name: 'value', internalType: 'bool', type: 'bool' },
    ],
    name: 'setModulesWhitelist',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packNftABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'baseTokenURI_', internalType: 'string', type: 'string' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'creationBlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packState',
    outputs: [
      { name: '', internalType: 'enum PackNFT.PackState', type: 'uint8' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'packStateURIs',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PackRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const packRegistryABI = [
  { type: 'error', inputs: [], name: 'AccountCreationFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'salt',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'chainId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'tokenContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'ERC6551AccountCreated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'account',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenContract', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAccount',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Permissioned
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const permissionedABI = [
  { type: 'error', inputs: [], name: 'InvalidInput' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'hasPermission',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
    ],
    name: 'PermissionUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'permissions',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'callers', internalType: 'address[]', type: 'address[]' },
      { name: '_permissions', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'setPermissions',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Proxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const proxyABI = [
  { stateMutability: 'payable', type: 'fallback' },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SandboxExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sandboxExecutorABI = [
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Signatory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const signatoryABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SignatureValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const signatureValidatorABI = [
  { type: 'error', inputs: [], name: 'InvalidClaimerSignature' },
  { type: 'error', inputs: [], name: 'InvalidOwnerSignature' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'registryChainId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'STRUCT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenboundExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenboundExecutorABI = [
  { type: 'error', inputs: [], name: 'AccountLocked' },
  { type: 'error', inputs: [], name: 'ContractCreationFailed' },
  { type: 'error', inputs: [], name: 'InvalidAccountProof' },
  { type: 'error', inputs: [], name: 'InvalidERC6551Registry' },
  { type: 'error', inputs: [], name: 'InvalidMulticallForwarder' },
  { type: 'error', inputs: [], name: 'InvalidOperation' },
  { type: 'error', inputs: [], name: 'NotAuthorized' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'erc6551Registry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'operations',
        internalType: 'struct BatchExecutor.Operation[]',
        type: 'tuple[]',
        components: [
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'operation', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
    name: 'executeBatch',
    outputs: [{ name: '', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
      {
        name: 'proof',
        internalType: 'struct NestedAccountExecutor.ERC6551AccountInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
          { name: 'tokenContract', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'executeNested',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcall',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extcreate2',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'forwarder', internalType: 'address', type: 'address' }],
    name: 'isTrustedForwarder',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UUPSUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uupsUpgradeableABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
    ],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianABI}__.
 */
export function useAccountGuardianRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof accountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianABI,
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"isTrustedExecutor"`.
 */
export function useAccountGuardianIsTrustedExecutor<
  TFunctionName extends 'isTrustedExecutor',
  TSelectData = ReadContractResult<typeof accountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianABI,
    functionName: 'isTrustedExecutor',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"isTrustedImplementation"`.
 */
export function useAccountGuardianIsTrustedImplementation<
  TFunctionName extends 'isTrustedImplementation',
  TSelectData = ReadContractResult<typeof accountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianABI,
    functionName: 'isTrustedImplementation',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"owner"`.
 */
export function useAccountGuardianOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof accountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useAccountGuardianPendingOwner<
  TFunctionName extends 'pendingOwner',
  TSelectData = ReadContractResult<typeof accountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianABI,
    functionName: 'pendingOwner',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianABI}__.
 */
export function useAccountGuardianWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof accountGuardianABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof accountGuardianABI, TFunctionName, TMode>({
    abi: accountGuardianABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useAccountGuardianAcceptOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianABI,
          'acceptOwnership'
        >['request']['abi'],
        'acceptOwnership',
        TMode
      > & { functionName?: 'acceptOwnership' }
    : UseContractWriteConfig<
        typeof accountGuardianABI,
        'acceptOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof accountGuardianABI, 'acceptOwnership', TMode>({
    abi: accountGuardianABI,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useAccountGuardianRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof accountGuardianABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianABI,
    'renounceOwnership',
    TMode
  >({
    abi: accountGuardianABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"setTrustedExecutor"`.
 */
export function useAccountGuardianSetTrustedExecutor<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianABI,
          'setTrustedExecutor'
        >['request']['abi'],
        'setTrustedExecutor',
        TMode
      > & { functionName?: 'setTrustedExecutor' }
    : UseContractWriteConfig<
        typeof accountGuardianABI,
        'setTrustedExecutor',
        TMode
      > & {
        abi?: never
        functionName?: 'setTrustedExecutor'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianABI,
    'setTrustedExecutor',
    TMode
  >({
    abi: accountGuardianABI,
    functionName: 'setTrustedExecutor',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"setTrustedImplementation"`.
 */
export function useAccountGuardianSetTrustedImplementation<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianABI,
          'setTrustedImplementation'
        >['request']['abi'],
        'setTrustedImplementation',
        TMode
      > & { functionName?: 'setTrustedImplementation' }
    : UseContractWriteConfig<
        typeof accountGuardianABI,
        'setTrustedImplementation',
        TMode
      > & {
        abi?: never
        functionName?: 'setTrustedImplementation'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianABI,
    'setTrustedImplementation',
    TMode
  >({
    abi: accountGuardianABI,
    functionName: 'setTrustedImplementation',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useAccountGuardianTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof accountGuardianABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianABI,
    'transferOwnership',
    TMode
  >({
    abi: accountGuardianABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianABI}__.
 */
export function usePrepareAccountGuardianWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountGuardianABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountGuardianABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareAccountGuardianAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountGuardianABI, 'acceptOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianABI,
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianABI,
    'acceptOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareAccountGuardianRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianABI,
      'renounceOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"setTrustedExecutor"`.
 */
export function usePrepareAccountGuardianSetTrustedExecutor(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianABI,
      'setTrustedExecutor'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianABI,
    functionName: 'setTrustedExecutor',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianABI,
    'setTrustedExecutor'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"setTrustedImplementation"`.
 */
export function usePrepareAccountGuardianSetTrustedImplementation(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianABI,
      'setTrustedImplementation'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianABI,
    functionName: 'setTrustedImplementation',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianABI,
    'setTrustedImplementation'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareAccountGuardianTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianABI,
      'transferOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianABI}__.
 */
export function useAccountGuardianEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof accountGuardianABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianABI,
    ...config,
  } as UseContractEventConfig<typeof accountGuardianABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianABI}__ and `eventName` set to `"OwnershipTransferStarted"`.
 */
export function useAccountGuardianOwnershipTransferStartedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof accountGuardianABI,
      'OwnershipTransferStarted'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianABI,
    eventName: 'OwnershipTransferStarted',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianABI,
    'OwnershipTransferStarted'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useAccountGuardianOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof accountGuardianABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianABI}__ and `eventName` set to `"TrustedExecutorUpdated"`.
 */
export function useAccountGuardianTrustedExecutorUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountGuardianABI, 'TrustedExecutorUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianABI,
    eventName: 'TrustedExecutorUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianABI,
    'TrustedExecutorUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianABI}__ and `eventName` set to `"TrustedImplementationUpdated"`.
 */
export function useAccountGuardianTrustedImplementationUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof accountGuardianABI,
      'TrustedImplementationUpdated'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianABI,
    eventName: 'TrustedImplementationUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianABI,
    'TrustedImplementationUpdated'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianMockABI}__.
 */
export function useAccountGuardianMockRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof accountGuardianMockABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianMockABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianMockABI,
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianMockABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"isTrustedExecutor"`.
 */
export function useAccountGuardianMockIsTrustedExecutor<
  TFunctionName extends 'isTrustedExecutor',
  TSelectData = ReadContractResult<
    typeof accountGuardianMockABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianMockABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianMockABI,
    functionName: 'isTrustedExecutor',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianMockABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"isTrustedImplementation"`.
 */
export function useAccountGuardianMockIsTrustedImplementation<
  TFunctionName extends 'isTrustedImplementation',
  TSelectData = ReadContractResult<
    typeof accountGuardianMockABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianMockABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianMockABI,
    functionName: 'isTrustedImplementation',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianMockABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"owner"`.
 */
export function useAccountGuardianMockOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<
    typeof accountGuardianMockABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianMockABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianMockABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianMockABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useAccountGuardianMockPendingOwner<
  TFunctionName extends 'pendingOwner',
  TSelectData = ReadContractResult<
    typeof accountGuardianMockABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountGuardianMockABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountGuardianMockABI,
    functionName: 'pendingOwner',
    ...config,
  } as UseContractReadConfig<
    typeof accountGuardianMockABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__.
 */
export function useAccountGuardianMockWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianMockABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof accountGuardianMockABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof accountGuardianMockABI, TFunctionName, TMode>({
    abi: accountGuardianMockABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useAccountGuardianMockAcceptOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianMockABI,
          'acceptOwnership'
        >['request']['abi'],
        'acceptOwnership',
        TMode
      > & { functionName?: 'acceptOwnership' }
    : UseContractWriteConfig<
        typeof accountGuardianMockABI,
        'acceptOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianMockABI,
    'acceptOwnership',
    TMode
  >({
    abi: accountGuardianMockABI,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useAccountGuardianMockRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianMockABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof accountGuardianMockABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianMockABI,
    'renounceOwnership',
    TMode
  >({
    abi: accountGuardianMockABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"setTrustedExecutor"`.
 */
export function useAccountGuardianMockSetTrustedExecutor<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianMockABI,
          'setTrustedExecutor'
        >['request']['abi'],
        'setTrustedExecutor',
        TMode
      > & { functionName?: 'setTrustedExecutor' }
    : UseContractWriteConfig<
        typeof accountGuardianMockABI,
        'setTrustedExecutor',
        TMode
      > & {
        abi?: never
        functionName?: 'setTrustedExecutor'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianMockABI,
    'setTrustedExecutor',
    TMode
  >({
    abi: accountGuardianMockABI,
    functionName: 'setTrustedExecutor',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"setTrustedImplementation"`.
 */
export function useAccountGuardianMockSetTrustedImplementation<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianMockABI,
          'setTrustedImplementation'
        >['request']['abi'],
        'setTrustedImplementation',
        TMode
      > & { functionName?: 'setTrustedImplementation' }
    : UseContractWriteConfig<
        typeof accountGuardianMockABI,
        'setTrustedImplementation',
        TMode
      > & {
        abi?: never
        functionName?: 'setTrustedImplementation'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianMockABI,
    'setTrustedImplementation',
    TMode
  >({
    abi: accountGuardianMockABI,
    functionName: 'setTrustedImplementation',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useAccountGuardianMockTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountGuardianMockABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof accountGuardianMockABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountGuardianMockABI,
    'transferOwnership',
    TMode
  >({
    abi: accountGuardianMockABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__.
 */
export function usePrepareAccountGuardianMockWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountGuardianMockABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianMockABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianMockABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareAccountGuardianMockAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianMockABI,
      'acceptOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianMockABI,
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianMockABI,
    'acceptOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareAccountGuardianMockRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianMockABI,
      'renounceOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianMockABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianMockABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"setTrustedExecutor"`.
 */
export function usePrepareAccountGuardianMockSetTrustedExecutor(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianMockABI,
      'setTrustedExecutor'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianMockABI,
    functionName: 'setTrustedExecutor',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianMockABI,
    'setTrustedExecutor'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"setTrustedImplementation"`.
 */
export function usePrepareAccountGuardianMockSetTrustedImplementation(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianMockABI,
      'setTrustedImplementation'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianMockABI,
    functionName: 'setTrustedImplementation',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianMockABI,
    'setTrustedImplementation'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountGuardianMockABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareAccountGuardianMockTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountGuardianMockABI,
      'transferOwnership'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountGuardianMockABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountGuardianMockABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianMockABI}__.
 */
export function useAccountGuardianMockEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof accountGuardianMockABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianMockABI,
    ...config,
  } as UseContractEventConfig<typeof accountGuardianMockABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianMockABI}__ and `eventName` set to `"OwnershipTransferStarted"`.
 */
export function useAccountGuardianMockOwnershipTransferStartedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof accountGuardianMockABI,
      'OwnershipTransferStarted'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianMockABI,
    eventName: 'OwnershipTransferStarted',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianMockABI,
    'OwnershipTransferStarted'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianMockABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useAccountGuardianMockOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<
      typeof accountGuardianMockABI,
      'OwnershipTransferred'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianMockABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianMockABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianMockABI}__ and `eventName` set to `"TrustedExecutorUpdated"`.
 */
export function useAccountGuardianMockTrustedExecutorUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof accountGuardianMockABI,
      'TrustedExecutorUpdated'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianMockABI,
    eventName: 'TrustedExecutorUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianMockABI,
    'TrustedExecutorUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountGuardianMockABI}__ and `eventName` set to `"TrustedImplementationUpdated"`.
 */
export function useAccountGuardianMockTrustedImplementationUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof accountGuardianMockABI,
      'TrustedImplementationUpdated'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountGuardianMockABI,
    eventName: 'TrustedImplementationUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof accountGuardianMockABI,
    'TrustedImplementationUpdated'
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountProxyABI}__.
 */
export function useAccountProxyWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountProxyABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof accountProxyABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof accountProxyABI, TFunctionName, TMode>({
    abi: accountProxyABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountProxyABI}__ and `functionName` set to `"initialize"`.
 */
export function useAccountProxyInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountProxyABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof accountProxyABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof accountProxyABI, 'initialize', TMode>({
    abi: accountProxyABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountProxyABI}__.
 */
export function usePrepareAccountProxyWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountProxyABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountProxyABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountProxyABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountProxyABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareAccountProxyInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountProxyABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountProxyABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountProxyABI, 'initialize'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__.
 */
export function useAccountProxyEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__ and `eventName` set to `"AdminChanged"`.
 */
export function useAccountProxyAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, 'AdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__ and `eventName` set to `"BeaconUpgraded"`.
 */
export function useAccountProxyBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, 'BeaconUpgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountProxyABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useAccountProxyUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountProxyABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountProxyABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof accountProxyABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__.
 */
export function useAccountV3Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"entryPoint"`.
 */
export function useAccountV3EntryPoint<
  TFunctionName extends 'entryPoint',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'entryPoint',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"erc6551Registry"`.
 */
export function useAccountV3Erc6551Registry<
  TFunctionName extends 'erc6551Registry',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'erc6551Registry',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"extsload"`.
 */
export function useAccountV3Extsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"getNonce"`.
 */
export function useAccountV3GetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'getNonce',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"isLocked"`.
 */
export function useAccountV3IsLocked<
  TFunctionName extends 'isLocked',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'isLocked',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"isTrustedForwarder"`.
 */
export function useAccountV3IsTrustedForwarder<
  TFunctionName extends 'isTrustedForwarder',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'isTrustedForwarder',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function useAccountV3IsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"isValidSigner"`.
 */
export function useAccountV3IsValidSigner<
  TFunctionName extends 'isValidSigner',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'isValidSigner',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"lockedUntil"`.
 */
export function useAccountV3LockedUntil<
  TFunctionName extends 'lockedUntil',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'lockedUntil',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"overrides"`.
 */
export function useAccountV3Overrides<
  TFunctionName extends 'overrides',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'overrides',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"owner"`.
 */
export function useAccountV3Owner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"permissions"`.
 */
export function useAccountV3Permissions<
  TFunctionName extends 'permissions',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'permissions',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"state"`.
 */
export function useAccountV3State<
  TFunctionName extends 'state',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'state',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useAccountV3SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"token"`.
 */
export function useAccountV3Token<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof accountV3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3ABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof accountV3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__.
 */
export function useAccountV3Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof accountV3ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, TFunctionName, TMode>({
    abi: accountV3ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"execute"`.
 */
export function useAccountV3Execute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof accountV3ABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'execute', TMode>({
    abi: accountV3ABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"executeBatch"`.
 */
export function useAccountV3ExecuteBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'executeBatch'
        >['request']['abi'],
        'executeBatch',
        TMode
      > & { functionName?: 'executeBatch' }
    : UseContractWriteConfig<typeof accountV3ABI, 'executeBatch', TMode> & {
        abi?: never
        functionName?: 'executeBatch'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'executeBatch', TMode>({
    abi: accountV3ABI,
    functionName: 'executeBatch',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"executeNested"`.
 */
export function useAccountV3ExecuteNested<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'executeNested'
        >['request']['abi'],
        'executeNested',
        TMode
      > & { functionName?: 'executeNested' }
    : UseContractWriteConfig<typeof accountV3ABI, 'executeNested', TMode> & {
        abi?: never
        functionName?: 'executeNested'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'executeNested', TMode>({
    abi: accountV3ABI,
    functionName: 'executeNested',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"extcall"`.
 */
export function useAccountV3Extcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof accountV3ABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'extcall', TMode>({
    abi: accountV3ABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"extcreate"`.
 */
export function useAccountV3Extcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<typeof accountV3ABI, 'extcreate', TMode> & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'extcreate', TMode>({
    abi: accountV3ABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useAccountV3Extcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<typeof accountV3ABI, 'extcreate2', TMode> & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'extcreate2', TMode>({
    abi: accountV3ABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"lock"`.
 */
export function useAccountV3Lock<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'lock'
        >['request']['abi'],
        'lock',
        TMode
      > & { functionName?: 'lock' }
    : UseContractWriteConfig<typeof accountV3ABI, 'lock', TMode> & {
        abi?: never
        functionName?: 'lock'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'lock', TMode>({
    abi: accountV3ABI,
    functionName: 'lock',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function useAccountV3OnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof accountV3ABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'onERC1155BatchReceived', TMode>(
    {
      abi: accountV3ABI,
      functionName: 'onERC1155BatchReceived',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function useAccountV3OnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof accountV3ABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'onERC1155Received', TMode>({
    abi: accountV3ABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useAccountV3OnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<typeof accountV3ABI, 'onERC721Received', TMode> & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'onERC721Received', TMode>({
    abi: accountV3ABI,
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"setOverrides"`.
 */
export function useAccountV3SetOverrides<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'setOverrides'
        >['request']['abi'],
        'setOverrides',
        TMode
      > & { functionName?: 'setOverrides' }
    : UseContractWriteConfig<typeof accountV3ABI, 'setOverrides', TMode> & {
        abi?: never
        functionName?: 'setOverrides'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'setOverrides', TMode>({
    abi: accountV3ABI,
    functionName: 'setOverrides',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"setPermissions"`.
 */
export function useAccountV3SetPermissions<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'setPermissions'
        >['request']['abi'],
        'setPermissions',
        TMode
      > & { functionName?: 'setPermissions' }
    : UseContractWriteConfig<typeof accountV3ABI, 'setPermissions', TMode> & {
        abi?: never
        functionName?: 'setPermissions'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'setPermissions', TMode>({
    abi: accountV3ABI,
    functionName: 'setPermissions',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function useAccountV3ValidateUserOp<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3ABI,
          'validateUserOp'
        >['request']['abi'],
        'validateUserOp',
        TMode
      > & { functionName?: 'validateUserOp' }
    : UseContractWriteConfig<typeof accountV3ABI, 'validateUserOp', TMode> & {
        abi?: never
        functionName?: 'validateUserOp'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3ABI, 'validateUserOp', TMode>({
    abi: accountV3ABI,
    functionName: 'validateUserOp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__.
 */
export function usePrepareAccountV3Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareAccountV3Execute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'execute'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"executeBatch"`.
 */
export function usePrepareAccountV3ExecuteBatch(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'executeBatch'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'executeBatch',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'executeBatch'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"executeNested"`.
 */
export function usePrepareAccountV3ExecuteNested(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'executeNested'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'executeNested',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'executeNested'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareAccountV3Extcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareAccountV3Extcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareAccountV3Extcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'extcreate2'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"lock"`.
 */
export function usePrepareAccountV3Lock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'lock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'lock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'lock'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePrepareAccountV3OnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3ABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3ABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePrepareAccountV3OnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'onERC1155Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'onERC1155Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareAccountV3OnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'onERC721Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'onERC721Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"setOverrides"`.
 */
export function usePrepareAccountV3SetOverrides(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'setOverrides'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'setOverrides',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'setOverrides'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"setPermissions"`.
 */
export function usePrepareAccountV3SetPermissions(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'setPermissions'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'setPermissions',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'setPermissions'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3ABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function usePrepareAccountV3ValidateUserOp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3ABI, 'validateUserOp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3ABI,
    functionName: 'validateUserOp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3ABI, 'validateUserOp'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3ABI}__.
 */
export function useAccountV3Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof accountV3ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3ABI,
    ...config,
  } as UseContractEventConfig<typeof accountV3ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3ABI}__ and `eventName` set to `"LockUpdated"`.
 */
export function useAccountV3LockUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3ABI, 'LockUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3ABI,
    eventName: 'LockUpdated',
    ...config,
  } as UseContractEventConfig<typeof accountV3ABI, 'LockUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3ABI}__ and `eventName` set to `"OverrideUpdated"`.
 */
export function useAccountV3OverrideUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3ABI, 'OverrideUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3ABI,
    eventName: 'OverrideUpdated',
    ...config,
  } as UseContractEventConfig<typeof accountV3ABI, 'OverrideUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3ABI}__ and `eventName` set to `"PermissionUpdated"`.
 */
export function useAccountV3PermissionUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3ABI, 'PermissionUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3ABI,
    eventName: 'PermissionUpdated',
    ...config,
  } as UseContractEventConfig<typeof accountV3ABI, 'PermissionUpdated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__.
 */
export function useAccountV3UpgradableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"entryPoint"`.
 */
export function useAccountV3UpgradableEntryPoint<
  TFunctionName extends 'entryPoint',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'entryPoint',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"erc6551Registry"`.
 */
export function useAccountV3UpgradableErc6551Registry<
  TFunctionName extends 'erc6551Registry',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'erc6551Registry',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"extsload"`.
 */
export function useAccountV3UpgradableExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"getNonce"`.
 */
export function useAccountV3UpgradableGetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'getNonce',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"isLocked"`.
 */
export function useAccountV3UpgradableIsLocked<
  TFunctionName extends 'isLocked',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'isLocked',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"isTrustedForwarder"`.
 */
export function useAccountV3UpgradableIsTrustedForwarder<
  TFunctionName extends 'isTrustedForwarder',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'isTrustedForwarder',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function useAccountV3UpgradableIsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"isValidSigner"`.
 */
export function useAccountV3UpgradableIsValidSigner<
  TFunctionName extends 'isValidSigner',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'isValidSigner',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"lockedUntil"`.
 */
export function useAccountV3UpgradableLockedUntil<
  TFunctionName extends 'lockedUntil',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'lockedUntil',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"overrides"`.
 */
export function useAccountV3UpgradableOverrides<
  TFunctionName extends 'overrides',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'overrides',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"owner"`.
 */
export function useAccountV3UpgradableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"permissions"`.
 */
export function useAccountV3UpgradablePermissions<
  TFunctionName extends 'permissions',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'permissions',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"proxiableUUID"`.
 */
export function useAccountV3UpgradableProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"state"`.
 */
export function useAccountV3UpgradableState<
  TFunctionName extends 'state',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'state',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useAccountV3UpgradableSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"token"`.
 */
export function useAccountV3UpgradableToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<
    typeof accountV3UpgradableABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof accountV3UpgradableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: accountV3UpgradableABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<
    typeof accountV3UpgradableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__.
 */
export function useAccountV3UpgradableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, TFunctionName, TMode>({
    abi: accountV3UpgradableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"execute"`.
 */
export function useAccountV3UpgradableExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'execute',
        TMode
      > & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'execute', TMode>({
    abi: accountV3UpgradableABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"executeBatch"`.
 */
export function useAccountV3UpgradableExecuteBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'executeBatch'
        >['request']['abi'],
        'executeBatch',
        TMode
      > & { functionName?: 'executeBatch' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'executeBatch',
        TMode
      > & {
        abi?: never
        functionName?: 'executeBatch'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'executeBatch', TMode>(
    {
      abi: accountV3UpgradableABI,
      functionName: 'executeBatch',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"executeNested"`.
 */
export function useAccountV3UpgradableExecuteNested<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'executeNested'
        >['request']['abi'],
        'executeNested',
        TMode
      > & { functionName?: 'executeNested' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'executeNested',
        TMode
      > & {
        abi?: never
        functionName?: 'executeNested'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountV3UpgradableABI,
    'executeNested',
    TMode
  >({
    abi: accountV3UpgradableABI,
    functionName: 'executeNested',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"extcall"`.
 */
export function useAccountV3UpgradableExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'extcall',
        TMode
      > & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'extcall', TMode>({
    abi: accountV3UpgradableABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"extcreate"`.
 */
export function useAccountV3UpgradableExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'extcreate',
        TMode
      > & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'extcreate', TMode>({
    abi: accountV3UpgradableABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useAccountV3UpgradableExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'extcreate2',
        TMode
      > & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'extcreate2', TMode>({
    abi: accountV3UpgradableABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"lock"`.
 */
export function useAccountV3UpgradableLock<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'lock'
        >['request']['abi'],
        'lock',
        TMode
      > & { functionName?: 'lock' }
    : UseContractWriteConfig<typeof accountV3UpgradableABI, 'lock', TMode> & {
        abi?: never
        functionName?: 'lock'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'lock', TMode>({
    abi: accountV3UpgradableABI,
    functionName: 'lock',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function useAccountV3UpgradableOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountV3UpgradableABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: accountV3UpgradableABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function useAccountV3UpgradableOnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountV3UpgradableABI,
    'onERC1155Received',
    TMode
  >({
    abi: accountV3UpgradableABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useAccountV3UpgradableOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'onERC721Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountV3UpgradableABI,
    'onERC721Received',
    TMode
  >({
    abi: accountV3UpgradableABI,
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"setOverrides"`.
 */
export function useAccountV3UpgradableSetOverrides<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'setOverrides'
        >['request']['abi'],
        'setOverrides',
        TMode
      > & { functionName?: 'setOverrides' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'setOverrides',
        TMode
      > & {
        abi?: never
        functionName?: 'setOverrides'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'setOverrides', TMode>(
    {
      abi: accountV3UpgradableABI,
      functionName: 'setOverrides',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"setPermissions"`.
 */
export function useAccountV3UpgradableSetPermissions<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'setPermissions'
        >['request']['abi'],
        'setPermissions',
        TMode
      > & { functionName?: 'setPermissions' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'setPermissions',
        TMode
      > & {
        abi?: never
        functionName?: 'setPermissions'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountV3UpgradableABI,
    'setPermissions',
    TMode
  >({
    abi: accountV3UpgradableABI,
    functionName: 'setPermissions',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"upgradeTo"`.
 */
export function useAccountV3UpgradableUpgradeTo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'upgradeTo'
        >['request']['abi'],
        'upgradeTo',
        TMode
      > & { functionName?: 'upgradeTo' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'upgradeTo',
        TMode
      > & {
        abi?: never
        functionName?: 'upgradeTo'
      } = {} as any,
) {
  return useContractWrite<typeof accountV3UpgradableABI, 'upgradeTo', TMode>({
    abi: accountV3UpgradableABI,
    functionName: 'upgradeTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"upgradeToAndCall"`.
 */
export function useAccountV3UpgradableUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & { functionName?: 'upgradeToAndCall' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'upgradeToAndCall',
        TMode
      > & {
        abi?: never
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountV3UpgradableABI,
    'upgradeToAndCall',
    TMode
  >({
    abi: accountV3UpgradableABI,
    functionName: 'upgradeToAndCall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function useAccountV3UpgradableValidateUserOp<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof accountV3UpgradableABI,
          'validateUserOp'
        >['request']['abi'],
        'validateUserOp',
        TMode
      > & { functionName?: 'validateUserOp' }
    : UseContractWriteConfig<
        typeof accountV3UpgradableABI,
        'validateUserOp',
        TMode
      > & {
        abi?: never
        functionName?: 'validateUserOp'
      } = {} as any,
) {
  return useContractWrite<
    typeof accountV3UpgradableABI,
    'validateUserOp',
    TMode
  >({
    abi: accountV3UpgradableABI,
    functionName: 'validateUserOp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__.
 */
export function usePrepareAccountV3UpgradableWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareAccountV3UpgradableExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'execute'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"executeBatch"`.
 */
export function usePrepareAccountV3UpgradableExecuteBatch(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'executeBatch'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'executeBatch',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'executeBatch'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"executeNested"`.
 */
export function usePrepareAccountV3UpgradableExecuteNested(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'executeNested'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'executeNested',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'executeNested'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareAccountV3UpgradableExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareAccountV3UpgradableExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'extcreate'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareAccountV3UpgradableExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'extcreate2'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"lock"`.
 */
export function usePrepareAccountV3UpgradableLock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'lock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'lock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'lock'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePrepareAccountV3UpgradableOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePrepareAccountV3UpgradableOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'onERC1155Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareAccountV3UpgradableOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'onERC721Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'onERC721Received'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"setOverrides"`.
 */
export function usePrepareAccountV3UpgradableSetOverrides(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'setOverrides'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'setOverrides',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'setOverrides'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"setPermissions"`.
 */
export function usePrepareAccountV3UpgradableSetPermissions(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'setPermissions'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'setPermissions',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'setPermissions'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"upgradeTo"`.
 */
export function usePrepareAccountV3UpgradableUpgradeTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof accountV3UpgradableABI, 'upgradeTo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'upgradeTo',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'upgradeTo'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"upgradeToAndCall"`.
 */
export function usePrepareAccountV3UpgradableUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'upgradeToAndCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'upgradeToAndCall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function usePrepareAccountV3UpgradableValidateUserOp(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof accountV3UpgradableABI,
      'validateUserOp'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: accountV3UpgradableABI,
    functionName: 'validateUserOp',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof accountV3UpgradableABI,
    'validateUserOp'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3UpgradableABI}__.
 */
export function useAccountV3UpgradableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof accountV3UpgradableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3UpgradableABI,
    ...config,
  } as UseContractEventConfig<typeof accountV3UpgradableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `eventName` set to `"AdminChanged"`.
 */
export function useAccountV3UpgradableAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3UpgradableABI, 'AdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3UpgradableABI,
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof accountV3UpgradableABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `eventName` set to `"BeaconUpgraded"`.
 */
export function useAccountV3UpgradableBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3UpgradableABI, 'BeaconUpgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3UpgradableABI,
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof accountV3UpgradableABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `eventName` set to `"LockUpdated"`.
 */
export function useAccountV3UpgradableLockUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3UpgradableABI, 'LockUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3UpgradableABI,
    eventName: 'LockUpdated',
    ...config,
  } as UseContractEventConfig<typeof accountV3UpgradableABI, 'LockUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `eventName` set to `"OverrideUpdated"`.
 */
export function useAccountV3UpgradableOverrideUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3UpgradableABI, 'OverrideUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3UpgradableABI,
    eventName: 'OverrideUpdated',
    ...config,
  } as UseContractEventConfig<typeof accountV3UpgradableABI, 'OverrideUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `eventName` set to `"PermissionUpdated"`.
 */
export function useAccountV3UpgradablePermissionUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3UpgradableABI, 'PermissionUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3UpgradableABI,
    eventName: 'PermissionUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof accountV3UpgradableABI,
    'PermissionUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link accountV3UpgradableABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useAccountV3UpgradableUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof accountV3UpgradableABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: accountV3UpgradableABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof accountV3UpgradableABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseAccountABI}__.
 */
export function useBaseAccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof baseAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseAccountABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: baseAccountABI,
    ...config,
  } as UseContractReadConfig<typeof baseAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseAccountABI}__ and `functionName` set to `"entryPoint"`.
 */
export function useBaseAccountEntryPoint<
  TFunctionName extends 'entryPoint',
  TSelectData = ReadContractResult<typeof baseAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: baseAccountABI,
    functionName: 'entryPoint',
    ...config,
  } as UseContractReadConfig<typeof baseAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseAccountABI}__ and `functionName` set to `"getNonce"`.
 */
export function useBaseAccountGetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<typeof baseAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: baseAccountABI,
    functionName: 'getNonce',
    ...config,
  } as UseContractReadConfig<typeof baseAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseAccountABI}__.
 */
export function useBaseAccountWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseAccountABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof baseAccountABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof baseAccountABI, TFunctionName, TMode>({
    abi: baseAccountABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseAccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function useBaseAccountValidateUserOp<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseAccountABI,
          'validateUserOp'
        >['request']['abi'],
        'validateUserOp',
        TMode
      > & { functionName?: 'validateUserOp' }
    : UseContractWriteConfig<typeof baseAccountABI, 'validateUserOp', TMode> & {
        abi?: never
        functionName?: 'validateUserOp'
      } = {} as any,
) {
  return useContractWrite<typeof baseAccountABI, 'validateUserOp', TMode>({
    abi: baseAccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseAccountABI}__.
 */
export function usePrepareBaseAccountWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseAccountABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseAccountABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseAccountABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseAccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function usePrepareBaseAccountValidateUserOp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseAccountABI, 'validateUserOp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseAccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseAccountABI, 'validateUserOp'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseExecutorABI}__.
 */
export function useBaseExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof baseExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseExecutorABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: baseExecutorABI,
    ...config,
  } as UseContractReadConfig<
    typeof baseExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseExecutorABI}__ and `functionName` set to `"extsload"`.
 */
export function useBaseExecutorExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof baseExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseExecutorABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: baseExecutorABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof baseExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseExecutorABI}__.
 */
export function useBaseExecutorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseExecutorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof baseExecutorABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof baseExecutorABI, TFunctionName, TMode>({
    abi: baseExecutorABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function useBaseExecutorExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseExecutorABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof baseExecutorABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof baseExecutorABI, 'extcall', TMode>({
    abi: baseExecutorABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function useBaseExecutorExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseExecutorABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<typeof baseExecutorABI, 'extcreate', TMode> & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof baseExecutorABI, 'extcreate', TMode>({
    abi: baseExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useBaseExecutorExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseExecutorABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<typeof baseExecutorABI, 'extcreate2', TMode> & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof baseExecutorABI, 'extcreate2', TMode>({
    abi: baseExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseExecutorABI}__.
 */
export function usePrepareBaseExecutorWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseExecutorABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseExecutorABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseExecutorABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareBaseExecutorExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseExecutorABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseExecutorABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseExecutorABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareBaseExecutorExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseExecutorABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseExecutorABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareBaseExecutorExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseExecutorABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseExecutorABI, 'extcreate2'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link batchExecutorABI}__.
 */
export function useBatchExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof batchExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof batchExecutorABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: batchExecutorABI,
    ...config,
  } as UseContractReadConfig<
    typeof batchExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"extsload"`.
 */
export function useBatchExecutorExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof batchExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof batchExecutorABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: batchExecutorABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof batchExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link batchExecutorABI}__.
 */
export function useBatchExecutorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof batchExecutorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof batchExecutorABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof batchExecutorABI, TFunctionName, TMode>({
    abi: batchExecutorABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"executeBatch"`.
 */
export function useBatchExecutorExecuteBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof batchExecutorABI,
          'executeBatch'
        >['request']['abi'],
        'executeBatch',
        TMode
      > & { functionName?: 'executeBatch' }
    : UseContractWriteConfig<typeof batchExecutorABI, 'executeBatch', TMode> & {
        abi?: never
        functionName?: 'executeBatch'
      } = {} as any,
) {
  return useContractWrite<typeof batchExecutorABI, 'executeBatch', TMode>({
    abi: batchExecutorABI,
    functionName: 'executeBatch',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function useBatchExecutorExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof batchExecutorABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof batchExecutorABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof batchExecutorABI, 'extcall', TMode>({
    abi: batchExecutorABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function useBatchExecutorExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof batchExecutorABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<typeof batchExecutorABI, 'extcreate', TMode> & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof batchExecutorABI, 'extcreate', TMode>({
    abi: batchExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useBatchExecutorExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof batchExecutorABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<typeof batchExecutorABI, 'extcreate2', TMode> & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof batchExecutorABI, 'extcreate2', TMode>({
    abi: batchExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link batchExecutorABI}__.
 */
export function usePrepareBatchExecutorWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof batchExecutorABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: batchExecutorABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof batchExecutorABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"executeBatch"`.
 */
export function usePrepareBatchExecutorExecuteBatch(
  config: Omit<
    UsePrepareContractWriteConfig<typeof batchExecutorABI, 'executeBatch'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: batchExecutorABI,
    functionName: 'executeBatch',
    ...config,
  } as UsePrepareContractWriteConfig<typeof batchExecutorABI, 'executeBatch'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareBatchExecutorExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof batchExecutorABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: batchExecutorABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof batchExecutorABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareBatchExecutorExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof batchExecutorABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: batchExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof batchExecutorABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link batchExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareBatchExecutorExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof batchExecutorABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: batchExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof batchExecutorABI, 'extcreate2'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function useCreate2FactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof create2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof create2FactoryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: create2FactoryABI,
    ...config,
  } as UseContractReadConfig<
    typeof create2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link create2FactoryABI}__ and `functionName` set to `"computeAddress"`.
 */
export function useCreate2FactoryComputeAddress<
  TFunctionName extends 'computeAddress',
  TSelectData = ReadContractResult<typeof create2FactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof create2FactoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: create2FactoryABI,
    functionName: 'computeAddress',
    ...config,
  } as UseContractReadConfig<
    typeof create2FactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function useCreate2FactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof create2FactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof create2FactoryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof create2FactoryABI, TFunctionName, TMode>({
    abi: create2FactoryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link create2FactoryABI}__ and `functionName` set to `"deploy"`.
 */
export function useCreate2FactoryDeploy<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof create2FactoryABI,
          'deploy'
        >['request']['abi'],
        'deploy',
        TMode
      > & { functionName?: 'deploy' }
    : UseContractWriteConfig<typeof create2FactoryABI, 'deploy', TMode> & {
        abi?: never
        functionName?: 'deploy'
      } = {} as any,
) {
  return useContractWrite<typeof create2FactoryABI, 'deploy', TMode>({
    abi: create2FactoryABI,
    functionName: 'deploy',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function usePrepareCreate2FactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof create2FactoryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: create2FactoryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof create2FactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link create2FactoryABI}__ and `functionName` set to `"deploy"`.
 */
export function usePrepareCreate2FactoryDeploy(
  config: Omit<
    UsePrepareContractWriteConfig<typeof create2FactoryABI, 'deploy'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: create2FactoryABI,
    functionName: 'deploy',
    ...config,
  } as UsePrepareContractWriteConfig<typeof create2FactoryABI, 'deploy'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link create2FactoryABI}__.
 */
export function useCreate2FactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof create2FactoryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: create2FactoryABI,
    ...config,
  } as UseContractEventConfig<typeof create2FactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link create2FactoryABI}__ and `eventName` set to `"Deployed"`.
 */
export function useCreate2FactoryDeployedEvent(
  config: Omit<
    UseContractEventConfig<typeof create2FactoryABI, 'Deployed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: create2FactoryABI,
    eventName: 'Deployed',
    ...config,
  } as UseContractEventConfig<typeof create2FactoryABI, 'Deployed'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155HolderABI}__.
 */
export function useErc1155HolderRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc1155HolderABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155HolderABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155HolderABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc1155HolderABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155HolderABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc1155HolderSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc1155HolderABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155HolderABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155HolderABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof erc1155HolderABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155HolderABI}__.
 */
export function useErc1155HolderWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155HolderABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc1155HolderABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc1155HolderABI, TFunctionName, TMode>({
    abi: erc1155HolderABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155HolderABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function useErc1155HolderOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155HolderABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof erc1155HolderABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc1155HolderABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: erc1155HolderABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155HolderABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function useErc1155HolderOnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155HolderABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof erc1155HolderABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<typeof erc1155HolderABI, 'onERC1155Received', TMode>({
    abi: erc1155HolderABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155HolderABI}__.
 */
export function usePrepareErc1155HolderWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155HolderABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155HolderABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155HolderABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155HolderABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePrepareErc1155HolderOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc1155HolderABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155HolderABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc1155HolderABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155HolderABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePrepareErc1155HolderOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155HolderABI, 'onERC1155Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155HolderABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc1155HolderABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ReceiverABI}__.
 */
export function useErc1155ReceiverRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc1155ReceiverABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc1155ReceiverABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ReceiverABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc1155ReceiverABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ReceiverABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc1155ReceiverSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc1155ReceiverABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc1155ReceiverABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ReceiverABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof erc1155ReceiverABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ReceiverABI}__.
 */
export function useErc1155ReceiverWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ReceiverABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof erc1155ReceiverABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc1155ReceiverABI, TFunctionName, TMode>({
    abi: erc1155ReceiverABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ReceiverABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function useErc1155ReceiverOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ReceiverABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof erc1155ReceiverABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc1155ReceiverABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: erc1155ReceiverABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ReceiverABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function useErc1155ReceiverOnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ReceiverABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof erc1155ReceiverABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc1155ReceiverABI,
    'onERC1155Received',
    TMode
  >({
    abi: erc1155ReceiverABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ReceiverABI}__.
 */
export function usePrepareErc1155ReceiverWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ReceiverABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155ReceiverABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ReceiverABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ReceiverABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePrepareErc1155ReceiverOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc1155ReceiverABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155ReceiverABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc1155ReceiverABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ReceiverABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePrepareErc1155ReceiverOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc1155ReceiverABI,
      'onERC1155Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155ReceiverABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc1155ReceiverABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc165ABI}__.
 */
export function useErc165Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc165ABI, ...config } as UseContractReadConfig<
    typeof erc165ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc165ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc165SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc165ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1967UpgradeABI}__.
 */
export function useErc1967UpgradeEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc1967UpgradeABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1967UpgradeABI,
    ...config,
  } as UseContractEventConfig<typeof erc1967UpgradeABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1967UpgradeABI}__ and `eventName` set to `"AdminChanged"`.
 */
export function useErc1967UpgradeAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1967UpgradeABI, 'AdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1967UpgradeABI,
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof erc1967UpgradeABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1967UpgradeABI}__ and `eventName` set to `"BeaconUpgraded"`.
 */
export function useErc1967UpgradeBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1967UpgradeABI, 'BeaconUpgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1967UpgradeABI,
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof erc1967UpgradeABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1967UpgradeABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useErc1967UpgradeUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1967UpgradeABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1967UpgradeABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof erc1967UpgradeABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useErc20DecreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof erc20ABI, 'decreaseAllowance', TMode> & {
        abi?: never
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'decreaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useErc20IncreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof erc20ABI, 'increaseAllowance', TMode> & {
        abi?: never
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'increaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareErc20DecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareErc20IncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function useErc20MockRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20MockAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20MockBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20MockDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"name"`.
 */
export function useErc20MockName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20MockSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20MockTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20MockABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function useErc20MockWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20MockABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, TFunctionName, TMode>({
    abi: erc20MockABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20MockApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20MockABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'approve', TMode>({
    abi: erc20MockABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useErc20MockDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<
        typeof erc20MockABI,
        'decreaseAllowance',
        TMode
      > & {
        abi?: never
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'decreaseAllowance', TMode>({
    abi: erc20MockABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useErc20MockIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<
        typeof erc20MockABI,
        'increaseAllowance',
        TMode
      > & {
        abi?: never
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'increaseAllowance', TMode>({
    abi: erc20MockABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"mint"`.
 */
export function useErc20MockMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof erc20MockABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'mint', TMode>({
    abi: erc20MockABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20MockTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20MockABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'transfer', TMode>({
    abi: erc20MockABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20MockTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20MockABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20MockABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20MockABI, 'transferFrom', TMode>({
    abi: erc20MockABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function usePrepareErc20MockWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20MockApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareErc20MockDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareErc20MockIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareErc20MockMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20MockTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20MockTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20MockABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20MockABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20MockABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20MockABI}__.
 */
export function useErc20MockEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20MockABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20MockABI,
    ...config,
  } as UseContractEventConfig<typeof erc20MockABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20MockABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20MockApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20MockABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20MockABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20MockABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20MockABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20MockTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20MockABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20MockABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20MockABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ModuleABI}__.
 */
export function useErc20ModuleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ModuleABI,
    ...config,
  } as UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"CALL_OPERATION"`.
 */
export function useErc20ModuleCallOperation<
  TFunctionName extends 'CALL_OPERATION',
  TSelectData = ReadContractResult<typeof erc20ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ModuleABI,
    functionName: 'CALL_OPERATION',
    ...config,
  } as UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"CALL_VALUE"`.
 */
export function useErc20ModuleCallValue<
  TFunctionName extends 'CALL_VALUE',
  TSelectData = ReadContractResult<typeof erc20ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ModuleABI,
    functionName: 'CALL_VALUE',
    ...config,
  } as UseContractReadConfig<typeof erc20ModuleABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__.
 */
export function useErc20ModuleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ModuleABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, TFunctionName, TMode>({
    abi: erc20ModuleABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function useErc20ModuleOnCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          'onCreate'
        >['request']['abi'],
        'onCreate',
        TMode
      > & { functionName?: 'onCreate' }
    : UseContractWriteConfig<typeof erc20ModuleABI, 'onCreate', TMode> & {
        abi?: never
        functionName?: 'onCreate'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, 'onCreate', TMode>({
    abi: erc20ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function useErc20ModuleOnOpen<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          'onOpen'
        >['request']['abi'],
        'onOpen',
        TMode
      > & { functionName?: 'onOpen' }
    : UseContractWriteConfig<typeof erc20ModuleABI, 'onOpen', TMode> & {
        abi?: never
        functionName?: 'onOpen'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, 'onOpen', TMode>({
    abi: erc20ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function useErc20ModuleOnRevoke<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ModuleABI,
          'onRevoke'
        >['request']['abi'],
        'onRevoke',
        TMode
      > & { functionName?: 'onRevoke' }
    : UseContractWriteConfig<typeof erc20ModuleABI, 'onRevoke', TMode> & {
        abi?: never
        functionName?: 'onRevoke'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ModuleABI, 'onRevoke', TMode>({
    abi: erc20ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__.
 */
export function usePrepareErc20ModuleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function usePrepareErc20ModuleOnCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onCreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onCreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function usePrepareErc20ModuleOnOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onOpen'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onOpen'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function usePrepareErc20ModuleOnRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onRevoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ModuleABI, 'onRevoke'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc2771ContextABI}__.
 */
export function useErc2771ContextRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc2771ContextABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc2771ContextABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc2771ContextABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc2771ContextABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc2771ContextABI}__ and `functionName` set to `"isTrustedForwarder"`.
 */
export function useErc2771ContextIsTrustedForwarder<
  TFunctionName extends 'isTrustedForwarder',
  TSelectData = ReadContractResult<typeof erc2771ContextABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc2771ContextABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc2771ContextABI,
    functionName: 'isTrustedForwarder',
    ...config,
  } as UseContractReadConfig<
    typeof erc2771ContextABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc4337AccountABI}__.
 */
export function useErc4337AccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc4337AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc4337AccountABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc4337AccountABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc4337AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc4337AccountABI}__ and `functionName` set to `"entryPoint"`.
 */
export function useErc4337AccountEntryPoint<
  TFunctionName extends 'entryPoint',
  TSelectData = ReadContractResult<typeof erc4337AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc4337AccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc4337AccountABI,
    functionName: 'entryPoint',
    ...config,
  } as UseContractReadConfig<
    typeof erc4337AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc4337AccountABI}__ and `functionName` set to `"getNonce"`.
 */
export function useErc4337AccountGetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<typeof erc4337AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc4337AccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc4337AccountABI,
    functionName: 'getNonce',
    ...config,
  } as UseContractReadConfig<
    typeof erc4337AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc4337AccountABI}__.
 */
export function useErc4337AccountWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc4337AccountABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc4337AccountABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc4337AccountABI, TFunctionName, TMode>({
    abi: erc4337AccountABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc4337AccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function useErc4337AccountValidateUserOp<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc4337AccountABI,
          'validateUserOp'
        >['request']['abi'],
        'validateUserOp',
        TMode
      > & { functionName?: 'validateUserOp' }
    : UseContractWriteConfig<
        typeof erc4337AccountABI,
        'validateUserOp',
        TMode
      > & {
        abi?: never
        functionName?: 'validateUserOp'
      } = {} as any,
) {
  return useContractWrite<typeof erc4337AccountABI, 'validateUserOp', TMode>({
    abi: erc4337AccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc4337AccountABI}__.
 */
export function usePrepareErc4337AccountWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc4337AccountABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc4337AccountABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc4337AccountABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc4337AccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function usePrepareErc4337AccountValidateUserOp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc4337AccountABI, 'validateUserOp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc4337AccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc4337AccountABI,
    'validateUserOp'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551AccountABI}__.
 */
export function useErc6551AccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6551AccountABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551AccountABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551AccountABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function useErc6551AccountIsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<typeof erc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6551AccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551AccountABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551AccountABI}__ and `functionName` set to `"isValidSigner"`.
 */
export function useErc6551AccountIsValidSigner<
  TFunctionName extends 'isValidSigner',
  TSelectData = ReadContractResult<typeof erc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6551AccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551AccountABI,
    functionName: 'isValidSigner',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551AccountABI}__ and `functionName` set to `"state"`.
 */
export function useErc6551AccountState<
  TFunctionName extends 'state',
  TSelectData = ReadContractResult<typeof erc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6551AccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551AccountABI,
    functionName: 'state',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551AccountABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc6551AccountSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6551AccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551AccountABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551AccountABI}__ and `functionName` set to `"token"`.
 */
export function useErc6551AccountToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof erc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6551AccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551AccountABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551ExecutorABI}__.
 */
export function useErc6551ExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc6551ExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc6551ExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551ExecutorABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc6551ExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"extsload"`.
 */
export function useErc6551ExecutorExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof erc6551ExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc6551ExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551ExecutorABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551ExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc6551ExecutorSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc6551ExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc6551ExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc6551ExecutorABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof erc6551ExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__.
 */
export function useErc6551ExecutorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc6551ExecutorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof erc6551ExecutorABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc6551ExecutorABI, TFunctionName, TMode>({
    abi: erc6551ExecutorABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"execute"`.
 */
export function useErc6551ExecutorExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc6551ExecutorABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof erc6551ExecutorABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof erc6551ExecutorABI, 'execute', TMode>({
    abi: erc6551ExecutorABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function useErc6551ExecutorExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc6551ExecutorABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof erc6551ExecutorABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof erc6551ExecutorABI, 'extcall', TMode>({
    abi: erc6551ExecutorABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function useErc6551ExecutorExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc6551ExecutorABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<typeof erc6551ExecutorABI, 'extcreate', TMode> & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof erc6551ExecutorABI, 'extcreate', TMode>({
    abi: erc6551ExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useErc6551ExecutorExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc6551ExecutorABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<typeof erc6551ExecutorABI, 'extcreate2', TMode> & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof erc6551ExecutorABI, 'extcreate2', TMode>({
    abi: erc6551ExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__.
 */
export function usePrepareErc6551ExecutorWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6551ExecutorABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareErc6551ExecutorExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6551ExecutorABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'execute'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareErc6551ExecutorExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6551ExecutorABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareErc6551ExecutorExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6551ExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6551ExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareErc6551ExecutorExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6551ExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6551ExecutorABI, 'extcreate2'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc721ABI, ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({
    abi: erc721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'approve', TMode>({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof erc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function useErc721EnumerableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721EnumerableBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721EnumerableGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721EnumerableIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"name"`.
 */
export function useErc721EnumerableName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721EnumerableOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721EnumerableSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721EnumerableSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useErc721EnumerableTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useErc721EnumerableTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721EnumerableTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc721EnumerableTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof erc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721EnumerableABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof erc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function useErc721EnumerableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721EnumerableABI, TFunctionName, TMode>({
    abi: erc721EnumerableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721EnumerableApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721EnumerableABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721EnumerableABI, 'approve', TMode>({
    abi: erc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721EnumerableSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc721EnumerableABI,
    'safeTransferFrom',
    TMode
  >({
    abi: erc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721EnumerableSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc721EnumerableABI,
    'setApprovalForAll',
    TMode
  >({
    abi: erc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721EnumerableTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721EnumerableABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof erc721EnumerableABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721EnumerableABI, 'transferFrom', TMode>({
    abi: erc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function usePrepareErc721EnumerableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721EnumerableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721EnumerableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721EnumerableApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721EnumerableABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721EnumerableABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721EnumerableSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc721EnumerableABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721EnumerableABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721EnumerableSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc721EnumerableABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721EnumerableABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721EnumerableTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721EnumerableABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721EnumerableABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__.
 */
export function useErc721EnumerableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721EnumerableApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721EnumerableApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721EnumerableABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721EnumerableTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721EnumerableABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721EnumerableABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721EnumerableABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721HolderABI}__.
 */
export function useErc721HolderWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721HolderABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721HolderABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721HolderABI, TFunctionName, TMode>({
    abi: erc721HolderABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721HolderABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useErc721HolderOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721HolderABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<
        typeof erc721HolderABI,
        'onERC721Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof erc721HolderABI, 'onERC721Received', TMode>({
    abi: erc721HolderABI,
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721HolderABI}__.
 */
export function usePrepareErc721HolderWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721HolderABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721HolderABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721HolderABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721HolderABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareErc721HolderOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721HolderABI, 'onERC721Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721HolderABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721HolderABI,
    'onERC721Received'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function useErc721MockRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721MockBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721MockGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721MockIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"name"`.
 */
export function useErc721MockName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721MockOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721MockSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721MockSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721MockTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721MockABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721MockABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721MockABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function useErc721MockWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721MockABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, TFunctionName, TMode>({
    abi: erc721MockABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721MockApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721MockABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'approve', TMode>({
    abi: erc721MockABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"mint"`.
 */
export function useErc721MockMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof erc721MockABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'mint', TMode>({
    abi: erc721MockABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721MockSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof erc721MockABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'safeTransferFrom', TMode>({
    abi: erc721MockABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721MockSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof erc721MockABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'setApprovalForAll', TMode>({
    abi: erc721MockABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721MockTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721MockABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721MockABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721MockABI, 'transferFrom', TMode>({
    abi: erc721MockABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function usePrepareErc721MockWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721MockApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareErc721MockMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721MockSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721MockSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721MockABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721MockTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721MockABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721MockABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721MockABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__.
 */
export function useErc721MockEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721MockApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721MockApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721MockABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721MockTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721MockABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721MockABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721MockABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ModuleABI}__.
 */
export function useErc721ModuleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ModuleABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ModuleABI,
    ...config,
  } as UseContractReadConfig<
    typeof erc721ModuleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"CALL_OPERATION"`.
 */
export function useErc721ModuleCallOperation<
  TFunctionName extends 'CALL_OPERATION',
  TSelectData = ReadContractResult<typeof erc721ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ModuleABI,
    functionName: 'CALL_OPERATION',
    ...config,
  } as UseContractReadConfig<
    typeof erc721ModuleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"CALL_VALUE"`.
 */
export function useErc721ModuleCallValue<
  TFunctionName extends 'CALL_VALUE',
  TSelectData = ReadContractResult<typeof erc721ModuleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ModuleABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ModuleABI,
    functionName: 'CALL_VALUE',
    ...config,
  } as UseContractReadConfig<
    typeof erc721ModuleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__.
 */
export function useErc721ModuleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ModuleABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, TFunctionName, TMode>({
    abi: erc721ModuleABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function useErc721ModuleOnCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          'onCreate'
        >['request']['abi'],
        'onCreate',
        TMode
      > & { functionName?: 'onCreate' }
    : UseContractWriteConfig<typeof erc721ModuleABI, 'onCreate', TMode> & {
        abi?: never
        functionName?: 'onCreate'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, 'onCreate', TMode>({
    abi: erc721ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function useErc721ModuleOnOpen<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          'onOpen'
        >['request']['abi'],
        'onOpen',
        TMode
      > & { functionName?: 'onOpen' }
    : UseContractWriteConfig<typeof erc721ModuleABI, 'onOpen', TMode> & {
        abi?: never
        functionName?: 'onOpen'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, 'onOpen', TMode>({
    abi: erc721ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function useErc721ModuleOnRevoke<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ModuleABI,
          'onRevoke'
        >['request']['abi'],
        'onRevoke',
        TMode
      > & { functionName?: 'onRevoke' }
    : UseContractWriteConfig<typeof erc721ModuleABI, 'onRevoke', TMode> & {
        abi?: never
        functionName?: 'onRevoke'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ModuleABI, 'onRevoke', TMode>({
    abi: erc721ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__.
 */
export function usePrepareErc721ModuleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function usePrepareErc721ModuleOnCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onCreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    functionName: 'onCreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onCreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function usePrepareErc721ModuleOnOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onOpen'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    functionName: 'onOpen',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onOpen'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function usePrepareErc721ModuleOnRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onRevoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ModuleABI, 'onRevoke'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAccountABI}__.
 */
export function useIAccountWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAccountABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iAccountABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iAccountABI, TFunctionName, TMode>({
    abi: iAccountABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function useIAccountValidateUserOp<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAccountABI,
          'validateUserOp'
        >['request']['abi'],
        'validateUserOp',
        TMode
      > & { functionName?: 'validateUserOp' }
    : UseContractWriteConfig<typeof iAccountABI, 'validateUserOp', TMode> & {
        abi?: never
        functionName?: 'validateUserOp'
      } = {} as any,
) {
  return useContractWrite<typeof iAccountABI, 'validateUserOp', TMode>({
    abi: iAccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAccountABI}__.
 */
export function usePrepareIAccountWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAccountABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAccountABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAccountABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function usePrepareIAccountValidateUserOp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAccountABI, 'validateUserOp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAccountABI, 'validateUserOp'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAccountGuardianABI}__.
 */
export function useIAccountGuardianRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iAccountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAccountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iAccountGuardianABI,
    ...config,
  } as UseContractReadConfig<
    typeof iAccountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAccountGuardianABI}__ and `functionName` set to `"defaultImplementation"`.
 */
export function useIAccountGuardianDefaultImplementation<
  TFunctionName extends 'defaultImplementation',
  TSelectData = ReadContractResult<typeof iAccountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAccountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAccountGuardianABI,
    functionName: 'defaultImplementation',
    ...config,
  } as UseContractReadConfig<
    typeof iAccountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAccountGuardianABI}__ and `functionName` set to `"isTrustedExecutor"`.
 */
export function useIAccountGuardianIsTrustedExecutor<
  TFunctionName extends 'isTrustedExecutor',
  TSelectData = ReadContractResult<typeof iAccountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAccountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAccountGuardianABI,
    functionName: 'isTrustedExecutor',
    ...config,
  } as UseContractReadConfig<
    typeof iAccountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAccountGuardianABI}__ and `functionName` set to `"isTrustedImplementation"`.
 */
export function useIAccountGuardianIsTrustedImplementation<
  TFunctionName extends 'isTrustedImplementation',
  TSelectData = ReadContractResult<typeof iAccountGuardianABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iAccountGuardianABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAccountGuardianABI,
    functionName: 'isTrustedImplementation',
    ...config,
  } as UseContractReadConfig<
    typeof iAccountGuardianABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAccountGuardianABI}__.
 */
export function useIAccountGuardianWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAccountGuardianABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof iAccountGuardianABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iAccountGuardianABI, TFunctionName, TMode>({
    abi: iAccountGuardianABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAccountGuardianABI}__ and `functionName` set to `"setTrustedExecutor"`.
 */
export function useIAccountGuardianSetTrustedExecutor<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAccountGuardianABI,
          'setTrustedExecutor'
        >['request']['abi'],
        'setTrustedExecutor',
        TMode
      > & { functionName?: 'setTrustedExecutor' }
    : UseContractWriteConfig<
        typeof iAccountGuardianABI,
        'setTrustedExecutor',
        TMode
      > & {
        abi?: never
        functionName?: 'setTrustedExecutor'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAccountGuardianABI,
    'setTrustedExecutor',
    TMode
  >({
    abi: iAccountGuardianABI,
    functionName: 'setTrustedExecutor',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iAccountGuardianABI}__ and `functionName` set to `"setTrustedImplementation"`.
 */
export function useIAccountGuardianSetTrustedImplementation<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iAccountGuardianABI,
          'setTrustedImplementation'
        >['request']['abi'],
        'setTrustedImplementation',
        TMode
      > & { functionName?: 'setTrustedImplementation' }
    : UseContractWriteConfig<
        typeof iAccountGuardianABI,
        'setTrustedImplementation',
        TMode
      > & {
        abi?: never
        functionName?: 'setTrustedImplementation'
      } = {} as any,
) {
  return useContractWrite<
    typeof iAccountGuardianABI,
    'setTrustedImplementation',
    TMode
  >({
    abi: iAccountGuardianABI,
    functionName: 'setTrustedImplementation',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAccountGuardianABI}__.
 */
export function usePrepareIAccountGuardianWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iAccountGuardianABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAccountGuardianABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iAccountGuardianABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAccountGuardianABI}__ and `functionName` set to `"setTrustedExecutor"`.
 */
export function usePrepareIAccountGuardianSetTrustedExecutor(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAccountGuardianABI,
      'setTrustedExecutor'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAccountGuardianABI,
    functionName: 'setTrustedExecutor',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAccountGuardianABI,
    'setTrustedExecutor'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iAccountGuardianABI}__ and `functionName` set to `"setTrustedImplementation"`.
 */
export function usePrepareIAccountGuardianSetTrustedImplementation(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iAccountGuardianABI,
      'setTrustedImplementation'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iAccountGuardianABI,
    functionName: 'setTrustedImplementation',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iAccountGuardianABI,
    'setTrustedImplementation'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAggregatorABI}__.
 */
export function useIAggregatorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iAggregatorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iAggregatorABI,
    ...config,
  } as UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAggregatorABI}__ and `functionName` set to `"aggregateSignatures"`.
 */
export function useIAggregatorAggregateSignatures<
  TFunctionName extends 'aggregateSignatures',
  TSelectData = ReadContractResult<typeof iAggregatorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAggregatorABI,
    functionName: 'aggregateSignatures',
    ...config,
  } as UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAggregatorABI}__ and `functionName` set to `"validateSignatures"`.
 */
export function useIAggregatorValidateSignatures<
  TFunctionName extends 'validateSignatures',
  TSelectData = ReadContractResult<typeof iAggregatorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAggregatorABI,
    functionName: 'validateSignatures',
    ...config,
  } as UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iAggregatorABI}__ and `functionName` set to `"validateUserOpSignature"`.
 */
export function useIAggregatorValidateUserOpSignature<
  TFunctionName extends 'validateUserOpSignature',
  TSelectData = ReadContractResult<typeof iAggregatorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iAggregatorABI,
    functionName: 'validateUserOpSignature',
    ...config,
  } as UseContractReadConfig<typeof iAggregatorABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iBeaconABI}__.
 */
export function useIBeaconRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iBeaconABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iBeaconABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iBeaconABI,
    ...config,
  } as UseContractReadConfig<typeof iBeaconABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iBeaconABI}__ and `functionName` set to `"implementation"`.
 */
export function useIBeaconImplementation<
  TFunctionName extends 'implementation',
  TSelectData = ReadContractResult<typeof iBeaconABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iBeaconABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iBeaconABI,
    functionName: 'implementation',
    ...config,
  } as UseContractReadConfig<typeof iBeaconABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ReceiverABI}__.
 */
export function useIerc1155ReceiverRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc1155ReceiverABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155ReceiverABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ReceiverABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155ReceiverABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc1155ReceiverSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc1155ReceiverABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155ReceiverABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ReceiverABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155ReceiverABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__.
 */
export function useIerc1155ReceiverWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ReceiverABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc1155ReceiverABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc1155ReceiverABI, TFunctionName, TMode>({
    abi: ierc1155ReceiverABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function useIerc1155ReceiverOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ReceiverABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof ierc1155ReceiverABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc1155ReceiverABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function useIerc1155ReceiverOnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ReceiverABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof ierc1155ReceiverABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc1155ReceiverABI,
    'onERC1155Received',
    TMode
  >({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__.
 */
export function usePrepareIerc1155ReceiverWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc1155ReceiverABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ReceiverABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc1155ReceiverABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePrepareIerc1155ReceiverOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc1155ReceiverABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155ReceiverABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePrepareIerc1155ReceiverOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc1155ReceiverABI,
      'onERC1155Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155ReceiverABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1271ABI}__.
 */
export function useIerc1271Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc1271ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1271ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1271ABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function useIerc1271IsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<typeof ierc1271ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1271ABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<typeof ierc1271ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__.
 */
export function useIerc165Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc165ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc165SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc165ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1822ProxiableABI}__.
 */
export function useIerc1822ProxiableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc1822ProxiableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1822ProxiableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1822ProxiableABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc1822ProxiableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1822ProxiableABI}__ and `functionName` set to `"proxiableUUID"`.
 */
export function useIerc1822ProxiableProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof ierc1822ProxiableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1822ProxiableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1822ProxiableABI,
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1822ProxiableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1967ABI}__.
 */
export function useIerc1967Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc1967ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1967ABI,
    ...config,
  } as UseContractEventConfig<typeof ierc1967ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1967ABI}__ and `eventName` set to `"AdminChanged"`.
 */
export function useIerc1967AdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1967ABI, 'AdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1967ABI,
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof ierc1967ABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1967ABI}__ and `eventName` set to `"BeaconUpgraded"`.
 */
export function useIerc1967BeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1967ABI, 'BeaconUpgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1967ABI,
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof ierc1967ABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1967ABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useIerc1967UpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1967ABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1967ABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof ierc1967ABI, 'Upgraded'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, TFunctionName, TMode>({
    abi: ierc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'approve', TMode>({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transfer', TMode>({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transferFrom', TMode>({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function usePrepareIerc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20MetadataAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20MetadataBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"decimals"`.
 */
export function useIerc20MetadataDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"name"`.
 */
export function useIerc20MetadataName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc20MetadataSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20MetadataTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20MetadataABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, TFunctionName, TMode>({
    abi: ierc20MetadataABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20MetadataApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'approve', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20MetadataTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transfer', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20MetadataTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof ierc20MetadataABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transferFrom', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function usePrepareIerc20MetadataWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20MetadataApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20MetadataTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20MetadataTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20MetadataApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20MetadataTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useIerc20PermitDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"nonces"`.
 */
export function useIerc20PermitNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    functionName: 'nonces',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20PermitABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20PermitABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, TFunctionName, TMode>({
    abi: ierc20PermitABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function useIerc20PermitPermit<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20PermitABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof ierc20PermitABI, 'permit', TMode> & {
        abi?: never
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, 'permit', TMode>({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function usePrepareIerc20PermitWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20PermitABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20PermitABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20PermitABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareIerc20PermitPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__.
 */
export function useIerc6551AccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__ and `functionName` set to `"isValidSigner"`.
 */
export function useIerc6551AccountIsValidSigner<
  TFunctionName extends 'isValidSigner',
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    functionName: 'isValidSigner',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__ and `functionName` set to `"state"`.
 */
export function useIerc6551AccountState<
  TFunctionName extends 'state',
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    functionName: 'state',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551AccountABI}__ and `functionName` set to `"token"`.
 */
export function useIerc6551AccountToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof ierc6551AccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551AccountABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551AccountABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551AccountABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__.
 */
export function useIerc6551ExecutableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551ExecutableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc6551ExecutableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551ExecutableABI, TFunctionName, TMode>({
    abi: ierc6551ExecutableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__ and `functionName` set to `"execute"`.
 */
export function useIerc6551ExecutableExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551ExecutableABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof ierc6551ExecutableABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551ExecutableABI, 'execute', TMode>({
    abi: ierc6551ExecutableABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__.
 */
export function usePrepareIerc6551ExecutableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551ExecutableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551ExecutableABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc6551ExecutableABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551ExecutableABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareIerc6551ExecutableExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551ExecutableABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551ExecutableABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6551ExecutableABI, 'execute'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551RegistryABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"account"`.
 */
export function useIerc6551RegistryAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof ierc6551RegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc6551RegistryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc6551RegistryABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<
    typeof ierc6551RegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551RegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc6551RegistryABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551RegistryABI, TFunctionName, TMode>({
    abi: ierc6551RegistryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function useIerc6551RegistryCreateAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc6551RegistryABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & { functionName?: 'createAccount' }
    : UseContractWriteConfig<
        typeof ierc6551RegistryABI,
        'createAccount',
        TMode
      > & {
        abi?: never
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<typeof ierc6551RegistryABI, 'createAccount', TMode>({
    abi: ierc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function usePrepareIerc6551RegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551RegistryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePrepareIerc6551RegistryCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6551RegistryABI, 'createAccount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6551RegistryABI,
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc6551RegistryABI,
    'createAccount'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6551RegistryABI}__.
 */
export function useIerc6551RegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc6551RegistryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc6551RegistryABI,
    ...config,
  } as UseContractEventConfig<typeof ierc6551RegistryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6551RegistryABI}__ and `eventName` set to `"ERC6551AccountCreated"`.
 */
export function useIerc6551RegistryErc6551AccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc6551RegistryABI, 'ERC6551AccountCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc6551RegistryABI,
    eventName: 'ERC6551AccountCreated',
    ...config,
  } as UseContractEventConfig<
    typeof ierc6551RegistryABI,
    'ERC6551AccountCreated'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, TFunctionName, TMode>({
    abi: ierc721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'approve', TMode>({
    abi: ierc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof ierc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'safeTransferFrom', TMode>({
    abi: ierc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof ierc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'setApprovalForAll', TMode>({
    abi: ierc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, 'transferFrom', TMode>({
    abi: ierc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function usePrepareIerc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721EnumerableBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721EnumerableGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721EnumerableIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721EnumerableOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721EnumerableSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useIerc721EnumerableTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useIerc721EnumerableTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc721EnumerableTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721EnumerableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, TFunctionName, TMode>({
    abi: ierc721EnumerableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721EnumerableApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc721EnumerableABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, 'approve', TMode>({
    abi: ierc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721EnumerableSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc721EnumerableABI,
    'safeTransferFrom',
    TMode
  >({
    abi: ierc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721EnumerableSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc721EnumerableABI,
    'setApprovalForAll',
    TMode
  >({
    abi: ierc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721EnumerableTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721EnumerableABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof ierc721EnumerableABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, 'transferFrom', TMode>({
    abi: ierc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function usePrepareIerc721EnumerableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721EnumerableApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721EnumerableSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721EnumerableABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721EnumerableSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721EnumerableABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721EnumerableTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721EnumerableApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721EnumerableApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721EnumerableTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721EnumerableABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721MetadataBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721MetadataGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721MetadataIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"name"`.
 */
export function useIerc721MetadataName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721MetadataOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721MetadataSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc721MetadataSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useIerc721MetadataTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc721MetadataABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, TFunctionName, TMode>({
    abi: ierc721MetadataABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721MetadataApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc721MetadataABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, 'approve', TMode>({
    abi: ierc721MetadataABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721MetadataSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, 'safeTransferFrom', TMode>(
    {
      abi: ierc721MetadataABI,
      functionName: 'safeTransferFrom',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721MetadataSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc721MetadataABI,
    'setApprovalForAll',
    TMode
  >({
    abi: ierc721MetadataABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721MetadataTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721MetadataABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof ierc721MetadataABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, 'transferFrom', TMode>({
    abi: ierc721MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function usePrepareIerc721MetadataWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721MetadataApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721MetadataSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721MetadataABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721MetadataABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721MetadataSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721MetadataABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721MetadataABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721MetadataTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721MetadataApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721MetadataApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721MetadataTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc721MetadataABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc721MetadataABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc721MetadataABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__.
 */
export function useIerc721ReceiverWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ReceiverABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc721ReceiverABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ReceiverABI, TFunctionName, TMode>({
    abi: ierc721ReceiverABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useIerc721ReceiverOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc721ReceiverABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<
        typeof ierc721ReceiverABI,
        'onERC721Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ReceiverABI, 'onERC721Received', TMode>(
    {
      abi: ierc721ReceiverABI,
      functionName: 'onERC721Received',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__.
 */
export function usePrepareIerc721ReceiverWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ReceiverABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ReceiverABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ReceiverABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareIerc721ReceiverOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc721ReceiverABI,
      'onERC721Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ReceiverABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc721ReceiverABI,
    'onERC721Received'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iEntryPointABI}__.
 */
export function useIEntryPointRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iEntryPointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iEntryPointABI,
    ...config,
  } as UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIEntryPointBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof iEntryPointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iEntryPointABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"getDepositInfo"`.
 */
export function useIEntryPointGetDepositInfo<
  TFunctionName extends 'getDepositInfo',
  TSelectData = ReadContractResult<typeof iEntryPointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iEntryPointABI,
    functionName: 'getDepositInfo',
    ...config,
  } as UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"getNonce"`.
 */
export function useIEntryPointGetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<typeof iEntryPointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iEntryPointABI,
    functionName: 'getNonce',
    ...config,
  } as UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"getUserOpHash"`.
 */
export function useIEntryPointGetUserOpHash<
  TFunctionName extends 'getUserOpHash',
  TSelectData = ReadContractResult<typeof iEntryPointABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iEntryPointABI,
    functionName: 'getUserOpHash',
    ...config,
  } as UseContractReadConfig<typeof iEntryPointABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__.
 */
export function useIEntryPointWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iEntryPointABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, TFunctionName, TMode>({
    abi: iEntryPointABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"addStake"`.
 */
export function useIEntryPointAddStake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'addStake'
        >['request']['abi'],
        'addStake',
        TMode
      > & { functionName?: 'addStake' }
    : UseContractWriteConfig<typeof iEntryPointABI, 'addStake', TMode> & {
        abi?: never
        functionName?: 'addStake'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'addStake', TMode>({
    abi: iEntryPointABI,
    functionName: 'addStake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"depositTo"`.
 */
export function useIEntryPointDepositTo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'depositTo'
        >['request']['abi'],
        'depositTo',
        TMode
      > & { functionName?: 'depositTo' }
    : UseContractWriteConfig<typeof iEntryPointABI, 'depositTo', TMode> & {
        abi?: never
        functionName?: 'depositTo'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'depositTo', TMode>({
    abi: iEntryPointABI,
    functionName: 'depositTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"getSenderAddress"`.
 */
export function useIEntryPointGetSenderAddress<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'getSenderAddress'
        >['request']['abi'],
        'getSenderAddress',
        TMode
      > & { functionName?: 'getSenderAddress' }
    : UseContractWriteConfig<
        typeof iEntryPointABI,
        'getSenderAddress',
        TMode
      > & {
        abi?: never
        functionName?: 'getSenderAddress'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'getSenderAddress', TMode>({
    abi: iEntryPointABI,
    functionName: 'getSenderAddress',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"handleAggregatedOps"`.
 */
export function useIEntryPointHandleAggregatedOps<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'handleAggregatedOps'
        >['request']['abi'],
        'handleAggregatedOps',
        TMode
      > & { functionName?: 'handleAggregatedOps' }
    : UseContractWriteConfig<
        typeof iEntryPointABI,
        'handleAggregatedOps',
        TMode
      > & {
        abi?: never
        functionName?: 'handleAggregatedOps'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'handleAggregatedOps', TMode>({
    abi: iEntryPointABI,
    functionName: 'handleAggregatedOps',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"handleOps"`.
 */
export function useIEntryPointHandleOps<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'handleOps'
        >['request']['abi'],
        'handleOps',
        TMode
      > & { functionName?: 'handleOps' }
    : UseContractWriteConfig<typeof iEntryPointABI, 'handleOps', TMode> & {
        abi?: never
        functionName?: 'handleOps'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'handleOps', TMode>({
    abi: iEntryPointABI,
    functionName: 'handleOps',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"incrementNonce"`.
 */
export function useIEntryPointIncrementNonce<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'incrementNonce'
        >['request']['abi'],
        'incrementNonce',
        TMode
      > & { functionName?: 'incrementNonce' }
    : UseContractWriteConfig<typeof iEntryPointABI, 'incrementNonce', TMode> & {
        abi?: never
        functionName?: 'incrementNonce'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'incrementNonce', TMode>({
    abi: iEntryPointABI,
    functionName: 'incrementNonce',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"simulateHandleOp"`.
 */
export function useIEntryPointSimulateHandleOp<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'simulateHandleOp'
        >['request']['abi'],
        'simulateHandleOp',
        TMode
      > & { functionName?: 'simulateHandleOp' }
    : UseContractWriteConfig<
        typeof iEntryPointABI,
        'simulateHandleOp',
        TMode
      > & {
        abi?: never
        functionName?: 'simulateHandleOp'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'simulateHandleOp', TMode>({
    abi: iEntryPointABI,
    functionName: 'simulateHandleOp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"simulateValidation"`.
 */
export function useIEntryPointSimulateValidation<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'simulateValidation'
        >['request']['abi'],
        'simulateValidation',
        TMode
      > & { functionName?: 'simulateValidation' }
    : UseContractWriteConfig<
        typeof iEntryPointABI,
        'simulateValidation',
        TMode
      > & {
        abi?: never
        functionName?: 'simulateValidation'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'simulateValidation', TMode>({
    abi: iEntryPointABI,
    functionName: 'simulateValidation',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"unlockStake"`.
 */
export function useIEntryPointUnlockStake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'unlockStake'
        >['request']['abi'],
        'unlockStake',
        TMode
      > & { functionName?: 'unlockStake' }
    : UseContractWriteConfig<typeof iEntryPointABI, 'unlockStake', TMode> & {
        abi?: never
        functionName?: 'unlockStake'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'unlockStake', TMode>({
    abi: iEntryPointABI,
    functionName: 'unlockStake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"withdrawStake"`.
 */
export function useIEntryPointWithdrawStake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'withdrawStake'
        >['request']['abi'],
        'withdrawStake',
        TMode
      > & { functionName?: 'withdrawStake' }
    : UseContractWriteConfig<typeof iEntryPointABI, 'withdrawStake', TMode> & {
        abi?: never
        functionName?: 'withdrawStake'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'withdrawStake', TMode>({
    abi: iEntryPointABI,
    functionName: 'withdrawStake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"withdrawTo"`.
 */
export function useIEntryPointWithdrawTo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iEntryPointABI,
          'withdrawTo'
        >['request']['abi'],
        'withdrawTo',
        TMode
      > & { functionName?: 'withdrawTo' }
    : UseContractWriteConfig<typeof iEntryPointABI, 'withdrawTo', TMode> & {
        abi?: never
        functionName?: 'withdrawTo'
      } = {} as any,
) {
  return useContractWrite<typeof iEntryPointABI, 'withdrawTo', TMode>({
    abi: iEntryPointABI,
    functionName: 'withdrawTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__.
 */
export function usePrepareIEntryPointWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"addStake"`.
 */
export function usePrepareIEntryPointAddStake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'addStake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'addStake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'addStake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"depositTo"`.
 */
export function usePrepareIEntryPointDepositTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'depositTo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'depositTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'depositTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"getSenderAddress"`.
 */
export function usePrepareIEntryPointGetSenderAddress(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'getSenderAddress'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'getSenderAddress',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'getSenderAddress'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"handleAggregatedOps"`.
 */
export function usePrepareIEntryPointHandleAggregatedOps(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'handleAggregatedOps'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'handleAggregatedOps',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iEntryPointABI,
    'handleAggregatedOps'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"handleOps"`.
 */
export function usePrepareIEntryPointHandleOps(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'handleOps'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'handleOps',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'handleOps'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"incrementNonce"`.
 */
export function usePrepareIEntryPointIncrementNonce(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'incrementNonce'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'incrementNonce',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'incrementNonce'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"simulateHandleOp"`.
 */
export function usePrepareIEntryPointSimulateHandleOp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'simulateHandleOp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'simulateHandleOp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'simulateHandleOp'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"simulateValidation"`.
 */
export function usePrepareIEntryPointSimulateValidation(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'simulateValidation'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'simulateValidation',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iEntryPointABI,
    'simulateValidation'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"unlockStake"`.
 */
export function usePrepareIEntryPointUnlockStake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'unlockStake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'unlockStake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'unlockStake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"withdrawStake"`.
 */
export function usePrepareIEntryPointWithdrawStake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'withdrawStake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'withdrawStake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'withdrawStake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iEntryPointABI}__ and `functionName` set to `"withdrawTo"`.
 */
export function usePrepareIEntryPointWithdrawTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iEntryPointABI, 'withdrawTo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iEntryPointABI,
    functionName: 'withdrawTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iEntryPointABI, 'withdrawTo'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__.
 */
export function useIEntryPointEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"AccountDeployed"`.
 */
export function useIEntryPointAccountDeployedEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'AccountDeployed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'AccountDeployed',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'AccountDeployed'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"BeforeExecution"`.
 */
export function useIEntryPointBeforeExecutionEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'BeforeExecution'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'BeforeExecution',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'BeforeExecution'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"Deposited"`.
 */
export function useIEntryPointDepositedEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'Deposited'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'Deposited',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'Deposited'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"SignatureAggregatorChanged"`.
 */
export function useIEntryPointSignatureAggregatorChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'SignatureAggregatorChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'SignatureAggregatorChanged',
    ...config,
  } as UseContractEventConfig<
    typeof iEntryPointABI,
    'SignatureAggregatorChanged'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"StakeLocked"`.
 */
export function useIEntryPointStakeLockedEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'StakeLocked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'StakeLocked',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'StakeLocked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"StakeUnlocked"`.
 */
export function useIEntryPointStakeUnlockedEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'StakeUnlocked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'StakeUnlocked',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'StakeUnlocked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"StakeWithdrawn"`.
 */
export function useIEntryPointStakeWithdrawnEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'StakeWithdrawn'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'StakeWithdrawn',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'StakeWithdrawn'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"UserOperationEvent"`.
 */
export function useIEntryPointUserOperationEventEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'UserOperationEvent'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'UserOperationEvent',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'UserOperationEvent'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"UserOperationRevertReason"`.
 */
export function useIEntryPointUserOperationRevertReasonEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'UserOperationRevertReason'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'UserOperationRevertReason',
    ...config,
  } as UseContractEventConfig<
    typeof iEntryPointABI,
    'UserOperationRevertReason'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iEntryPointABI}__ and `eventName` set to `"Withdrawn"`.
 */
export function useIEntryPointWithdrawnEvent(
  config: Omit<
    UseContractEventConfig<typeof iEntryPointABI, 'Withdrawn'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iEntryPointABI,
    eventName: 'Withdrawn',
    ...config,
  } as UseContractEventConfig<typeof iEntryPointABI, 'Withdrawn'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iNonceManagerABI}__.
 */
export function useINonceManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iNonceManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iNonceManagerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iNonceManagerABI,
    ...config,
  } as UseContractReadConfig<
    typeof iNonceManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iNonceManagerABI}__ and `functionName` set to `"getNonce"`.
 */
export function useINonceManagerGetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<typeof iNonceManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iNonceManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iNonceManagerABI,
    functionName: 'getNonce',
    ...config,
  } as UseContractReadConfig<
    typeof iNonceManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iNonceManagerABI}__.
 */
export function useINonceManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iNonceManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iNonceManagerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iNonceManagerABI, TFunctionName, TMode>({
    abi: iNonceManagerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iNonceManagerABI}__ and `functionName` set to `"incrementNonce"`.
 */
export function useINonceManagerIncrementNonce<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iNonceManagerABI,
          'incrementNonce'
        >['request']['abi'],
        'incrementNonce',
        TMode
      > & { functionName?: 'incrementNonce' }
    : UseContractWriteConfig<
        typeof iNonceManagerABI,
        'incrementNonce',
        TMode
      > & {
        abi?: never
        functionName?: 'incrementNonce'
      } = {} as any,
) {
  return useContractWrite<typeof iNonceManagerABI, 'incrementNonce', TMode>({
    abi: iNonceManagerABI,
    functionName: 'incrementNonce',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iNonceManagerABI}__.
 */
export function usePrepareINonceManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iNonceManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iNonceManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iNonceManagerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iNonceManagerABI}__ and `functionName` set to `"incrementNonce"`.
 */
export function usePrepareINonceManagerIncrementNonce(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iNonceManagerABI, 'incrementNonce'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iNonceManagerABI,
    functionName: 'incrementNonce',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iNonceManagerABI, 'incrementNonce'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__.
 */
export function useIPackModuleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iPackModuleABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, TFunctionName, TMode>({
    abi: iPackModuleABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function useIPackModuleOnCreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          'onCreate'
        >['request']['abi'],
        'onCreate',
        TMode
      > & { functionName?: 'onCreate' }
    : UseContractWriteConfig<typeof iPackModuleABI, 'onCreate', TMode> & {
        abi?: never
        functionName?: 'onCreate'
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, 'onCreate', TMode>({
    abi: iPackModuleABI,
    functionName: 'onCreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function useIPackModuleOnOpen<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          'onOpen'
        >['request']['abi'],
        'onOpen',
        TMode
      > & { functionName?: 'onOpen' }
    : UseContractWriteConfig<typeof iPackModuleABI, 'onOpen', TMode> & {
        abi?: never
        functionName?: 'onOpen'
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, 'onOpen', TMode>({
    abi: iPackModuleABI,
    functionName: 'onOpen',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function useIPackModuleOnRevoke<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPackModuleABI,
          'onRevoke'
        >['request']['abi'],
        'onRevoke',
        TMode
      > & { functionName?: 'onRevoke' }
    : UseContractWriteConfig<typeof iPackModuleABI, 'onRevoke', TMode> & {
        abi?: never
        functionName?: 'onRevoke'
      } = {} as any,
) {
  return useContractWrite<typeof iPackModuleABI, 'onRevoke', TMode>({
    abi: iPackModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__.
 */
export function usePrepareIPackModuleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onCreate"`.
 */
export function usePrepareIPackModuleOnCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onCreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    functionName: 'onCreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onCreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onOpen"`.
 */
export function usePrepareIPackModuleOnOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onOpen'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    functionName: 'onOpen',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onOpen'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPackModuleABI}__ and `functionName` set to `"onRevoke"`.
 */
export function usePrepareIPackModuleOnRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onRevoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPackModuleABI,
    functionName: 'onRevoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPackModuleABI, 'onRevoke'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iSandboxExecutorABI}__.
 */
export function useISandboxExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iSandboxExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iSandboxExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iSandboxExecutorABI,
    ...config,
  } as UseContractReadConfig<
    typeof iSandboxExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iSandboxExecutorABI}__ and `functionName` set to `"extsload"`.
 */
export function useISandboxExecutorExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof iSandboxExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iSandboxExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iSandboxExecutorABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof iSandboxExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__.
 */
export function useISandboxExecutorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iSandboxExecutorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof iSandboxExecutorABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iSandboxExecutorABI, TFunctionName, TMode>({
    abi: iSandboxExecutorABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function useISandboxExecutorExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iSandboxExecutorABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof iSandboxExecutorABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof iSandboxExecutorABI, 'extcall', TMode>({
    abi: iSandboxExecutorABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function useISandboxExecutorExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iSandboxExecutorABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<typeof iSandboxExecutorABI, 'extcreate', TMode> & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof iSandboxExecutorABI, 'extcreate', TMode>({
    abi: iSandboxExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useISandboxExecutorExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iSandboxExecutorABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<
        typeof iSandboxExecutorABI,
        'extcreate2',
        TMode
      > & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof iSandboxExecutorABI, 'extcreate2', TMode>({
    abi: iSandboxExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__.
 */
export function usePrepareISandboxExecutorWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iSandboxExecutorABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareISandboxExecutorExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iSandboxExecutorABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareISandboxExecutorExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iSandboxExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iSandboxExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareISandboxExecutorExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iSandboxExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iSandboxExecutorABI, 'extcreate2'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iStakeManagerABI}__.
 */
export function useIStakeManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iStakeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iStakeManagerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iStakeManagerABI,
    ...config,
  } as UseContractReadConfig<
    typeof iStakeManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIStakeManagerBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof iStakeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iStakeManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iStakeManagerABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof iStakeManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"getDepositInfo"`.
 */
export function useIStakeManagerGetDepositInfo<
  TFunctionName extends 'getDepositInfo',
  TSelectData = ReadContractResult<typeof iStakeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iStakeManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iStakeManagerABI,
    functionName: 'getDepositInfo',
    ...config,
  } as UseContractReadConfig<
    typeof iStakeManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__.
 */
export function useIStakeManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iStakeManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iStakeManagerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iStakeManagerABI, TFunctionName, TMode>({
    abi: iStakeManagerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"addStake"`.
 */
export function useIStakeManagerAddStake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iStakeManagerABI,
          'addStake'
        >['request']['abi'],
        'addStake',
        TMode
      > & { functionName?: 'addStake' }
    : UseContractWriteConfig<typeof iStakeManagerABI, 'addStake', TMode> & {
        abi?: never
        functionName?: 'addStake'
      } = {} as any,
) {
  return useContractWrite<typeof iStakeManagerABI, 'addStake', TMode>({
    abi: iStakeManagerABI,
    functionName: 'addStake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"depositTo"`.
 */
export function useIStakeManagerDepositTo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iStakeManagerABI,
          'depositTo'
        >['request']['abi'],
        'depositTo',
        TMode
      > & { functionName?: 'depositTo' }
    : UseContractWriteConfig<typeof iStakeManagerABI, 'depositTo', TMode> & {
        abi?: never
        functionName?: 'depositTo'
      } = {} as any,
) {
  return useContractWrite<typeof iStakeManagerABI, 'depositTo', TMode>({
    abi: iStakeManagerABI,
    functionName: 'depositTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"unlockStake"`.
 */
export function useIStakeManagerUnlockStake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iStakeManagerABI,
          'unlockStake'
        >['request']['abi'],
        'unlockStake',
        TMode
      > & { functionName?: 'unlockStake' }
    : UseContractWriteConfig<typeof iStakeManagerABI, 'unlockStake', TMode> & {
        abi?: never
        functionName?: 'unlockStake'
      } = {} as any,
) {
  return useContractWrite<typeof iStakeManagerABI, 'unlockStake', TMode>({
    abi: iStakeManagerABI,
    functionName: 'unlockStake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"withdrawStake"`.
 */
export function useIStakeManagerWithdrawStake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iStakeManagerABI,
          'withdrawStake'
        >['request']['abi'],
        'withdrawStake',
        TMode
      > & { functionName?: 'withdrawStake' }
    : UseContractWriteConfig<
        typeof iStakeManagerABI,
        'withdrawStake',
        TMode
      > & {
        abi?: never
        functionName?: 'withdrawStake'
      } = {} as any,
) {
  return useContractWrite<typeof iStakeManagerABI, 'withdrawStake', TMode>({
    abi: iStakeManagerABI,
    functionName: 'withdrawStake',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"withdrawTo"`.
 */
export function useIStakeManagerWithdrawTo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iStakeManagerABI,
          'withdrawTo'
        >['request']['abi'],
        'withdrawTo',
        TMode
      > & { functionName?: 'withdrawTo' }
    : UseContractWriteConfig<typeof iStakeManagerABI, 'withdrawTo', TMode> & {
        abi?: never
        functionName?: 'withdrawTo'
      } = {} as any,
) {
  return useContractWrite<typeof iStakeManagerABI, 'withdrawTo', TMode>({
    abi: iStakeManagerABI,
    functionName: 'withdrawTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__.
 */
export function usePrepareIStakeManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iStakeManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iStakeManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iStakeManagerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"addStake"`.
 */
export function usePrepareIStakeManagerAddStake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'addStake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iStakeManagerABI,
    functionName: 'addStake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'addStake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"depositTo"`.
 */
export function usePrepareIStakeManagerDepositTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'depositTo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iStakeManagerABI,
    functionName: 'depositTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'depositTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"unlockStake"`.
 */
export function usePrepareIStakeManagerUnlockStake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'unlockStake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iStakeManagerABI,
    functionName: 'unlockStake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'unlockStake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"withdrawStake"`.
 */
export function usePrepareIStakeManagerWithdrawStake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'withdrawStake'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iStakeManagerABI,
    functionName: 'withdrawStake',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'withdrawStake'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iStakeManagerABI}__ and `functionName` set to `"withdrawTo"`.
 */
export function usePrepareIStakeManagerWithdrawTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'withdrawTo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iStakeManagerABI,
    functionName: 'withdrawTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iStakeManagerABI, 'withdrawTo'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iStakeManagerABI}__.
 */
export function useIStakeManagerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iStakeManagerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iStakeManagerABI,
    ...config,
  } as UseContractEventConfig<typeof iStakeManagerABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iStakeManagerABI}__ and `eventName` set to `"Deposited"`.
 */
export function useIStakeManagerDepositedEvent(
  config: Omit<
    UseContractEventConfig<typeof iStakeManagerABI, 'Deposited'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iStakeManagerABI,
    eventName: 'Deposited',
    ...config,
  } as UseContractEventConfig<typeof iStakeManagerABI, 'Deposited'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iStakeManagerABI}__ and `eventName` set to `"StakeLocked"`.
 */
export function useIStakeManagerStakeLockedEvent(
  config: Omit<
    UseContractEventConfig<typeof iStakeManagerABI, 'StakeLocked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iStakeManagerABI,
    eventName: 'StakeLocked',
    ...config,
  } as UseContractEventConfig<typeof iStakeManagerABI, 'StakeLocked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iStakeManagerABI}__ and `eventName` set to `"StakeUnlocked"`.
 */
export function useIStakeManagerStakeUnlockedEvent(
  config: Omit<
    UseContractEventConfig<typeof iStakeManagerABI, 'StakeUnlocked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iStakeManagerABI,
    eventName: 'StakeUnlocked',
    ...config,
  } as UseContractEventConfig<typeof iStakeManagerABI, 'StakeUnlocked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iStakeManagerABI}__ and `eventName` set to `"StakeWithdrawn"`.
 */
export function useIStakeManagerStakeWithdrawnEvent(
  config: Omit<
    UseContractEventConfig<typeof iStakeManagerABI, 'StakeWithdrawn'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iStakeManagerABI,
    eventName: 'StakeWithdrawn',
    ...config,
  } as UseContractEventConfig<typeof iStakeManagerABI, 'StakeWithdrawn'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iStakeManagerABI}__ and `eventName` set to `"Withdrawn"`.
 */
export function useIStakeManagerWithdrawnEvent(
  config: Omit<
    UseContractEventConfig<typeof iStakeManagerABI, 'Withdrawn'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iStakeManagerABI,
    eventName: 'Withdrawn',
    ...config,
  } as UseContractEventConfig<typeof iStakeManagerABI, 'Withdrawn'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link libSandboxABI}__.
 */
export function useLibSandboxRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof libSandboxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof libSandboxABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: libSandboxABI,
    ...config,
  } as UseContractReadConfig<typeof libSandboxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link libSandboxABI}__ and `functionName` set to `"footer"`.
 */
export function useLibSandboxFooter<
  TFunctionName extends 'footer',
  TSelectData = ReadContractResult<typeof libSandboxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof libSandboxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: libSandboxABI,
    functionName: 'footer',
    ...config,
  } as UseContractReadConfig<typeof libSandboxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link libSandboxABI}__ and `functionName` set to `"header"`.
 */
export function useLibSandboxHeader<
  TFunctionName extends 'header',
  TSelectData = ReadContractResult<typeof libSandboxABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof libSandboxABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: libSandboxABI,
    functionName: 'header',
    ...config,
  } as UseContractReadConfig<typeof libSandboxABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lockableABI}__.
 */
export function useLockableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lockableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lockableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: lockableABI,
    ...config,
  } as UseContractReadConfig<typeof lockableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lockableABI}__ and `functionName` set to `"isLocked"`.
 */
export function useLockableIsLocked<
  TFunctionName extends 'isLocked',
  TSelectData = ReadContractResult<typeof lockableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lockableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lockableABI,
    functionName: 'isLocked',
    ...config,
  } as UseContractReadConfig<typeof lockableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lockableABI}__ and `functionName` set to `"lockedUntil"`.
 */
export function useLockableLockedUntil<
  TFunctionName extends 'lockedUntil',
  TSelectData = ReadContractResult<typeof lockableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lockableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: lockableABI,
    functionName: 'lockedUntil',
    ...config,
  } as UseContractReadConfig<typeof lockableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lockableABI}__.
 */
export function useLockableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lockableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof lockableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof lockableABI, TFunctionName, TMode>({
    abi: lockableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link lockableABI}__ and `functionName` set to `"lock"`.
 */
export function useLockableLock<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof lockableABI,
          'lock'
        >['request']['abi'],
        'lock',
        TMode
      > & { functionName?: 'lock' }
    : UseContractWriteConfig<typeof lockableABI, 'lock', TMode> & {
        abi?: never
        functionName?: 'lock'
      } = {} as any,
) {
  return useContractWrite<typeof lockableABI, 'lock', TMode>({
    abi: lockableABI,
    functionName: 'lock',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lockableABI}__.
 */
export function usePrepareLockableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lockableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lockableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof lockableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link lockableABI}__ and `functionName` set to `"lock"`.
 */
export function usePrepareLockableLock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof lockableABI, 'lock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: lockableABI,
    functionName: 'lock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof lockableABI, 'lock'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lockableABI}__.
 */
export function useLockableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof lockableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: lockableABI,
    ...config,
  } as UseContractEventConfig<typeof lockableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link lockableABI}__ and `eventName` set to `"LockUpdated"`.
 */
export function useLockableLockUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof lockableABI, 'LockUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: lockableABI,
    eventName: 'LockUpdated',
    ...config,
  } as UseContractEventConfig<typeof lockableABI, 'LockUpdated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__.
 */
export function useMulticall3Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getBasefee"`.
 */
export function useMulticall3GetBasefee<
  TFunctionName extends 'getBasefee',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getBasefee',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getBlockHash"`.
 */
export function useMulticall3GetBlockHash<
  TFunctionName extends 'getBlockHash',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getBlockHash',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getBlockNumber"`.
 */
export function useMulticall3GetBlockNumber<
  TFunctionName extends 'getBlockNumber',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getBlockNumber',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getChainId"`.
 */
export function useMulticall3GetChainId<
  TFunctionName extends 'getChainId',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getChainId',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getCurrentBlockCoinbase"`.
 */
export function useMulticall3GetCurrentBlockCoinbase<
  TFunctionName extends 'getCurrentBlockCoinbase',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getCurrentBlockCoinbase',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getCurrentBlockDifficulty"`.
 */
export function useMulticall3GetCurrentBlockDifficulty<
  TFunctionName extends 'getCurrentBlockDifficulty',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getCurrentBlockDifficulty',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getCurrentBlockGasLimit"`.
 */
export function useMulticall3GetCurrentBlockGasLimit<
  TFunctionName extends 'getCurrentBlockGasLimit',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getCurrentBlockGasLimit',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getCurrentBlockTimestamp"`.
 */
export function useMulticall3GetCurrentBlockTimestamp<
  TFunctionName extends 'getCurrentBlockTimestamp',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getCurrentBlockTimestamp',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getEthBalance"`.
 */
export function useMulticall3GetEthBalance<
  TFunctionName extends 'getEthBalance',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getEthBalance',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"getLastBlockHash"`.
 */
export function useMulticall3GetLastBlockHash<
  TFunctionName extends 'getLastBlockHash',
  TSelectData = ReadContractResult<typeof multicall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multicall3ABI,
    functionName: 'getLastBlockHash',
    ...config,
  } as UseContractReadConfig<typeof multicall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multicall3ABI}__.
 */
export function useMulticall3Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multicall3ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof multicall3ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof multicall3ABI, TFunctionName, TMode>({
    abi: multicall3ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function useMulticall3Aggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multicall3ABI,
          'aggregate'
        >['request']['abi'],
        'aggregate',
        TMode
      > & { functionName?: 'aggregate' }
    : UseContractWriteConfig<typeof multicall3ABI, 'aggregate', TMode> & {
        abi?: never
        functionName?: 'aggregate'
      } = {} as any,
) {
  return useContractWrite<typeof multicall3ABI, 'aggregate', TMode>({
    abi: multicall3ABI,
    functionName: 'aggregate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function useMulticall3Aggregate3<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multicall3ABI,
          'aggregate3'
        >['request']['abi'],
        'aggregate3',
        TMode
      > & { functionName?: 'aggregate3' }
    : UseContractWriteConfig<typeof multicall3ABI, 'aggregate3', TMode> & {
        abi?: never
        functionName?: 'aggregate3'
      } = {} as any,
) {
  return useContractWrite<typeof multicall3ABI, 'aggregate3', TMode>({
    abi: multicall3ABI,
    functionName: 'aggregate3',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function useMulticall3Aggregate3Value<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multicall3ABI,
          'aggregate3Value'
        >['request']['abi'],
        'aggregate3Value',
        TMode
      > & { functionName?: 'aggregate3Value' }
    : UseContractWriteConfig<typeof multicall3ABI, 'aggregate3Value', TMode> & {
        abi?: never
        functionName?: 'aggregate3Value'
      } = {} as any,
) {
  return useContractWrite<typeof multicall3ABI, 'aggregate3Value', TMode>({
    abi: multicall3ABI,
    functionName: 'aggregate3Value',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function useMulticall3BlockAndAggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multicall3ABI,
          'blockAndAggregate'
        >['request']['abi'],
        'blockAndAggregate',
        TMode
      > & { functionName?: 'blockAndAggregate' }
    : UseContractWriteConfig<
        typeof multicall3ABI,
        'blockAndAggregate',
        TMode
      > & {
        abi?: never
        functionName?: 'blockAndAggregate'
      } = {} as any,
) {
  return useContractWrite<typeof multicall3ABI, 'blockAndAggregate', TMode>({
    abi: multicall3ABI,
    functionName: 'blockAndAggregate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function useMulticall3TryAggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multicall3ABI,
          'tryAggregate'
        >['request']['abi'],
        'tryAggregate',
        TMode
      > & { functionName?: 'tryAggregate' }
    : UseContractWriteConfig<typeof multicall3ABI, 'tryAggregate', TMode> & {
        abi?: never
        functionName?: 'tryAggregate'
      } = {} as any,
) {
  return useContractWrite<typeof multicall3ABI, 'tryAggregate', TMode>({
    abi: multicall3ABI,
    functionName: 'tryAggregate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function useMulticall3TryBlockAndAggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multicall3ABI,
          'tryBlockAndAggregate'
        >['request']['abi'],
        'tryBlockAndAggregate',
        TMode
      > & { functionName?: 'tryBlockAndAggregate' }
    : UseContractWriteConfig<
        typeof multicall3ABI,
        'tryBlockAndAggregate',
        TMode
      > & {
        abi?: never
        functionName?: 'tryBlockAndAggregate'
      } = {} as any,
) {
  return useContractWrite<typeof multicall3ABI, 'tryBlockAndAggregate', TMode>({
    abi: multicall3ABI,
    functionName: 'tryBlockAndAggregate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multicall3ABI}__.
 */
export function usePrepareMulticall3Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multicall3ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multicall3ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof multicall3ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function usePrepareMulticall3Aggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multicall3ABI, 'aggregate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multicall3ABI,
    functionName: 'aggregate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multicall3ABI, 'aggregate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function usePrepareMulticall3Aggregate3(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multicall3ABI, 'aggregate3'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multicall3ABI,
    functionName: 'aggregate3',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multicall3ABI, 'aggregate3'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function usePrepareMulticall3Aggregate3Value(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multicall3ABI, 'aggregate3Value'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multicall3ABI,
    functionName: 'aggregate3Value',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multicall3ABI, 'aggregate3Value'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function usePrepareMulticall3BlockAndAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multicall3ABI, 'blockAndAggregate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multicall3ABI,
    functionName: 'blockAndAggregate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multicall3ABI, 'blockAndAggregate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function usePrepareMulticall3TryAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multicall3ABI, 'tryAggregate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multicall3ABI,
    functionName: 'tryAggregate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multicall3ABI, 'tryAggregate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multicall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function usePrepareMulticall3TryBlockAndAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multicall3ABI, 'tryBlockAndAggregate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multicall3ABI,
    functionName: 'tryBlockAndAggregate',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof multicall3ABI,
    'tryBlockAndAggregate'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedAccountExecutorABI}__.
 */
export function useNestedAccountExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof nestedAccountExecutorABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof nestedAccountExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: nestedAccountExecutorABI,
    ...config,
  } as UseContractReadConfig<
    typeof nestedAccountExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"erc6551Registry"`.
 */
export function useNestedAccountExecutorErc6551Registry<
  TFunctionName extends 'erc6551Registry',
  TSelectData = ReadContractResult<
    typeof nestedAccountExecutorABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof nestedAccountExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: nestedAccountExecutorABI,
    functionName: 'erc6551Registry',
    ...config,
  } as UseContractReadConfig<
    typeof nestedAccountExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"extsload"`.
 */
export function useNestedAccountExecutorExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<
    typeof nestedAccountExecutorABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof nestedAccountExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: nestedAccountExecutorABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof nestedAccountExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__.
 */
export function useNestedAccountExecutorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nestedAccountExecutorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof nestedAccountExecutorABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<
    typeof nestedAccountExecutorABI,
    TFunctionName,
    TMode
  >({ abi: nestedAccountExecutorABI, ...config } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"executeNested"`.
 */
export function useNestedAccountExecutorExecuteNested<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nestedAccountExecutorABI,
          'executeNested'
        >['request']['abi'],
        'executeNested',
        TMode
      > & { functionName?: 'executeNested' }
    : UseContractWriteConfig<
        typeof nestedAccountExecutorABI,
        'executeNested',
        TMode
      > & {
        abi?: never
        functionName?: 'executeNested'
      } = {} as any,
) {
  return useContractWrite<
    typeof nestedAccountExecutorABI,
    'executeNested',
    TMode
  >({
    abi: nestedAccountExecutorABI,
    functionName: 'executeNested',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function useNestedAccountExecutorExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nestedAccountExecutorABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<
        typeof nestedAccountExecutorABI,
        'extcall',
        TMode
      > & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof nestedAccountExecutorABI, 'extcall', TMode>({
    abi: nestedAccountExecutorABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function useNestedAccountExecutorExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nestedAccountExecutorABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<
        typeof nestedAccountExecutorABI,
        'extcreate',
        TMode
      > & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof nestedAccountExecutorABI, 'extcreate', TMode>({
    abi: nestedAccountExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useNestedAccountExecutorExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nestedAccountExecutorABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<
        typeof nestedAccountExecutorABI,
        'extcreate2',
        TMode
      > & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof nestedAccountExecutorABI, 'extcreate2', TMode>(
    {
      abi: nestedAccountExecutorABI,
      functionName: 'extcreate2',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__.
 */
export function usePrepareNestedAccountExecutorWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof nestedAccountExecutorABI,
      TFunctionName
    >,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nestedAccountExecutorABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof nestedAccountExecutorABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"executeNested"`.
 */
export function usePrepareNestedAccountExecutorExecuteNested(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof nestedAccountExecutorABI,
      'executeNested'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nestedAccountExecutorABI,
    functionName: 'executeNested',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof nestedAccountExecutorABI,
    'executeNested'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareNestedAccountExecutorExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nestedAccountExecutorABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nestedAccountExecutorABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof nestedAccountExecutorABI,
    'extcall'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareNestedAccountExecutorExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nestedAccountExecutorABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nestedAccountExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof nestedAccountExecutorABI,
    'extcreate'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedAccountExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareNestedAccountExecutorExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof nestedAccountExecutorABI,
      'extcreate2'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nestedAccountExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof nestedAccountExecutorABI,
    'extcreate2'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link overridableABI}__.
 */
export function useOverridableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof overridableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof overridableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: overridableABI,
    ...config,
  } as UseContractReadConfig<typeof overridableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link overridableABI}__ and `functionName` set to `"overrides"`.
 */
export function useOverridableOverrides<
  TFunctionName extends 'overrides',
  TSelectData = ReadContractResult<typeof overridableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof overridableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: overridableABI,
    functionName: 'overrides',
    ...config,
  } as UseContractReadConfig<typeof overridableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link overridableABI}__.
 */
export function useOverridableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof overridableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof overridableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof overridableABI, TFunctionName, TMode>({
    abi: overridableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link overridableABI}__ and `functionName` set to `"setOverrides"`.
 */
export function useOverridableSetOverrides<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof overridableABI,
          'setOverrides'
        >['request']['abi'],
        'setOverrides',
        TMode
      > & { functionName?: 'setOverrides' }
    : UseContractWriteConfig<typeof overridableABI, 'setOverrides', TMode> & {
        abi?: never
        functionName?: 'setOverrides'
      } = {} as any,
) {
  return useContractWrite<typeof overridableABI, 'setOverrides', TMode>({
    abi: overridableABI,
    functionName: 'setOverrides',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link overridableABI}__.
 */
export function usePrepareOverridableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof overridableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: overridableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof overridableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link overridableABI}__ and `functionName` set to `"setOverrides"`.
 */
export function usePrepareOverridableSetOverrides(
  config: Omit<
    UsePrepareContractWriteConfig<typeof overridableABI, 'setOverrides'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: overridableABI,
    functionName: 'setOverrides',
    ...config,
  } as UsePrepareContractWriteConfig<typeof overridableABI, 'setOverrides'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link overridableABI}__.
 */
export function useOverridableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof overridableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: overridableABI,
    ...config,
  } as UseContractEventConfig<typeof overridableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link overridableABI}__ and `eventName` set to `"OverrideUpdated"`.
 */
export function useOverridableOverrideUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof overridableABI, 'OverrideUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: overridableABI,
    eventName: 'OverrideUpdated',
    ...config,
  } as UseContractEventConfig<typeof overridableABI, 'OverrideUpdated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnableOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ownableABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownableABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, TFunctionName, TMode>({
    abi: ownableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useOwnableRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownableABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'renounceOwnership', TMode>({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOwnableTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownableABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof ownableABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, 'transferOwnership', TMode>({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function usePrepareOwnableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareOwnableRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOwnableTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ownableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownableABI,
    ...config,
  } as UseContractEventConfig<typeof ownableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOwnableOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof ownableABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownableABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof ownableABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownable2StepABI}__.
 */
export function useOwnable2StepRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownable2StepABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownable2StepABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ownable2StepABI,
    ...config,
  } as UseContractReadConfig<
    typeof ownable2StepABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnable2StepOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof ownable2StepABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownable2StepABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ownable2StepABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof ownable2StepABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"pendingOwner"`.
 */
export function useOwnable2StepPendingOwner<
  TFunctionName extends 'pendingOwner',
  TSelectData = ReadContractResult<typeof ownable2StepABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownable2StepABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ownable2StepABI,
    functionName: 'pendingOwner',
    ...config,
  } as UseContractReadConfig<
    typeof ownable2StepABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownable2StepABI}__.
 */
export function useOwnable2StepWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownable2StepABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownable2StepABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ownable2StepABI, TFunctionName, TMode>({
    abi: ownable2StepABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function useOwnable2StepAcceptOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownable2StepABI,
          'acceptOwnership'
        >['request']['abi'],
        'acceptOwnership',
        TMode
      > & { functionName?: 'acceptOwnership' }
    : UseContractWriteConfig<
        typeof ownable2StepABI,
        'acceptOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'acceptOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownable2StepABI, 'acceptOwnership', TMode>({
    abi: ownable2StepABI,
    functionName: 'acceptOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useOwnable2StepRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownable2StepABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<
        typeof ownable2StepABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownable2StepABI, 'renounceOwnership', TMode>({
    abi: ownable2StepABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOwnable2StepTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownable2StepABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<
        typeof ownable2StepABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof ownable2StepABI, 'transferOwnership', TMode>({
    abi: ownable2StepABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownable2StepABI}__.
 */
export function usePrepareOwnable2StepWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownable2StepABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownable2StepABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownable2StepABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"acceptOwnership"`.
 */
export function usePrepareOwnable2StepAcceptOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownable2StepABI, 'acceptOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownable2StepABI,
    functionName: 'acceptOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownable2StepABI, 'acceptOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareOwnable2StepRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownable2StepABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownable2StepABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ownable2StepABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownable2StepABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOwnable2StepTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownable2StepABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownable2StepABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ownable2StepABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownable2StepABI}__.
 */
export function useOwnable2StepEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ownable2StepABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownable2StepABI,
    ...config,
  } as UseContractEventConfig<typeof ownable2StepABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownable2StepABI}__ and `eventName` set to `"OwnershipTransferStarted"`.
 */
export function useOwnable2StepOwnershipTransferStartedEvent(
  config: Omit<
    UseContractEventConfig<typeof ownable2StepABI, 'OwnershipTransferStarted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownable2StepABI,
    eventName: 'OwnershipTransferStarted',
    ...config,
  } as UseContractEventConfig<
    typeof ownable2StepABI,
    'OwnershipTransferStarted'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownable2StepABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOwnable2StepOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof ownable2StepABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownable2StepABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof ownable2StepABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__.
 */
export function usePackAccountRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"entryPoint"`.
 */
export function usePackAccountEntryPoint<
  TFunctionName extends 'entryPoint',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'entryPoint',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"erc6551Registry"`.
 */
export function usePackAccountErc6551Registry<
  TFunctionName extends 'erc6551Registry',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'erc6551Registry',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"extsload"`.
 */
export function usePackAccountExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"getNonce"`.
 */
export function usePackAccountGetNonce<
  TFunctionName extends 'getNonce',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'getNonce',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"isLocked"`.
 */
export function usePackAccountIsLocked<
  TFunctionName extends 'isLocked',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'isLocked',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"isTrustedForwarder"`.
 */
export function usePackAccountIsTrustedForwarder<
  TFunctionName extends 'isTrustedForwarder',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'isTrustedForwarder',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function usePackAccountIsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"isValidSigner"`.
 */
export function usePackAccountIsValidSigner<
  TFunctionName extends 'isValidSigner',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'isValidSigner',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"lockedUntil"`.
 */
export function usePackAccountLockedUntil<
  TFunctionName extends 'lockedUntil',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'lockedUntil',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"overrides"`.
 */
export function usePackAccountOverrides<
  TFunctionName extends 'overrides',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'overrides',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"owner"`.
 */
export function usePackAccountOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"permissions"`.
 */
export function usePackAccountPermissions<
  TFunctionName extends 'permissions',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'permissions',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"state"`.
 */
export function usePackAccountState<
  TFunctionName extends 'state',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'state',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePackAccountSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"token"`.
 */
export function usePackAccountToken<
  TFunctionName extends 'token',
  TSelectData = ReadContractResult<typeof packAccountABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packAccountABI,
    functionName: 'token',
    ...config,
  } as UseContractReadConfig<typeof packAccountABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__.
 */
export function usePackAccountWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packAccountABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, TFunctionName, TMode>({
    abi: packAccountABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"execute"`.
 */
export function usePackAccountExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof packAccountABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'execute', TMode>({
    abi: packAccountABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"executeBatch"`.
 */
export function usePackAccountExecuteBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'executeBatch'
        >['request']['abi'],
        'executeBatch',
        TMode
      > & { functionName?: 'executeBatch' }
    : UseContractWriteConfig<typeof packAccountABI, 'executeBatch', TMode> & {
        abi?: never
        functionName?: 'executeBatch'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'executeBatch', TMode>({
    abi: packAccountABI,
    functionName: 'executeBatch',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"executeNested"`.
 */
export function usePackAccountExecuteNested<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'executeNested'
        >['request']['abi'],
        'executeNested',
        TMode
      > & { functionName?: 'executeNested' }
    : UseContractWriteConfig<typeof packAccountABI, 'executeNested', TMode> & {
        abi?: never
        functionName?: 'executeNested'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'executeNested', TMode>({
    abi: packAccountABI,
    functionName: 'executeNested',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"extcall"`.
 */
export function usePackAccountExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof packAccountABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'extcall', TMode>({
    abi: packAccountABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePackAccountExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<typeof packAccountABI, 'extcreate', TMode> & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'extcreate', TMode>({
    abi: packAccountABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePackAccountExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<typeof packAccountABI, 'extcreate2', TMode> & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'extcreate2', TMode>({
    abi: packAccountABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"lock"`.
 */
export function usePackAccountLock<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'lock'
        >['request']['abi'],
        'lock',
        TMode
      > & { functionName?: 'lock' }
    : UseContractWriteConfig<typeof packAccountABI, 'lock', TMode> & {
        abi?: never
        functionName?: 'lock'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'lock', TMode>({
    abi: packAccountABI,
    functionName: 'lock',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePackAccountOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof packAccountABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof packAccountABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: packAccountABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePackAccountOnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof packAccountABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'onERC1155Received', TMode>({
    abi: packAccountABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePackAccountOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<
        typeof packAccountABI,
        'onERC721Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'onERC721Received', TMode>({
    abi: packAccountABI,
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"setOverrides"`.
 */
export function usePackAccountSetOverrides<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'setOverrides'
        >['request']['abi'],
        'setOverrides',
        TMode
      > & { functionName?: 'setOverrides' }
    : UseContractWriteConfig<typeof packAccountABI, 'setOverrides', TMode> & {
        abi?: never
        functionName?: 'setOverrides'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'setOverrides', TMode>({
    abi: packAccountABI,
    functionName: 'setOverrides',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"setPermissions"`.
 */
export function usePackAccountSetPermissions<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'setPermissions'
        >['request']['abi'],
        'setPermissions',
        TMode
      > & { functionName?: 'setPermissions' }
    : UseContractWriteConfig<typeof packAccountABI, 'setPermissions', TMode> & {
        abi?: never
        functionName?: 'setPermissions'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'setPermissions', TMode>({
    abi: packAccountABI,
    functionName: 'setPermissions',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function usePackAccountValidateUserOp<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packAccountABI,
          'validateUserOp'
        >['request']['abi'],
        'validateUserOp',
        TMode
      > & { functionName?: 'validateUserOp' }
    : UseContractWriteConfig<typeof packAccountABI, 'validateUserOp', TMode> & {
        abi?: never
        functionName?: 'validateUserOp'
      } = {} as any,
) {
  return useContractWrite<typeof packAccountABI, 'validateUserOp', TMode>({
    abi: packAccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__.
 */
export function usePreparePackAccountWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"execute"`.
 */
export function usePreparePackAccountExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'execute'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"executeBatch"`.
 */
export function usePreparePackAccountExecuteBatch(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'executeBatch'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'executeBatch',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'executeBatch'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"executeNested"`.
 */
export function usePreparePackAccountExecuteNested(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'executeNested'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'executeNested',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'executeNested'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"extcall"`.
 */
export function usePreparePackAccountExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePreparePackAccountExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePreparePackAccountExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'extcreate2'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"lock"`.
 */
export function usePreparePackAccountLock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'lock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'lock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'lock'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePreparePackAccountOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof packAccountABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof packAccountABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePreparePackAccountOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'onERC1155Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof packAccountABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePreparePackAccountOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'onERC721Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'onERC721Received'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"setOverrides"`.
 */
export function usePreparePackAccountSetOverrides(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'setOverrides'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'setOverrides',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'setOverrides'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"setPermissions"`.
 */
export function usePreparePackAccountSetPermissions(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'setPermissions'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'setPermissions',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'setPermissions'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packAccountABI}__ and `functionName` set to `"validateUserOp"`.
 */
export function usePreparePackAccountValidateUserOp(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packAccountABI, 'validateUserOp'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packAccountABI,
    functionName: 'validateUserOp',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packAccountABI, 'validateUserOp'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packAccountABI}__.
 */
export function usePackAccountEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof packAccountABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: packAccountABI,
    ...config,
  } as UseContractEventConfig<typeof packAccountABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packAccountABI}__ and `eventName` set to `"LockUpdated"`.
 */
export function usePackAccountLockUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof packAccountABI, 'LockUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packAccountABI,
    eventName: 'LockUpdated',
    ...config,
  } as UseContractEventConfig<typeof packAccountABI, 'LockUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packAccountABI}__ and `eventName` set to `"OverrideUpdated"`.
 */
export function usePackAccountOverrideUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof packAccountABI, 'OverrideUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packAccountABI,
    eventName: 'OverrideUpdated',
    ...config,
  } as UseContractEventConfig<typeof packAccountABI, 'OverrideUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packAccountABI}__ and `eventName` set to `"PermissionUpdated"`.
 */
export function usePackAccountPermissionUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof packAccountABI, 'PermissionUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packAccountABI,
    eventName: 'PermissionUpdated',
    ...config,
  } as UseContractEventConfig<typeof packAccountABI, 'PermissionUpdated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePackMainRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"CALL_OPERATION"`.
 */
export function usePackMainCallOperation<
  TFunctionName extends 'CALL_OPERATION',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'CALL_OPERATION',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"VERSION"`.
 */
export function usePackMainVersion<
  TFunctionName extends 'VERSION',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'VERSION',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"account"`.
 */
export function usePackMainAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"accountNonce"`.
 */
export function usePackMainAccountNonce<
  TFunctionName extends 'accountNonce',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'accountNonce',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePackMainBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"claimPublicKey"`.
 */
export function usePackMainClaimPublicKey<
  TFunctionName extends 'claimPublicKey',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'claimPublicKey',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"creationBlock"`.
 */
export function usePackMainCreationBlock<
  TFunctionName extends 'creationBlock',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'creationBlock',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"getApproved"`.
 */
export function usePackMainGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"implementation"`.
 */
export function usePackMainImplementation<
  TFunctionName extends 'implementation',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'implementation',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function usePackMainIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"modulesWhitelist"`.
 */
export function usePackMainModulesWhitelist<
  TFunctionName extends 'modulesWhitelist',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'modulesWhitelist',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"name"`.
 */
export function usePackMainName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"owner"`.
 */
export function usePackMainOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"ownerOf"`.
 */
export function usePackMainOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"packModules"`.
 */
export function usePackMainPackModules<
  TFunctionName extends 'packModules',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'packModules',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"packState"`.
 */
export function usePackMainPackState<
  TFunctionName extends 'packState',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'packState',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"packStateURIs"`.
 */
export function usePackMainPackStateUrIs<
  TFunctionName extends 'packStateURIs',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'packStateURIs',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"registry"`.
 */
export function usePackMainRegistry<
  TFunctionName extends 'registry',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'registry',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"registryChainId"`.
 */
export function usePackMainRegistryChainId<
  TFunctionName extends 'registryChainId',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'registryChainId',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"salt"`.
 */
export function usePackMainSalt<
  TFunctionName extends 'salt',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'salt',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePackMainSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"symbol"`.
 */
export function usePackMainSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function usePackMainTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function usePackMainTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"tokenURI"`.
 */
export function usePackMainTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"totalSupply"`.
 */
export function usePackMainTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof packMainABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packMainABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof packMainABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePackMainWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packMainABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, TFunctionName, TMode>({
    abi: packMainABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"approve"`.
 */
export function usePackMainApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof packMainABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'approve', TMode>({
    abi: packMainABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"open"`.
 */
export function usePackMainOpen<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'open'
        >['request']['abi'],
        'open',
        TMode
      > & { functionName?: 'open' }
    : UseContractWriteConfig<typeof packMainABI, 'open', TMode> & {
        abi?: never
        functionName?: 'open'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'open', TMode>({
    abi: packMainABI,
    functionName: 'open',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"pack"`.
 */
export function usePackMainPack<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'pack'
        >['request']['abi'],
        'pack',
        TMode
      > & { functionName?: 'pack' }
    : UseContractWriteConfig<typeof packMainABI, 'pack', TMode> & {
        abi?: never
        functionName?: 'pack'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'pack', TMode>({
    abi: packMainABI,
    functionName: 'pack',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePackMainRenounceOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & { functionName?: 'renounceOwnership' }
    : UseContractWriteConfig<typeof packMainABI, 'renounceOwnership', TMode> & {
        abi?: never
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'renounceOwnership', TMode>({
    abi: packMainABI,
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"revoke"`.
 */
export function usePackMainRevoke<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'revoke'
        >['request']['abi'],
        'revoke',
        TMode
      > & { functionName?: 'revoke' }
    : UseContractWriteConfig<typeof packMainABI, 'revoke', TMode> & {
        abi?: never
        functionName?: 'revoke'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'revoke', TMode>({
    abi: packMainABI,
    functionName: 'revoke',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePackMainSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof packMainABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'safeTransferFrom', TMode>({
    abi: packMainABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePackMainSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof packMainABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'setApprovalForAll', TMode>({
    abi: packMainABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setModulesWhitelist"`.
 */
export function usePackMainSetModulesWhitelist<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'setModulesWhitelist'
        >['request']['abi'],
        'setModulesWhitelist',
        TMode
      > & { functionName?: 'setModulesWhitelist' }
    : UseContractWriteConfig<
        typeof packMainABI,
        'setModulesWhitelist',
        TMode
      > & {
        abi?: never
        functionName?: 'setModulesWhitelist'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'setModulesWhitelist', TMode>({
    abi: packMainABI,
    functionName: 'setModulesWhitelist',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePackMainTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof packMainABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'transferFrom', TMode>({
    abi: packMainABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePackMainTransferOwnership<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packMainABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & { functionName?: 'transferOwnership' }
    : UseContractWriteConfig<typeof packMainABI, 'transferOwnership', TMode> & {
        abi?: never
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof packMainABI, 'transferOwnership', TMode>({
    abi: packMainABI,
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePreparePackMainWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"approve"`.
 */
export function usePreparePackMainApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"open"`.
 */
export function usePreparePackMainOpen(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'open'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'open',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'open'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"pack"`.
 */
export function usePreparePackMainPack(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'pack'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'pack',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'pack'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePreparePackMainRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'renounceOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"revoke"`.
 */
export function usePreparePackMainRevoke(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'revoke'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'revoke',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'revoke'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePreparePackMainSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePreparePackMainSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"setModulesWhitelist"`.
 */
export function usePreparePackMainSetModulesWhitelist(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'setModulesWhitelist'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'setModulesWhitelist',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'setModulesWhitelist'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePreparePackMainTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packMainABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePreparePackMainTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packMainABI, 'transferOwnership'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packMainABI,
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packMainABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__.
 */
export function usePackMainEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    ...config,
  } as UseContractEventConfig<typeof packMainABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"Approval"`.
 */
export function usePackMainApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function usePackMainApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function usePackMainOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'OwnershipTransferred'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"PackCreated"`.
 */
export function usePackMainPackCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'PackCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'PackCreated',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'PackCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"PackOpened"`.
 */
export function usePackMainPackOpenedEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'PackOpened'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'PackOpened',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'PackOpened'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"PackRevoked"`.
 */
export function usePackMainPackRevokedEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'PackRevoked'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'PackRevoked',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'PackRevoked'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packMainABI}__ and `eventName` set to `"Transfer"`.
 */
export function usePackMainTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof packMainABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packMainABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof packMainABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePackNftRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePackNftBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"creationBlock"`.
 */
export function usePackNftCreationBlock<
  TFunctionName extends 'creationBlock',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'creationBlock',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"getApproved"`.
 */
export function usePackNftGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function usePackNftIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"name"`.
 */
export function usePackNftName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"ownerOf"`.
 */
export function usePackNftOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"packState"`.
 */
export function usePackNftPackState<
  TFunctionName extends 'packState',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'packState',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"packStateURIs"`.
 */
export function usePackNftPackStateUrIs<
  TFunctionName extends 'packStateURIs',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'packStateURIs',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePackNftSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"symbol"`.
 */
export function usePackNftSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function usePackNftTokenByIndex<
  TFunctionName extends 'tokenByIndex',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'tokenByIndex',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function usePackNftTokenOfOwnerByIndex<
  TFunctionName extends 'tokenOfOwnerByIndex',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'tokenOfOwnerByIndex',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"tokenURI"`.
 */
export function usePackNftTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"totalSupply"`.
 */
export function usePackNftTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof packNftABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packNftABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof packNftABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePackNftWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof packNftABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packNftABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, TFunctionName, TMode>({
    abi: packNftABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"approve"`.
 */
export function usePackNftApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof packNftABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'approve', TMode>({
    abi: packNftABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePackNftSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof packNftABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'safeTransferFrom', TMode>({
    abi: packNftABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePackNftSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof packNftABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'setApprovalForAll', TMode>({
    abi: packNftABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePackNftTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packNftABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof packNftABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof packNftABI, 'transferFrom', TMode>({
    abi: packNftABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePreparePackNftWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"approve"`.
 */
export function usePreparePackNftApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePreparePackNftSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePreparePackNftSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packNftABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePreparePackNftTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packNftABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packNftABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packNftABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__.
 */
export function usePackNftEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    ...config,
  } as UseContractEventConfig<typeof packNftABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__ and `eventName` set to `"Approval"`.
 */
export function usePackNftApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof packNftABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function usePackNftApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof packNftABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packNftABI}__ and `eventName` set to `"Transfer"`.
 */
export function usePackNftTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof packNftABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packNftABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof packNftABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePackRegistryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof packRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packRegistryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: packRegistryABI,
    ...config,
  } as UseContractReadConfig<
    typeof packRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link packRegistryABI}__ and `functionName` set to `"account"`.
 */
export function usePackRegistryAccount<
  TFunctionName extends 'account',
  TSelectData = ReadContractResult<typeof packRegistryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof packRegistryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: packRegistryABI,
    functionName: 'account',
    ...config,
  } as UseContractReadConfig<
    typeof packRegistryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePackRegistryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packRegistryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof packRegistryABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof packRegistryABI, TFunctionName, TMode>({
    abi: packRegistryABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link packRegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePackRegistryCreateAccount<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof packRegistryABI,
          'createAccount'
        >['request']['abi'],
        'createAccount',
        TMode
      > & { functionName?: 'createAccount' }
    : UseContractWriteConfig<typeof packRegistryABI, 'createAccount', TMode> & {
        abi?: never
        functionName?: 'createAccount'
      } = {} as any,
) {
  return useContractWrite<typeof packRegistryABI, 'createAccount', TMode>({
    abi: packRegistryABI,
    functionName: 'createAccount',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePreparePackRegistryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packRegistryABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packRegistryABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof packRegistryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link packRegistryABI}__ and `functionName` set to `"createAccount"`.
 */
export function usePreparePackRegistryCreateAccount(
  config: Omit<
    UsePrepareContractWriteConfig<typeof packRegistryABI, 'createAccount'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: packRegistryABI,
    functionName: 'createAccount',
    ...config,
  } as UsePrepareContractWriteConfig<typeof packRegistryABI, 'createAccount'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packRegistryABI}__.
 */
export function usePackRegistryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof packRegistryABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: packRegistryABI,
    ...config,
  } as UseContractEventConfig<typeof packRegistryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link packRegistryABI}__ and `eventName` set to `"ERC6551AccountCreated"`.
 */
export function usePackRegistryErc6551AccountCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof packRegistryABI, 'ERC6551AccountCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: packRegistryABI,
    eventName: 'ERC6551AccountCreated',
    ...config,
  } as UseContractEventConfig<typeof packRegistryABI, 'ERC6551AccountCreated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link permissionedABI}__.
 */
export function usePermissionedRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof permissionedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof permissionedABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: permissionedABI,
    ...config,
  } as UseContractReadConfig<
    typeof permissionedABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link permissionedABI}__ and `functionName` set to `"permissions"`.
 */
export function usePermissionedPermissions<
  TFunctionName extends 'permissions',
  TSelectData = ReadContractResult<typeof permissionedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof permissionedABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: permissionedABI,
    functionName: 'permissions',
    ...config,
  } as UseContractReadConfig<
    typeof permissionedABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link permissionedABI}__.
 */
export function usePermissionedWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof permissionedABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof permissionedABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof permissionedABI, TFunctionName, TMode>({
    abi: permissionedABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link permissionedABI}__ and `functionName` set to `"setPermissions"`.
 */
export function usePermissionedSetPermissions<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof permissionedABI,
          'setPermissions'
        >['request']['abi'],
        'setPermissions',
        TMode
      > & { functionName?: 'setPermissions' }
    : UseContractWriteConfig<
        typeof permissionedABI,
        'setPermissions',
        TMode
      > & {
        abi?: never
        functionName?: 'setPermissions'
      } = {} as any,
) {
  return useContractWrite<typeof permissionedABI, 'setPermissions', TMode>({
    abi: permissionedABI,
    functionName: 'setPermissions',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link permissionedABI}__.
 */
export function usePreparePermissionedWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof permissionedABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: permissionedABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof permissionedABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link permissionedABI}__ and `functionName` set to `"setPermissions"`.
 */
export function usePreparePermissionedSetPermissions(
  config: Omit<
    UsePrepareContractWriteConfig<typeof permissionedABI, 'setPermissions'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: permissionedABI,
    functionName: 'setPermissions',
    ...config,
  } as UsePrepareContractWriteConfig<typeof permissionedABI, 'setPermissions'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link permissionedABI}__.
 */
export function usePermissionedEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof permissionedABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: permissionedABI,
    ...config,
  } as UseContractEventConfig<typeof permissionedABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link permissionedABI}__ and `eventName` set to `"PermissionUpdated"`.
 */
export function usePermissionedPermissionUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof permissionedABI, 'PermissionUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: permissionedABI,
    eventName: 'PermissionUpdated',
    ...config,
  } as UseContractEventConfig<typeof permissionedABI, 'PermissionUpdated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link sandboxExecutorABI}__.
 */
export function useSandboxExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof sandboxExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof sandboxExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: sandboxExecutorABI,
    ...config,
  } as UseContractReadConfig<
    typeof sandboxExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link sandboxExecutorABI}__ and `functionName` set to `"extsload"`.
 */
export function useSandboxExecutorExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof sandboxExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof sandboxExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: sandboxExecutorABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof sandboxExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__.
 */
export function useSandboxExecutorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof sandboxExecutorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof sandboxExecutorABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof sandboxExecutorABI, TFunctionName, TMode>({
    abi: sandboxExecutorABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function useSandboxExecutorExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof sandboxExecutorABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof sandboxExecutorABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof sandboxExecutorABI, 'extcall', TMode>({
    abi: sandboxExecutorABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function useSandboxExecutorExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof sandboxExecutorABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<typeof sandboxExecutorABI, 'extcreate', TMode> & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof sandboxExecutorABI, 'extcreate', TMode>({
    abi: sandboxExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useSandboxExecutorExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof sandboxExecutorABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<typeof sandboxExecutorABI, 'extcreate2', TMode> & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof sandboxExecutorABI, 'extcreate2', TMode>({
    abi: sandboxExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__.
 */
export function usePrepareSandboxExecutorWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof sandboxExecutorABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: sandboxExecutorABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof sandboxExecutorABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareSandboxExecutorExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof sandboxExecutorABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: sandboxExecutorABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof sandboxExecutorABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareSandboxExecutorExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof sandboxExecutorABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: sandboxExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof sandboxExecutorABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link sandboxExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareSandboxExecutorExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof sandboxExecutorABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: sandboxExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<typeof sandboxExecutorABI, 'extcreate2'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link signatoryABI}__.
 */
export function useSignatoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof signatoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof signatoryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: signatoryABI,
    ...config,
  } as UseContractReadConfig<typeof signatoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link signatoryABI}__ and `functionName` set to `"isValidSignature"`.
 */
export function useSignatoryIsValidSignature<
  TFunctionName extends 'isValidSignature',
  TSelectData = ReadContractResult<typeof signatoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof signatoryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: signatoryABI,
    functionName: 'isValidSignature',
    ...config,
  } as UseContractReadConfig<typeof signatoryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link signatureValidatorABI}__.
 */
export function useSignatureValidatorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof signatureValidatorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof signatureValidatorABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: signatureValidatorABI,
    ...config,
  } as UseContractReadConfig<
    typeof signatureValidatorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link signatureValidatorABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useSignatureValidatorDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof signatureValidatorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof signatureValidatorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: signatureValidatorABI,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<
    typeof signatureValidatorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link signatureValidatorABI}__ and `functionName` set to `"STRUCT_TYPEHASH"`.
 */
export function useSignatureValidatorStructTypehash<
  TFunctionName extends 'STRUCT_TYPEHASH',
  TSelectData = ReadContractResult<typeof signatureValidatorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof signatureValidatorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: signatureValidatorABI,
    functionName: 'STRUCT_TYPEHASH',
    ...config,
  } as UseContractReadConfig<
    typeof signatureValidatorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenboundExecutorABI}__.
 */
export function useTokenboundExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof tokenboundExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof tokenboundExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: tokenboundExecutorABI,
    ...config,
  } as UseContractReadConfig<
    typeof tokenboundExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"erc6551Registry"`.
 */
export function useTokenboundExecutorErc6551Registry<
  TFunctionName extends 'erc6551Registry',
  TSelectData = ReadContractResult<typeof tokenboundExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof tokenboundExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: tokenboundExecutorABI,
    functionName: 'erc6551Registry',
    ...config,
  } as UseContractReadConfig<
    typeof tokenboundExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"extsload"`.
 */
export function useTokenboundExecutorExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof tokenboundExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof tokenboundExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: tokenboundExecutorABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof tokenboundExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"isTrustedForwarder"`.
 */
export function useTokenboundExecutorIsTrustedForwarder<
  TFunctionName extends 'isTrustedForwarder',
  TSelectData = ReadContractResult<typeof tokenboundExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof tokenboundExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: tokenboundExecutorABI,
    functionName: 'isTrustedForwarder',
    ...config,
  } as UseContractReadConfig<
    typeof tokenboundExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useTokenboundExecutorSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof tokenboundExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof tokenboundExecutorABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: tokenboundExecutorABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof tokenboundExecutorABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__.
 */
export function useTokenboundExecutorWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof tokenboundExecutorABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof tokenboundExecutorABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof tokenboundExecutorABI, TFunctionName, TMode>({
    abi: tokenboundExecutorABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"execute"`.
 */
export function useTokenboundExecutorExecute<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof tokenboundExecutorABI,
          'execute'
        >['request']['abi'],
        'execute',
        TMode
      > & { functionName?: 'execute' }
    : UseContractWriteConfig<typeof tokenboundExecutorABI, 'execute', TMode> & {
        abi?: never
        functionName?: 'execute'
      } = {} as any,
) {
  return useContractWrite<typeof tokenboundExecutorABI, 'execute', TMode>({
    abi: tokenboundExecutorABI,
    functionName: 'execute',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"executeBatch"`.
 */
export function useTokenboundExecutorExecuteBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof tokenboundExecutorABI,
          'executeBatch'
        >['request']['abi'],
        'executeBatch',
        TMode
      > & { functionName?: 'executeBatch' }
    : UseContractWriteConfig<
        typeof tokenboundExecutorABI,
        'executeBatch',
        TMode
      > & {
        abi?: never
        functionName?: 'executeBatch'
      } = {} as any,
) {
  return useContractWrite<typeof tokenboundExecutorABI, 'executeBatch', TMode>({
    abi: tokenboundExecutorABI,
    functionName: 'executeBatch',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"executeNested"`.
 */
export function useTokenboundExecutorExecuteNested<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof tokenboundExecutorABI,
          'executeNested'
        >['request']['abi'],
        'executeNested',
        TMode
      > & { functionName?: 'executeNested' }
    : UseContractWriteConfig<
        typeof tokenboundExecutorABI,
        'executeNested',
        TMode
      > & {
        abi?: never
        functionName?: 'executeNested'
      } = {} as any,
) {
  return useContractWrite<typeof tokenboundExecutorABI, 'executeNested', TMode>(
    {
      abi: tokenboundExecutorABI,
      functionName: 'executeNested',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function useTokenboundExecutorExtcall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof tokenboundExecutorABI,
          'extcall'
        >['request']['abi'],
        'extcall',
        TMode
      > & { functionName?: 'extcall' }
    : UseContractWriteConfig<typeof tokenboundExecutorABI, 'extcall', TMode> & {
        abi?: never
        functionName?: 'extcall'
      } = {} as any,
) {
  return useContractWrite<typeof tokenboundExecutorABI, 'extcall', TMode>({
    abi: tokenboundExecutorABI,
    functionName: 'extcall',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function useTokenboundExecutorExtcreate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof tokenboundExecutorABI,
          'extcreate'
        >['request']['abi'],
        'extcreate',
        TMode
      > & { functionName?: 'extcreate' }
    : UseContractWriteConfig<
        typeof tokenboundExecutorABI,
        'extcreate',
        TMode
      > & {
        abi?: never
        functionName?: 'extcreate'
      } = {} as any,
) {
  return useContractWrite<typeof tokenboundExecutorABI, 'extcreate', TMode>({
    abi: tokenboundExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function useTokenboundExecutorExtcreate2<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof tokenboundExecutorABI,
          'extcreate2'
        >['request']['abi'],
        'extcreate2',
        TMode
      > & { functionName?: 'extcreate2' }
    : UseContractWriteConfig<
        typeof tokenboundExecutorABI,
        'extcreate2',
        TMode
      > & {
        abi?: never
        functionName?: 'extcreate2'
      } = {} as any,
) {
  return useContractWrite<typeof tokenboundExecutorABI, 'extcreate2', TMode>({
    abi: tokenboundExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__.
 */
export function usePrepareTokenboundExecutorWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: tokenboundExecutorABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof tokenboundExecutorABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareTokenboundExecutorExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'execute'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: tokenboundExecutorABI,
    functionName: 'execute',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'execute'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"executeBatch"`.
 */
export function usePrepareTokenboundExecutorExecuteBatch(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'executeBatch'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: tokenboundExecutorABI,
    functionName: 'executeBatch',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof tokenboundExecutorABI,
    'executeBatch'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"executeNested"`.
 */
export function usePrepareTokenboundExecutorExecuteNested(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof tokenboundExecutorABI,
      'executeNested'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: tokenboundExecutorABI,
    functionName: 'executeNested',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof tokenboundExecutorABI,
    'executeNested'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"extcall"`.
 */
export function usePrepareTokenboundExecutorExtcall(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'extcall'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: tokenboundExecutorABI,
    functionName: 'extcall',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'extcall'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"extcreate"`.
 */
export function usePrepareTokenboundExecutorExtcreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'extcreate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: tokenboundExecutorABI,
    functionName: 'extcreate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'extcreate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link tokenboundExecutorABI}__ and `functionName` set to `"extcreate2"`.
 */
export function usePrepareTokenboundExecutorExtcreate2(
  config: Omit<
    UsePrepareContractWriteConfig<typeof tokenboundExecutorABI, 'extcreate2'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: tokenboundExecutorABI,
    functionName: 'extcreate2',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof tokenboundExecutorABI,
    'extcreate2'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uupsUpgradeableABI}__.
 */
export function useUupsUpgradeableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof uupsUpgradeableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof uupsUpgradeableABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: uupsUpgradeableABI,
    ...config,
  } as UseContractReadConfig<
    typeof uupsUpgradeableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `functionName` set to `"proxiableUUID"`.
 */
export function useUupsUpgradeableProxiableUuid<
  TFunctionName extends 'proxiableUUID',
  TSelectData = ReadContractResult<typeof uupsUpgradeableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof uupsUpgradeableABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uupsUpgradeableABI,
    functionName: 'proxiableUUID',
    ...config,
  } as UseContractReadConfig<
    typeof uupsUpgradeableABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uupsUpgradeableABI}__.
 */
export function useUupsUpgradeableWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uupsUpgradeableABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof uupsUpgradeableABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof uupsUpgradeableABI, TFunctionName, TMode>({
    abi: uupsUpgradeableABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `functionName` set to `"upgradeTo"`.
 */
export function useUupsUpgradeableUpgradeTo<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uupsUpgradeableABI,
          'upgradeTo'
        >['request']['abi'],
        'upgradeTo',
        TMode
      > & { functionName?: 'upgradeTo' }
    : UseContractWriteConfig<typeof uupsUpgradeableABI, 'upgradeTo', TMode> & {
        abi?: never
        functionName?: 'upgradeTo'
      } = {} as any,
) {
  return useContractWrite<typeof uupsUpgradeableABI, 'upgradeTo', TMode>({
    abi: uupsUpgradeableABI,
    functionName: 'upgradeTo',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `functionName` set to `"upgradeToAndCall"`.
 */
export function useUupsUpgradeableUpgradeToAndCall<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uupsUpgradeableABI,
          'upgradeToAndCall'
        >['request']['abi'],
        'upgradeToAndCall',
        TMode
      > & { functionName?: 'upgradeToAndCall' }
    : UseContractWriteConfig<
        typeof uupsUpgradeableABI,
        'upgradeToAndCall',
        TMode
      > & {
        abi?: never
        functionName?: 'upgradeToAndCall'
      } = {} as any,
) {
  return useContractWrite<typeof uupsUpgradeableABI, 'upgradeToAndCall', TMode>(
    {
      abi: uupsUpgradeableABI,
      functionName: 'upgradeToAndCall',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uupsUpgradeableABI}__.
 */
export function usePrepareUupsUpgradeableWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uupsUpgradeableABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uupsUpgradeableABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof uupsUpgradeableABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `functionName` set to `"upgradeTo"`.
 */
export function usePrepareUupsUpgradeableUpgradeTo(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uupsUpgradeableABI, 'upgradeTo'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uupsUpgradeableABI,
    functionName: 'upgradeTo',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uupsUpgradeableABI, 'upgradeTo'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `functionName` set to `"upgradeToAndCall"`.
 */
export function usePrepareUupsUpgradeableUpgradeToAndCall(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof uupsUpgradeableABI,
      'upgradeToAndCall'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uupsUpgradeableABI,
    functionName: 'upgradeToAndCall',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof uupsUpgradeableABI,
    'upgradeToAndCall'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uupsUpgradeableABI}__.
 */
export function useUupsUpgradeableEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof uupsUpgradeableABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: uupsUpgradeableABI,
    ...config,
  } as UseContractEventConfig<typeof uupsUpgradeableABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `eventName` set to `"AdminChanged"`.
 */
export function useUupsUpgradeableAdminChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof uupsUpgradeableABI, 'AdminChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: uupsUpgradeableABI,
    eventName: 'AdminChanged',
    ...config,
  } as UseContractEventConfig<typeof uupsUpgradeableABI, 'AdminChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `eventName` set to `"BeaconUpgraded"`.
 */
export function useUupsUpgradeableBeaconUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof uupsUpgradeableABI, 'BeaconUpgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: uupsUpgradeableABI,
    eventName: 'BeaconUpgraded',
    ...config,
  } as UseContractEventConfig<typeof uupsUpgradeableABI, 'BeaconUpgraded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uupsUpgradeableABI}__ and `eventName` set to `"Upgraded"`.
 */
export function useUupsUpgradeableUpgradedEvent(
  config: Omit<
    UseContractEventConfig<typeof uupsUpgradeableABI, 'Upgraded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: uupsUpgradeableABI,
    eventName: 'Upgraded',
    ...config,
  } as UseContractEventConfig<typeof uupsUpgradeableABI, 'Upgraded'>)
}
