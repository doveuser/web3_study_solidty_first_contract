const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");

describe("test foundMe contract", async () => {
  let foundMe, firstAccount, foundMeDeployment;
  beforeEach(async () => {
    await deployments.fixture(["all"]);
    firstAccount = (await getNamedAccounts()).firstAccount;
    foundMeDeployment = await deployments.get("foundMe");

    foundMe = await ethers.getContractAt("foundMe", foundMeDeployment.address);
    // console.log("firstAccount", firstAccount);
  });
  it("test owner is msg.sender", async () => {
    //   // const foundMeFactory = await ethers.getContractFactory("foundMe");
    //   // foundMe = await foundMeFactory.deploy(180);
    await foundMe.waitForDeployment();
    //   // const [firstAccount] = await ethers.getSigners();
    assert.equal(await foundMe.owner(), firstAccount);
  });
  it("test lockTime is args value", async () => {
    //验证传入的实参
    await foundMe.waitForDeployment();
    assert.equal(await foundMe.lockTime(), foundMeDeployment.args);
  });
  it("test startTime", async () => {
    await foundMe.waitForDeployment();
    let { blockNumber } = foundMeDeployment.receipt; //区块号
    let blockNow = await ethers.provider.getBlock(blockNumber); //部署的所在区块
    let times = blockNow.timestamp;
    assert.equal(times, await foundMe.startTime());
  });
  // it("test fund function ",async ()=>{
  //    it("test msg.value is enough",async()=>{

  //    })
  // })
});
