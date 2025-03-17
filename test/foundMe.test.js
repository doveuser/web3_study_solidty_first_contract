const { ethers } = require("hardhat");
const { assert } = require("chai");
describe("test foundMe contract", async () => {
  it("test owner is msg.sender", async () => {
    const foundMeFactory = await ethers.getContractFactory("foundMe");
    const foundMe = await foundMeFactory.deploy(180);
    await foundMe.waitForDeployment();
    const [firstAccount] = await ethers.getSigners();
    assert.equal(await foundMe.owner(), firstAccount.address);
  it("test locktime is")
});
