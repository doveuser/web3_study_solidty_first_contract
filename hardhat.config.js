require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomicfoundation/hardhat-verify");
const LineaSepolia_PRC_URL = process.env.LineaSepolia_PRC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const LineaSepolia_RPC_URL = process.env.LineaSepolia_RPC_URL;
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
    hardhat: {
      chainId: 31337,
    },
    ganache: {
      url: "http://127.0.0.1:7545", //部署本地ganache
      accounts: [
        "0xdf8a7654c41fafe6aad6c19a4a40cf8f1b9ab20842c6556998d4acf181dd116f",
      ],
    },
    lineaSepolia: {
      url: LineaSepolia_RPC_URL,
      accounts: [
        //账户私钥
        PRIVATE_KEY,
      ],
      chainId: 59141,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
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
  gasReporter: {
    enable: true,
    outputFile: "gas-reporter.txt",
    noColors: true,
  },
  sourcify: {
    enabled: true,
    // Optional: specify a different Sourcify server
    // apiUrl: "https://sourcify.dev/server",
    // Optional: specify a different Sourcify repository
    // browserUrl: "https://repo.sourcify.dev",
  },
};
