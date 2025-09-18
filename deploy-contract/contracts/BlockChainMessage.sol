// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract BlockChainMessage {
    string private message;

    constructor(string memory firstMessage) {
        message = firstMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}