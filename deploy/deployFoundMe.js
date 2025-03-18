module.exports = async ({ deployments, getNamedAccounts }) => {
  console.log("deploying");

  const { deploy } = deployments;
  const { firstAccounts } = await getNamedAccounts();
  // console.log("firstAccounts", firstAccounts);
  await deploy("foundMe", {
    from: firstAccounts,
    args: [180], //构造函数参数
    log: true,
  });
};
