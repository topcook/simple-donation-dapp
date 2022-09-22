// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Address.sol";

/*
* @title Donate contract
* @author topcook
*/
contract TransferTest {

    // function called to send money to donation address
    function donate(address payable donationAddress) external payable {
        Address.sendValue(donationAddress, msg.value);
    }
}