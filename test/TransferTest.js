const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My contract", () => {
    let myContract;
    let accounts;
    let balance1, balance2;
    let donationAmount;

    describe("TransferTest", async () => {
        it("Should deploy MyContract", async function () {
            accounts = await ethers.getSigners()
            const MyContract = await ethers.getContractFactory("TransferTest");
            myContract = await MyContract.deploy();
        });

        describe("setPurpose()", async () => {
            it("check balance of the address before dontaion", async () => {
                balance1 = await ethers.utils.formatEther(await ethers.provider.getBalance(accounts[1].address));
                balance2 = await ethers.utils.formatEther(await ethers.provider.getBalance(accounts[2].address));

                console.log("Before donation");
                console.log(`Balance of account 1: ${balance1} ether`);
                console.log(`Balance of account 2: ${balance2} ether`);
            });

            it("Should be able to donate", async () => {
                donationAmount = 100;
                console.log(`account 1 donates ${donationAmount} ether to account 2`);
                await myContract.connect(accounts[1]).donate(accounts[2].address, { value: await ethers.utils.parseEther(donationAmount.toString()) });
            });

            it("Should check the balance after donation", async () => {
                const newBalance1 = await ethers.utils.formatEther(await ethers.provider.getBalance(accounts[1].address));
                const newBalance2 = await ethers.utils.formatEther(await ethers.provider.getBalance(accounts[2].address));

                console.log("After donation");
                console.log(`Balance of account 1: ${newBalance1} ether`);
                console.log(`Balance of account 2: ${newBalance2} ether`);

                expect(await ethers.utils.parseEther(newBalance2.toString()))
                    .to.equal(
                        (await ethers.utils.parseEther(balance2.toString())).add(await ethers.utils.parseEther(donationAmount.toString()))
                    );
            });
        });
    });
});