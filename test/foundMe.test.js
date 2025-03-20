const {
  ethers,
  deployments,
  getNamedAccounts,
  getUnnamedAccounts,
} = require("hardhat");
const { assert, expect } = require("chai");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const { any } = require("hardhat/internal/core/params/argumentTypes");
describe("test foundMe contract", async () => {
  let foundMe, firstAccount, foundMeDeployment, secondAccount;
  beforeEach(async () => {
    await deployments.fixture(["all"]); //获取标记为all的合约并部署  就是含有 module.exports.tags=【"all"】
    firstAccount = (await getNamedAccounts()).firstAccount;
    secondAccount = (await getNamedAccounts()).SecAccount;
    foundMeDeployment = await deployments.get("foundMe");

    foundMe = await ethers.getContractAt("foundMe", foundMeDeployment.address);

    // console.log("firstAccount", secondAccount);
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
  describe("test getFound function", async () => {
    it("test caller is not owner,out of time,reach target getFound failed", async () => {
      await foundMe.found({ value: ethers.parseEther("50") });
      let addtime = foundMeDeployment.args * 1 + 20; //输入的规定时间再加点时间
      await helpers.time.increase(addtime); //延长时间超出限定时间
      await helpers.mine(); //挖矿
      [owner, otherAccount] = await ethers.getSigners();
      //通过其他账户调用
      // console.log(otherAccount);
      expect(foundMe.connect(otherAccount).getFound()).to.be.revertedWith(
        "you are not owner"
      );
    });
    it("test caller is owner,in time,reach target getFound failed", async () => {
      await foundMe.found({ value: ethers.parseEther("50") });
      expect(foundMe.getFound()).to.be.revertedWith("time is not over");
    });
    it("test caller is owner,out time ,not reach target,getFound failed", async () => {
      await foundMe.found({ value: ethers.parseEther("50") });
      await helpers.time.increase(200);
      await helpers.mine();
      expect(foundMe.getFound()).to.be.revertedWith("not reach target");
    });
    it("test caller is owner,out time,reach target,getFound success", async () => {
      await foundMe.found({ value: ethers.parseEther("60") });
      let addtime = foundMeDeployment.args * 1 + 20; //输入的规定时间再加点时间
      await helpers.time.increase(addtime); //延长时间超出限定时间
      await helpers.mine(); //挖矿
      await foundMe.getFound();
      let balance = await foundMe.getBalance();
      expect(balance).to.equal(0);
    });
  });
  describe("test refound function", async () => {
    it("test in time, no reach target,refound failed", async () => {
      await foundMe.found({ value: ethers.parseEther("50") });
      expect(foundMe.reFound()).to.be.revertedWith("in time");
    });
    it("test out time, reach target,refound failed", async () => {
      await foundMe.found({ value: ethers.parseEther("60") });
      let addtime = foundMeDeployment.args * 1 + 20; //输入的规定时间再加点时间
      await helpers.time.increase(addtime); //延长时间超出限定时间
      await helpers.mine(); //挖矿
      expect(foundMe.reFound()).to.be.revertedWith("target  reached");
    });
    it("test out time, reach target,msg.sender not have balance, refound failed", async () => {
      await foundMe.found({ value: ethers.parseEther("60") });
      let addtime = foundMeDeployment.args * 1 + 20; //输入的规定时间再加点时间
      await helpers.time.increase(addtime); //延长时间超出限定时间
      await helpers.mine(); //挖矿

      expect(foundMe.connect(secondAccount).reFound()).to.be.revertedWith(
        "you have no balance"
      );
    });
    it("test out time,not reach target, msg.sender have balance,refound success", async () => {
      await foundMe.found({ value: ethers.parseEther("50") });
      // await foundMe
      //   .connect(secondAccount)
      //   .found({ value: ethers.parseEther("50") });
      let addtime = foundMeDeployment.args * 1 + 20; //输入的规定时间再加点时间
      await helpers.time.increase(addtime); //延长时间超出限定时间
      await helpers.mine(); //挖矿
      // let balance = await foundMe.getBalance();
      // console.log(ethers.formatEther(balance));
      const tx = await foundMe.reFound();
      await expect(tx)
        .to.emit(foundMe, "txSucces")
        .withArgs(firstAccount, ethers.parseEther("50"));

      // .to.emit(foundMe, "txSucces")
      // .withArgs(firstAccount, ethers.parseEther("50"));
    });
  });
});
