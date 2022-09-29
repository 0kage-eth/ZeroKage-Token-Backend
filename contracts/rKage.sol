// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @notice RewardsKage contract issues rKage token (rKAGE symbol)
 * @notice initial mint of 1 million tokens sent to deployer
 * @notice rKAGE tokens will be issued to users staking 0KAGE
 */

contract rKage is ERC20 {
    constructor() ERC20("rKage", "rKAGE") {
        _mint(msg.sender, 10000000 ether); // mint # of tokens =  10 million ether
    }
}
