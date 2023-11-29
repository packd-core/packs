// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "../ClaimData.sol";

import "hardhat/console.sol";

library SignatureValidator {
    error InvalidOwnerSignature();
    error InvalidClaimerSignature();

    // bytes32 public constant DOMAIN_TYPEHASH =
    //     keccak256(
    //         "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    //     );

    // bytes32 public constant DOMAIN_TYPEHASH =
    //     keccak256("EIP712Domain(string name)");

    // bytes32 public constant HASH_STRUCT_TYPEHASH =
    //     keccak256(
    //         "Claim(uint256 tokenId,address claimer,uint256 refundValue,uint256 maxRefundValue,bytes moduleData)"
    //     );

    // bytes32 public constant HASH_STRUCT_TYPEHASH =
    //     keccak256("Claim(uint256 refundValue)");

    function DOMAIN_SEPARATOR(
        uint256 registryChainId
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256(
                        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                    ),
                    keccak256(bytes("PACKD")),
                    keccak256(bytes("1")),
                    registryChainId,
                    address(this)
                )
            );
    }

    function HASH_STRUCT_TYPEHASH() public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256("Claim(uint256 refundValue)"),
                    // keccak256("Claim(uint256 tokenId,address claimer,uint256 refundValue,uint256 maxRefundValue,bytes moduleData)"
                    0
                )
            );
    }

    function validateSignatures(
        ClaimData memory data,
        uint256 registryChainId,
        bytes32 salt,
        address addr,
        address claimPublicKey
    ) internal view returns (bool) {
        bytes32 messageHashOwner = ECDSA.toEthSignedMessageHash(
            keccak256(
                abi.encodePacked(
                    data.tokenId,
                    data.claimer,
                    registryChainId,
                    salt,
                    addr
                )
            )
        );

        if (
            !SignatureChecker.isValidSignatureNow(
                claimPublicKey,
                messageHashOwner,
                data.sigOwner
            )
        ) {
            revert InvalidOwnerSignature();
        }

        bytes32 messageHashClaimer = ECDSA.toTypedDataHash(
            DOMAIN_SEPARATOR(registryChainId),
            HASH_STRUCT_TYPEHASH()
        );

        address signer = ECDSA.recover(messageHashClaimer, data.sigClaimer);
        console.log("signer");
        console.logAddress(signer);
        if (signer != data.claimer) {
            revert InvalidClaimerSignature();
        }

        return true;
    }
}
