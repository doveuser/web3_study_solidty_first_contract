const { ethers, deployments, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { any } = require("hardhat/internal/core/params/argumentTypes");
describe("test foundMe contract", async () => {
  let foundMe, firstAccount, foundMeDeployment;
  beforeEach(async () => {
    await deployments.fixture(["all"]); //获取标记为all的合约并部署  就是含有 module.exports.tags=【"all"】
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
  describe("test fund function ", async () => {
    it("test value is not enough ,in time , found failed", async () => {
      await expect(
        foundMe.found({ value: ethers.parseEther("49") })
      ).to.be.revertedWith("please send more eth");

      assert.equal(await foundMe.getBalance(), 0);
    });
    it("test out of time, found faild", async () => {
      let addtime = foundMeDeployment.args * 1 + 20; //输入的规定时间再加点时间
      await helpers.time.increase(addtime); //延长时间超出限定时间
      await helpers.mine(); //挖矿
      await expect(
        foundMe.found({ value: ethers.parseEther("51") })
      ).to.be.revertedWith("time is expired");
      assert.equal(await foundMe.getBalance(), 0);
    });
    it("test in time ,value is enough,found success", async () => {
      await foundMe.found({ value: ethers.parseEther("51") });
      let balance = await foundMe.founderTomount(firstAccount);
      expect(balance).to.equal(ethers.parseEther("51"));
    });
  });
});
