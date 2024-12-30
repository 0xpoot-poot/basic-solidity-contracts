// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Highly recommend reading through this solidity file:
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PTCToken is ERC20 {
    // 'ERC20' calls the parent constructor from the imported library, setting the name and symbol.
    constructor(uint256 initialSupply) ERC20("PootCoin", "PTC") {
        // Deployer is given the initial supply of tokens, i.e. minted into deployer's address
        _mint(msg.sender, initialSupply);
    }
}