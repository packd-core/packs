// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importing OpenZeppelin's ERC721, ERC721Enumerable, ERC721URIStorage and Ownable contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OnchainChroniclesNFT
 * @dev This contract inherits from ERC721, ERC721Enumerable, ERC721URIStorage and Ownable.
 * It represents a Onchain Chronicles NFT and includes functions for creating and updating collections, minting tokens, and managing token URIs.
 */
contract OnchainChroniclesNFT is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable
{
    // ---------- Errors ---------------------
    // Error when the collection id is invalid
    error InvalidCollectionId(uint256 collectionId, uint256 nextCollectionId);

    // ---------- Storage --------------------
    // Store the next token id and collection id
    uint256 private _nextTokenId;
    uint256 public nextCollectionId;

    // ---------- Mappings -------------------
    // Store the collection id and related data
    mapping(uint256 => Collection) public collections;
    // Store the collection id associated with each token
    mapping(uint256 => uint256) public tokenToCollectionId;

    // ---------- Structs --------------------
    // Store the collection data
    struct Collection {
        string tokenURI;
    }

    /**
     * @dev Constructor for the OnchainChroniclesNFT contract
     * @param name_ The name of the token
     * @param symbol_ The symbol of the token
     * @param initialOwner_ The address of the initial owner of the contract
     */
    constructor(
        string memory name_,
        string memory symbol_,
        address initialOwner_
    ) ERC721(name_, symbol_) {
        transferOwnership(initialOwner_);
    }

    /**
     * @dev Creates a new collection with a given collectionId and tokenURI.
     * @param tokenURI_ The URI of the token associated with the new collection.
     * @notice Only the owner can call this function.
     */
    function createCollection(string memory tokenURI_) external onlyOwner {
        // Create a new Collection struct in memory
        Collection memory collection = Collection({tokenURI: tokenURI_});

        // Add the new collection to the collections mapping
        collections[nextCollectionId] = collection;

        // Increment the next collection id
        nextCollectionId++;
    }

    /**
     * @dev Updates the tokenURI of a collection.
     * @param collectionId_ The id of the collection to update.
     * @param tokenURI_ The new URI of the token associated with the collection.
     * @notice Only the owner can call this function.
     */
    function updateCollection(
        uint256 collectionId_,
        string memory tokenURI_
    ) external onlyOwner {
        // Check that the collection exists
        if (collectionId_ >= nextCollectionId)
            revert InvalidCollectionId(collectionId_, nextCollectionId);
        // Update the collection
        collections[collectionId_].tokenURI = tokenURI_;
    }

    /**
     * @dev Mints a new token and associates it with a collection.
     * @param to_ The address to mint the new token to.
     * @param collectionId_ The id of the collection to associate the new token with.
     * @notice Only the owner can call this function.
     */
    function safeMint(address to_, uint256 collectionId_) external onlyOwner {
        // Check that the collection exists
        if (collectionId_ >= nextCollectionId)
            revert InvalidCollectionId(collectionId_, nextCollectionId);

        // Mint the new token
        _safeMint(to_, _nextTokenId);

        // Associate the newly minted token with the collection
        tokenToCollectionId[_nextTokenId] = collectionId_;

        // Increment the next token id
        _nextTokenId++;
    }

    // ---------- Views ----------------------

    /**
     * @dev Returns the URI of the token.
     * @param tokenId The id of the token.
     * @return The URI of the token.
     * @notice This function overrides the tokenURI function of the ERC721 and ERC721URIStorage contracts.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        // Retrieve the collection id associated with the token
        uint256 collectionId = tokenToCollectionId[tokenId];
        // Fetch the token URI from the collection and return it
        return collections[collectionId].tokenURI;
    }

    /**
     * @dev Returns the URI of the collection.
     * @param collectionId The id of the collection.
     * @return The URI of the collection.
     * @notice This function fetches the URI of a specific collection.
     */
    function collectionURI(
        uint256 collectionId
    ) public view returns (string memory) {
        // Fetch the token URI from the collection and return it
        return collections[collectionId].tokenURI;
    }

    // ---------- Overrides ------------------

    /**
     * @dev Checks if the contract supports a specific interface.
     * @param interfaceId The id of the interface.
     * @return A boolean indicating if the contract supports the interface.
     * @notice This function overrides the supportsInterface function of the ERC721, ERC721Enumerable, and ERC721URIStorage contracts.
     */
    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Handles the before token transfer event.
     * @param from The address sending the tokens.
     * @param to The address receiving the tokens.
     * @param firstTokenId The id of the first token being transferred.
     * @param batchSize The number of tokens being transferred.
     * @notice This function overrides the _beforeTokenTransfer function of the ERC721 and ERC721Enumerable contracts.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    /**
     * @dev Burns a token.
     * @param tokenId The id of the token to burn.
     * @notice This function overrides the _burn function of the ERC721 and ERC721URIStorage contracts.
     */
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        // Call the parent function
        super._burn(tokenId);
    }
}
