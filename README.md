# basic-solidity-contracts
A few basic solidity contracts to experiment with, including creating an ERC-20 token (also provided as a template in Remix IDE) and developing a simple lottery game accessible by specific token holders.


# ERC20 Token
The ERC-20 standard has already been defined and explained [here](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.7/contracts/token/ERC20/ERC20.sol)

This project demonstrates the creation and deployment of an ERC-20 token using Solidity and OpenZeppelin's ERC-20 implementation. It includes:

- Token minting during deployment.
- Balance checking.
- Token transfer between accounts.
- Integration-ready design for dApps and exchanges.

# Dynamic NFT Smart Contract
This repository contains a Solidity smart contract for deploying and managing Dynamic NFTs (Non-Fungible Tokens). These NFTs have the capability to change their metadata dynamically based on real-world conditions, on-chain activity, or any defined criteria.

## Overview
The Dynamic NFT smart contract allows the minting and updating of NFT metadata via the blockchain. Each NFT is represented uniquely and can change its metadata (e.g., image, attributes) dynamically through external triggers (e.g., backend services, APIs).

## Features
- Mint Dynamic NFTs: Allows minting NFTs with specific token URIs.
- Update Metadata: Dynamically update the metadata of NFTs using the updateTokenURI method.
- ERC-721 Compliant: Fully adheres to the ERC-721 standard with URI storage extension.
- Ownership Control: Restricted to the contract owner for minting and metadata updates.

## Contract Details
Contract Name: `DynamicNFT`
Network Compatibility: Compatible with Ethereum Testnets (e.g., Sepolia, Goerli)
Dependencies:
OpenZeppelin Contracts: ERC721URIStorage, Ownable
Compiler Version: ^0.8.26

## Deployment Steps
Either deploy using Remix IDE or:
Clone repo, then
Install dependencies:
```bash
npm install
```
Compile the contract:
```bash
npx hardhat compile
```
Deploy on the test network:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```
Verify the contract:
```bash
npx hardhat verify --network sepolia <contract_address>
```

## Example usage with other projects
This contract was used to deploy a dynamic NFT, seen [here](https://testnets.opensea.io/assets/sepolia/0x58f960E4AA01b9EBE72A51b76A92162C04eD03D3/0).
Here are the [nft-generator](https://github.com/0xpoot-poot/nft-generator) used to make it and the [dynamic-nft-backend](https://github.com/0xpoot-poot/dynamic-nft-backend) used to mint it and update the metadata according to external conditions.
