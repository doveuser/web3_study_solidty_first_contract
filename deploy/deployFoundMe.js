//部署脚本,hardhat也有部署工具
const { ethers } = require("hardhat");
async function main() {
  const FoundMeFactory = await ethers.getContractFactory("foundMe");
  console.log("contract is deploying");
  const FoundMe = await FoundMeFactory.deploy(300); //部署
  await FoundMe.waitForDeployment(); //等待部署完毕
  console.log(`contract FoundMe address is ${FoundMe.target}`);
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(1); //以非零状态码退出
  });
