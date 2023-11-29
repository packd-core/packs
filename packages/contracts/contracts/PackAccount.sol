// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@doncesarts/tokenbound-contracts/AccountV3.sol";

contract PackAccount is AccountV3 {
    constructor(
        address __entryPoint,
        address _multicallForwarder,
        address _erc6551Registry,
        address _guardian
    )
        AccountV3(
            __entryPoint,
            _multicallForwarder,
            _erc6551Registry,
            _guardian
        )
    {}

    // Modified function to check if the signer is the token contract
    function _isValidExecutor(
        address signer
    ) internal view virtual override returns (bool) {
        (, address tokenContract, ) = token();
        return signer == tokenContract;
    }
}
