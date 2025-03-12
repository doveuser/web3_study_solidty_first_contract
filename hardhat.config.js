require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.26",
      },
      {
        version: "0.8.28",
      },
    ],
  },
  networks: {
    defaultNetwork: "hardhat",
    localhost: {
      url: "http://127.0.0.1:8548",
    },
    sepolia: {
      url: "",
      accounts: [
        //账户私钥
        "88dbd1a88ba8c9a078e31f06145f10c8b737a977060327c0e6360e706e659ed5",
      ],
    },
  },
};
