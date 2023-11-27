// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// From:
// https://github.com/erc6551/reference/blob/main/src/ERC6551Registry.sol

import "@openzeppelin/contracts/utils/Create2.sol";

import "erc6551/interfaces/IERC6551Registry.sol";
import "erc6551/lib/ERC6551BytecodeLib.sol";

contract PackRegistry is IERC6551Registry {

    function createAccount(
        address implementation,
        bytes32 salt,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId
    ) external returns (address) {
        bytes memory code = ERC6551BytecodeLib.getCreationCode(
            implementation,
            salt,
            chainId,
            tokenContract,
            tokenId
        );

        address _account = Create2.computeAddress(
            bytes32(salt),
            keccak256(code)
        );

        if (_account.code.length != 0) return _account;

        emit ERC6551AccountCreated(
            _account,
            implementation,
            salt,
            chainId,
            tokenContract,
            tokenId
        );

        assembly {
            _account := create2(0, add(code, 0x20), mload(code), salt)
        }

        if (_account == address(0)) revert AccountCreationFailed();

        return _account;
    }

    function account(
        address implementation,
        bytes32 salt,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId
    ) external view returns (address) {
        bytes32 bytecodeHash = keccak256(
            ERC6551BytecodeLib.getCreationCode(
                implementation,
                salt,
                chainId,
                tokenContract,
                tokenId
            )
        );

        return Create2.computeAddress(bytes32(salt), bytecodeHash);
    }
}
