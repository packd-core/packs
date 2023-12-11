// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "../ClaimData.sol";

library SignatureValidator {
    error InvalidOwnerSignature();
    error InvalidClaimerSignature();

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

    function STRUCT_TYPEHASH() public pure returns (bytes32) {
        return
            keccak256(
                "Claim(uint256 tokenId,address claimer,uint256 maxRefundValue,bytes32 moduleData)"
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
            keccak256(
                abi.encode(
                    STRUCT_TYPEHASH(),
                    data.tokenId,
                    data.claimer,
                    data.maxRefundValue,
                    keccak256(abi.encode(data.moduleData))
                )
            )
        );

        if (
            !SignatureChecker.isValidSignatureNow(
                data.claimer,
                messageHashClaimer,
                data.sigClaimer
            )
        ) {
            revert InvalidClaimerSignature();
        }

        return true;
    }
}
