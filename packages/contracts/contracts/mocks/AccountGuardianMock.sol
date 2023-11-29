// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@doncesarts/tokenbound-contracts/AccountGuardian.sol";

contract AccountGuardianMock is AccountGuardian {
    constructor(address _owner) AccountGuardian(_owner) {}
}
