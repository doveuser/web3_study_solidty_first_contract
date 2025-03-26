const verify = require("../utils/verify");
module.exports = async ({ deployments, getNamedAccounts }) => {
  console.log("deploying");

  const { deploy } = deployments;
  const { firstAccount } = await getNamedAccounts();
  console.log("firstAccounts", deploy);
  let contractParams = [36000];
  let foundMe = await deploy("foundMe", {
    from: firstAccount,
    args: contractParams, //构造函数参数
    log: true,
  });
  console.log("deploy contract success!address is ", foundMe.address);
  // await verify(foundMe.address, contractParams);
};

module.exports.tags = ["all"];
