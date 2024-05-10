// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Villa is ERC20 {

    address companyAddr;
    uint tSupply = 2264000000000000000000000;
    struct LV12650MetaData {
        string totalFlatSpace;
        uint floorNumber;
        uint numberOfRooms;
        string parkeingAvailable;
        string paymentProcess;
    }

    LV12650MetaData public metaData = LV12650MetaData("540 m2",3 ,8 ,"Yes","Bank");

    mapping(address => uint) assetOwnershipStackPercentage;
    mapping(address => mapping(address => uint)) secondaryMarketSales;

    constructor() ERC20 ("luxuryVilla 12650", "LV12650") {
        _mint(msg.sender, tSupply);
        _mintMinerReward();
        companyAddr = msg.sender;
    }

    function _mintMinerReward() public {
        _mint(block.coinbase, 1000);
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        if (!(from == address(0) && to == block.coinbase)) {
            _mintMinerReward();
        }
        super._update(from, to, value);
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        require(to != address(0), "The tramsfer address can not be zero");
        require(balanceOf(companyAddr) > value, "Not enough token to transfer");
        
        assetOwnershipStackPercentage[_msgSender()] = value/tSupply;
        _transfer(companyAddr, to, value);
        return true;
    }

    function thirdPartyTransfer(address to, uint256 value) public returns (bool) {
        require(to != address(0), "The tramsfer address can not be zero");
        require(balanceOf(_msgSender()) > value, "Not enough token to transfer");
        
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
   
    }
}