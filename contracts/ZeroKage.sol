// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @notice ZeroKage contract issues ZeroKage token (0KAGE symbol)
 * @notice initial mint of 10 million tokens sent to deployer
 */

contract ZeroKage is ERC20 {
    uint256 public unlockTime;
    address payable public owner;

    constructor() ERC20("ZeroKage", "0KAGE") {
        _mint(msg.sender, 10000000 ether); // mint # of tokens =  10 million ether
    }
}
