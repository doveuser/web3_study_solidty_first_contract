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
        "0x4f58567c2f92a9f3ec028b5639be02f9eddd91350e13856eff4d8c7c2aa2e44a",
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
    firstAccounts: {
      default: 0,
    },
    secAccounts: {
      default: 1,
    },
  },
};
