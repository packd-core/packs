import { expect } from "chai";
import hre, { ethers } from "hardhat";
import type { Signer } from "ethers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import type { PackMain, ERC20Module, ERC20Mock } from "../types";

import { KeySignManager } from "../utils/keySignManager";
import { getSystemConfig } from "../utils/deployConfig";
import { createPack } from "../utils/testUtils";
import { deployFullSystem } from "../scripts/deploy";
import {
  generateMintData,
  generateRevokeData,
  generateClaimData,
} from "../utils/erc20moduleData";
import type { ClaimData } from "../utils/claimData";
import { getCommonSigners } from "../utils/signers";

const systemConfig = getSystemConfig(hre);

describe("PackMain, ERC20Module", function () {
  // This fixture deploys the contract and returns it
  const setup = async () => {
    // Get signers
    const { alice, bob, deployer, relayer } = await getCommonSigners(hre);

    // ERC6551 Related contracts
    const { packMain, erc20MockA, erc20MockB, erc20Module } =
      await deployFullSystem(hre, deployer, systemConfig);

    // Set PackMain address in KeySignManager
    const keySignManager = new KeySignManager(
      systemConfig.packConfig.registryChainId,
      ethers.encodeBytes32String(systemConfig.packConfig.salt.toString()),
      await packMain.getAddress()
    );

    return {
      packMain,
      alice,
      bob,
      deployer,
      keySignManager,
      relayer,
      erc20Module,
      erc20MockA,
      erc20MockB,
    };
  };

  const mintPackWithERC20 = async (
    value: bigint,
    alice: Signer,
    packMain: PackMain,
    erc20Module: ERC20Module,
    erc20Mocks: { mock: ERC20Mock; value: bigint }[],
    keySignManager: KeySignManager
  ) => {
    const moduleDataArray: [string, bigint][] = [];
    for (const { mock, value } of erc20Mocks) {
      await mock.mint(await alice.getAddress(), value);
      const mockInstance = mock.connect(alice);
      await mockInstance.approve(await packMain.getAddress(), value);
      moduleDataArray.push([await mock.getAddress(), value]);
    }

    const modules = [await erc20Module.getAddress()];
    const moduleData = await generateMintData(moduleDataArray);

    const { packInstance, claimPrivateKey } = await createPack(
      packMain,
      alice,
      keySignManager,
      erc20Mocks.reduce((acc, { value }) => acc + value, 0n),
      modules,
      [moduleData]
    );
    return { packInstance, erc20Mocks, alice, claimPrivateKey };
  };

  describe("ERC20 Module, 1 token", function () {
    it("Should mint a new pack, with erc20MockA", async function () {
      const value = ethers.parseEther("1");
      const { packMain, alice, keySignManager, erc20Module, erc20MockA } =
        await loadFixture(setup);

      const aliceBalanceBefore = await ethers.provider.getBalance(
        alice.address
      );

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC20(
        value,
        alice,
        packMain,
        erc20Module,
        [{ mock: erc20MockA, value }],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      expect(await packInstance.ownerOf(0)).to.equal(alice.address);

      // Check pack eth balance
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(value);
      const aliceBalanceAfter = await ethers.provider.getBalance(alice.address);
      expect(aliceBalanceAfter).to.lte(aliceBalanceBefore);

      // Check pack erc20 balance
      const erc20BalanceAccount = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccount).to.equal(value);
      const aliceBalanceERC20After = await erc20MockA.balanceOf(alice.address);
      expect(aliceBalanceERC20After).to.equal(0);
    });
    it("Should revoke a pack", async function () {
      const value = ethers.parseEther("1");
      const { packMain, alice, keySignManager, erc20Module, erc20MockA } =
        await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC20(
        value,
        alice,
        packMain,
        erc20Module,
        [{ mock: erc20MockA, value }],
        keySignManager
      );

      const aliceBalanceBefore = await ethers.provider.getBalance(
        alice.address
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      // Check that the erc20 tokens are in the pack
      const accountAddress = await packInstance.account(0);
      const erc20BalanceAccount = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccount).to.equal(value);
      const aliceBalanceERC20Before = await erc20MockA.balanceOf(alice.address);
      expect(aliceBalanceERC20Before).to.equal(0);

      const revokeData = await generateRevokeData([
        await erc20MockA.getAddress(),
      ]);

      // Revoke pack
      await packInstance.revoke(0, [revokeData]);
      expect(await packInstance.packState(0)).to.equal(3); // 3 is the enum value for Revoked

      // Check pack eth balance
      const ethBalanceAfter = await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAfter).to.equal(0);
      const aliceBalanceAfter = await ethers.provider.getBalance(alice.address);
      expect(aliceBalanceAfter).to.gt(aliceBalanceBefore);

      // Check that the erc20 tokens are back in the owner's account
      const aliceBalanceERC20After = await erc20MockA.balanceOf(alice.address);
      expect(aliceBalanceERC20After).to.equal(value);
    });
    it("Should open a pack", async function () {
      const value = ethers.parseEther("1");
      const { packMain, alice, bob, keySignManager, erc20Module, erc20MockA } =
        await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await mintPackWithERC20(
        value,
        alice,
        packMain,
        erc20Module,
        [{ mock: erc20MockA, value }],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Check balances
      const bobBalanceBefore = await ethers.provider.getBalance(bob.address);
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(value);
      const aliceBalanceBefore = await ethers.provider.getBalance(
        alice.address
      );
      // Check that the erc20 tokens are in the pack
      const erc20BalanceAccount = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccount).to.equal(value);
      const aliceBalanceERC20Before = await erc20MockA.balanceOf(alice.address);
      expect(aliceBalanceERC20Before).to.equal(0);
      const bobBalanceERC20Before = await erc20MockA.balanceOf(bob.address);
      expect(bobBalanceERC20Before).to.equal(0);

      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );

      const moduleData = await generateClaimData([
        await erc20MockA.getAddress(),
      ]);

      const moduleDataBytes = KeySignManager.getModuleDataBytes([moduleData]);

      // Create SigClaimer
      const { claimSignature: sigClaimer } =
        await keySignManager.generateClaimSignature(
          bob,
          ["uint256", "uint256", "bytes"],
          [0, 0, moduleDataBytes]
        );

      const claimData: ClaimData = {
        tokenId: 0,
        sigOwner: sigOwner,
        claimer: bob.address,
        sigClaimer: sigClaimer,
        refundValue: BigInt(0),
        maxRefundValue: BigInt(0),
        moduleData: [moduleData],
      };

      // Change account to bob
      const packInstanceBob = packMain.connect(bob);
      await packInstanceBob.open(claimData);

      // Check correct state
      expect(await packInstanceBob.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check balances
      const ethBalanceAccountAfter =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccountAfter).to.equal(0);
      const bobBalanceAfter = await ethers.provider.getBalance(bob.address);
      expect(bobBalanceAfter).to.gt(bobBalanceBefore);
      const aliceBalanceAfter = await ethers.provider.getBalance(alice.address);
      expect(aliceBalanceAfter).to.lte(aliceBalanceBefore);

      // Check that the erc20 tokens are in the claimer's account
      const aliceBalanceERC20After = await erc20MockA.balanceOf(alice.address);
      expect(aliceBalanceERC20After).to.equal(0);
      const erc20BalanceAccountAfter =
        await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountAfter).to.equal(0);
      const bobBalanceERC20After = await erc20MockA.balanceOf(bob.address);
      expect(bobBalanceERC20After).to.equal(value);
    });
  });
  describe("RelayClaim tests, with ERC20 Module", function () {
    it.only("Should open a pack, using EIP712 signature", async function () {
      const value = ethers.parseEther("1");
      const {
        packMain,
        alice,
        bob,
        relayer,
        keySignManager,
        erc20Module,
        erc20MockA,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await mintPackWithERC20(
        value,
        alice,
        packMain,
        erc20Module,
        [{ mock: erc20MockA, value }],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );

      const moduleData = await generateClaimData([
        await erc20MockA.getAddress(),
      ]);

      const domain = {
        name: "PACKD",
        version: "1",
        chainId: 31337,
        verifyingContract: await packMain.getAddress(),
      };

      // console.log("domain", domain);

      const types = {
        Claim: [
          { name: "tokenId", type: "uint256" },
          { name: "claimer", type: "address" },
          { name: "refundValue", type: "uint256" },
          { name: "maxRefundValue", type: "uint256" },
          { name: "moduleData", type: "bytes" },
        ],
      };

      const encodedModuleData = KeySignManager.getModuleDataBytes([moduleData]);

      const message = {
        tokenId: 0,
        claimer: bob.address,
        refundValue: 0,
        maxRefundValue: 0,
        moduleData: encodedModuleData,
      };

      console.log("message", message);

      const sigClaimer = await bob.signTypedData(domain, types, message);
      const verify = ethers.verifyTypedData(domain, types, message, sigClaimer);
      console.log("verify", verify);
      // const { claimSignature: sigClaimer } =
      //   await keySignManager.generateClaimSignature(
      //     bob,
      //     ["uint256", "uint256", "bytes"],
      //     [0, 0, encodedModuleData]
      //   );

      console.log("sigClaimer", sigClaimer);

      const claimData: ClaimData = {
        tokenId: 0,
        sigOwner: sigOwner,
        claimer: bob.address,
        sigClaimer: sigClaimer,
        refundValue: BigInt(0),
        maxRefundValue: BigInt(0),
        moduleData: [moduleData],
      };

      // Change account to relayer
      const packInstanceRelayer = packMain.connect(relayer);
      const tx = packInstanceRelayer.open(claimData);
      await expect(tx).to.emit(packInstanceRelayer, "PackOpened");

      // Check correct state
      expect(await packInstanceRelayer.packState(0)).to.equal(2); // 2 is the enum value for Opened
    });
    it("Should open a pack, some gas reimburstments", async function () {
      const value = ethers.parseEther("1");
      const maxRefundValue = ethers.parseEther("0.1");
      const {
        packMain,
        alice,
        bob,
        relayer,
        keySignManager,
        erc20Module,
        erc20MockA,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await mintPackWithERC20(
        value,
        alice,
        packMain,
        erc20Module,
        [{ mock: erc20MockA, value }],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );

      const moduleData = await generateClaimData([
        await erc20MockA.getAddress(),
      ]);

      const encodedModuleData = KeySignManager.getModuleDataBytes([moduleData]);
      const { claimSignature: sigClaimer } =
        await keySignManager.generateClaimSignature(
          bob,
          ["uint256", "uint256", "bytes"],
          [0, maxRefundValue, encodedModuleData]
        );

      const claimData: ClaimData = {
        tokenId: 0,
        sigOwner: sigOwner,
        claimer: bob.address,
        sigClaimer: sigClaimer,
        refundValue: BigInt(0),
        maxRefundValue: maxRefundValue,
        moduleData: [moduleData],
      };

      const bobBalanceBefore = await ethers.provider.getBalance(bob.address);

      // Change account to relayer
      const packInstanceRelayer = packMain.connect(relayer);
      await packInstanceRelayer.open(claimData);

      // Check correct state
      expect(await packInstanceRelayer.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check balances
      const accountAddress = await packInstanceRelayer.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(0);
      const bobBalanceAfter = await ethers.provider.getBalance(bob.address);
      expect(bobBalanceAfter).to.gt(bobBalanceBefore);

      // Check that the erc20 tokens are in the claimer's account
      const erc20BalanceAccount = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccount).to.equal(0);
      const bobBalanceERC20After = await erc20MockA.balanceOf(bob.address);
      expect(bobBalanceERC20After).to.equal(value);
    });
    it.skip("Should not open a pack, relayer tries to steal pack content", async function () {
      // TODO: Relayer could change the moduleData to send other valueless tokens to claimer
    });
  });
  describe("ERC20 Module, 2 tokens", function () {
    it("Should mint a new pack, with erc20MockA and erc20MockB", async function () {
      const valueA = ethers.parseEther("1");
      const valueB = ethers.parseEther("2");
      const {
        packMain,
        alice,
        keySignManager,
        erc20Module,
        erc20MockA,
        erc20MockB,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC20(
        valueA + valueB,
        alice,
        packMain,
        erc20Module,
        [
          { mock: erc20MockA, value: valueA },
          { mock: erc20MockB, value: valueB },
        ],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      expect(await packInstance.ownerOf(0)).to.equal(alice.address);

      // Check pack eth balance
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(valueA + valueB);

      // Check pack erc20 balance
      const erc20BalanceAccountA = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountA).to.equal(valueA);
      const erc20BalanceAccountB = await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountB).to.equal(valueB);
    });
    it("Should revoke a pack", async function () {
      const valueA = ethers.parseEther("1");
      const valueB = ethers.parseEther("2");
      const {
        packMain,
        alice,
        keySignManager,
        erc20Module,
        erc20MockA,
        erc20MockB,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance } = await mintPackWithERC20(
        valueA + valueB,
        alice,
        packMain,
        erc20Module,
        [
          { mock: erc20MockA, value: valueA },
          { mock: erc20MockB, value: valueB },
        ],
        keySignManager
      );

      const accountAddress = await packInstance.account(0);

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created
      // Check pack erc20 balance
      const erc20BalanceAccountA = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountA).to.equal(valueA);
      const erc20BalanceAccountB = await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountB).to.equal(valueB);

      const revokeData = await generateRevokeData([
        await erc20MockA.getAddress(),
        await erc20MockB.getAddress(),
      ]);

      // Revoke pack
      await packInstance.revoke(0, [revokeData]);
      expect(await packInstance.packState(0)).to.equal(3); // 3 is the enum value for Revoked

      // Check ERC20 balances
      const erc20BalanceAccountAAfter =
        await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountAAfter).to.equal(0);
      const erc20BalanceAccountBAfter =
        await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountBAfter).to.equal(0);

      // Check that the erc20 tokens are back in the owner's account
      const aliceBalanceERC20AfterA = await erc20MockA.balanceOf(alice.address);
      expect(aliceBalanceERC20AfterA).to.equal(valueA);
      const aliceBalanceERC20AfterB = await erc20MockB.balanceOf(alice.address);
      expect(aliceBalanceERC20AfterB).to.equal(valueB);
    });
    it("Should open a pack", async function () {
      const valueA = ethers.parseEther("1");
      const valueB = ethers.parseEther("2");
      const {
        packMain,
        alice,
        bob,
        keySignManager,
        erc20Module,
        erc20MockA,
        erc20MockB,
      } = await loadFixture(setup);

      // Mint a new pack using createPack function
      const { packInstance, claimPrivateKey } = await mintPackWithERC20(
        valueA + valueB,
        alice,
        packMain,
        erc20Module,
        [
          { mock: erc20MockA, value: valueA },
          { mock: erc20MockB, value: valueB },
        ],
        keySignManager
      );

      // Check correct state
      expect(await packInstance.packState(0)).to.equal(1); // 1 is the enum value for Created

      // Check balances
      const accountAddress = await packInstance.account(0);
      const ethBalanceAccount =
        await ethers.provider.getBalance(accountAddress);
      expect(ethBalanceAccount).to.equal(valueA + valueB);

      // Check that the erc20 tokens are in the pack
      const erc20BalanceAccountA = await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountA).to.equal(valueA);
      const erc20BalanceAccountB = await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountB).to.equal(valueB);

      const moduleData = await generateClaimData([
        await erc20MockA.getAddress(),
        await erc20MockB.getAddress(),
      ]);

      const encodedModuleData = KeySignManager.getModuleDataBytes([moduleData]);
      // Create SigOwner
      const { claimSignature: sigOwner } =
        await keySignManager.generateClaimSignature(
          claimPrivateKey,
          ["uint256", "address"],
          [0, bob.address]
        );
      // Create SigClaimer
      const { claimSignature: sigClaimer } =
        await keySignManager.generateClaimSignature(
          bob,
          ["uint256", "uint256", "bytes"],
          [0, 0, encodedModuleData]
        );

      const claimData: ClaimData = {
        tokenId: 0,
        sigOwner: sigOwner,
        claimer: bob.address,
        sigClaimer: sigClaimer,
        refundValue: BigInt(0),
        maxRefundValue: BigInt(0),
        moduleData: [moduleData],
      };

      // Change account to bob
      const packInstanceBob = packMain.connect(bob);
      await packInstanceBob.open(claimData);

      // Check correct state
      expect(await packInstanceBob.packState(0)).to.equal(2); // 2 is the enum value for Opened

      // Check erc20 balances
      const erc20BalanceAccountAAfter =
        await erc20MockA.balanceOf(accountAddress);
      expect(erc20BalanceAccountAAfter).to.equal(0);
      const erc20BalanceAccountBAfter =
        await erc20MockB.balanceOf(accountAddress);
      expect(erc20BalanceAccountBAfter).to.equal(0);

      // Check erc20 balances for claimer
      const bobBalanceERC20AfterA = await erc20MockA.balanceOf(bob.address);
      expect(bobBalanceERC20AfterA).to.equal(valueA);
      const bobBalanceERC20AfterB = await erc20MockB.balanceOf(bob.address);
      expect(bobBalanceERC20AfterB).to.equal(valueB);
    });
  });
});
