import hre from "hardhat";
import { Signer } from "ethers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

import { getCommonSigners } from "../utils/signers";
import { deployOnchainChroniclesNFT } from "../scripts/deploy";

import { OnchainChroniclesNFT } from "../types";

describe.only("OnchainChroniclesNFT", function () {
  const setup = async function () {
    // Get Common Signers and Call deploy script
    const { deployer, alice } = await getCommonSigners(hre);

    const { onchainChroniclesNFT } = await deployOnchainChroniclesNFT(
      hre,
      deployer,
      alice.address
    );

    return {
      deployer,
      alice,
      onchainChroniclesNFT,
    };
  };

  describe("Deployment", function () {
    let alice: Signer;
    let onchainChroniclesNFT: OnchainChroniclesNFT;

    before(async function () {
      ({ alice, onchainChroniclesNFT } = await loadFixture(setup));
    });
    it("Should deploy the contract", async function () {
      expect(await onchainChroniclesNFT.getAddress()).to.be.properAddress;
    });
    it("Should set the right name", async function () {
      expect(await onchainChroniclesNFT.name()).to.equal("Onchain Chronicles");
    });
    it("Should set the right symbol", async function () {
      expect(await onchainChroniclesNFT.symbol()).to.equal("ONCHRON");
    });
    it("Should set the right owner", async function () {
      expect(await onchainChroniclesNFT.owner()).to.equal(
        await alice.getAddress()
      );
    });
  });

  describe("Collections", function () {
    let deployer: Signer;
    let alice: Signer;
    let onchainChroniclesNFT: OnchainChroniclesNFT;

    before(async function () {
      ({ deployer, alice, onchainChroniclesNFT } = await loadFixture(setup));
    });

    it("Should create a new collection", async function () {
      await onchainChroniclesNFT
        .connect(alice)
        .createCollection("First Collection");
      expect(await onchainChroniclesNFT.collectionURI(0)).to.equal(
        "First Collection"
      );
      expect(await onchainChroniclesNFT.nextCollectionId()).to.equal(1);
    });
    it("Should not create a new collection if not owner", async function () {
      await expect(
        onchainChroniclesNFT
          .connect(deployer)
          .createCollection("Second Collection")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("Should create a second collection", async function () {
      await onchainChroniclesNFT
        .connect(alice)
        .createCollection("Second Collection");
      expect(await onchainChroniclesNFT.collectionURI(1)).to.equal(
        "Second Collection"
      );
      expect(await onchainChroniclesNFT.nextCollectionId()).to.equal(2);
    });
    it("Should update the collection of token number 1", async function () {
      await onchainChroniclesNFT.connect(alice).updateCollection(1, "Second");
      expect(await onchainChroniclesNFT.collectionURI(1)).to.equal("Second");
    });
    it("Should not update the collection of token number 1 if not owner", async function () {
      await expect(
        onchainChroniclesNFT.connect(deployer).updateCollection(1, "Second")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
  describe("Minting", function () {
    let deployer: Signer;
    let alice: Signer;
    let onchainChroniclesNFT: OnchainChroniclesNFT;

    before(async function () {
      ({ deployer, alice, onchainChroniclesNFT } = await loadFixture(setup));
      await onchainChroniclesNFT.connect(alice).createCollection("First");
      await onchainChroniclesNFT.connect(alice).createCollection("Second");
    });
    it("Should mint a new token", async function () {
      await onchainChroniclesNFT
        .connect(alice)
        .safeMint(await alice.getAddress(), 0);
      expect(
        await onchainChroniclesNFT.balanceOf(await alice.getAddress())
      ).to.equal(1);
      expect(await onchainChroniclesNFT.ownerOf(0)).to.equal(
        await alice.getAddress()
      );
    });
    it("Should set the correct collection", async function () {
      expect(await onchainChroniclesNFT.tokenURI(0)).to.equal("First");
    });
    it("Should not mint a new token if collection does not exist", async function () {
      await expect(
        onchainChroniclesNFT
          .connect(alice)
          .safeMint(await alice.getAddress(), 2)
      ).to.revertedWithCustomError(onchainChroniclesNFT, "InvalidCollectionId");
    });

    it("Should not mint a new token if not owner", async function () {
      await expect(
        onchainChroniclesNFT
          .connect(deployer)
          .safeMint(await alice.getAddress(), 1)
      ).to.revertedWith("Ownable: caller is not the owner");
    });
    it("Should mint a new token in the second collection", async function () {
      await onchainChroniclesNFT
        .connect(alice)
        .safeMint(await alice.getAddress(), 1);
      expect(
        await onchainChroniclesNFT.balanceOf(await alice.getAddress())
      ).to.equal(2);
      expect(await onchainChroniclesNFT.ownerOf(1)).to.equal(
        await alice.getAddress()
      );
      expect(await onchainChroniclesNFT.tokenURI(1)).to.equal("Second");
    });
    it("Should mint batch new tokens", async function () {
      // CollectionId 0
      // Batch of 3
      await onchainChroniclesNFT
        .connect(alice)
        .safeMintBatch(await alice.getAddress(), 0, 3);
      expect(
        await onchainChroniclesNFT.balanceOf(await alice.getAddress())
      ).to.gte(3);
      expect(await onchainChroniclesNFT.ownerOf(2)).to.equal(
        await alice.getAddress()
      );
      expect(await onchainChroniclesNFT.ownerOf(3)).to.equal(
        await alice.getAddress()
      );
      expect(await onchainChroniclesNFT.ownerOf(4)).to.equal(
        await alice.getAddress()
      );
      expect(await onchainChroniclesNFT.tokenURI(2)).to.equal("First");
      expect(await onchainChroniclesNFT.tokenURI(3)).to.equal("First");
      expect(await onchainChroniclesNFT.tokenURI(4)).to.equal("First");
    });
    it("Should not mint batch new tokens if collection does not exist", async function () {
      await expect(
        onchainChroniclesNFT
          .connect(alice)
          .safeMintBatch(await alice.getAddress(), 2, 3)
      ).to.revertedWithCustomError(onchainChroniclesNFT, "InvalidCollectionId");
    });
    it("Should not mint batch new tokens if not owner", async function () {
      await expect(
        onchainChroniclesNFT
          .connect(deployer)
          .safeMintBatch(await alice.getAddress(), 0, 3)
      ).to.revertedWith("Ownable: caller is not the owner");
    });
  });
});
