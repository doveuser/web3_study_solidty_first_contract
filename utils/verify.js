//验证合约
const { run } = require("hardhat");

module.exports = async (contractAddress, args) => {
  console.log("verify contract ...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};
