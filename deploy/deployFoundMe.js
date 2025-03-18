module.exports = async ({ deployments, getNamedAccounts }) => {
  console.log("deploying");

  const { deploy } = deployments;
  const { firstAccount } = await getNamedAccounts();
  // console.log("firstAccounts", firstAccounts);
  await deploy("foundMe", {
    from: firstAccount,
    args: [180], //构造函数参数
    log: true,
  });
};

module.exports.tags = ["all"];
