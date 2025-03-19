require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");
const LineaSepolia_PRC_URL = process.env.LineaSepolia_PRC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
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
    // defaultNetwork: "hardhat",
    localhost: {
      url: "http://127.0.0.1:7545", //部署本地ganache
      accounts: [
        "0xdf8a7654c41fafe6aad6c19a4a40cf8f1b9ab20842c6556998d4acf181dd116f",
      ],
    },
    lineaSepolia: {
      url: LineaSepolia_PRC_URL,
      accounts: [
        //账户私钥
        PRIVATE_KEY,
      ],
    },
  },
  namedAccounts: {
    firstAccount: {
      default: 0,
    },
    SecAccount: {
      default: 1,
    },
  },
};
