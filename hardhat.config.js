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
    // defaultNetwork: "hardhat",
    localhost: {
      url: "http://127.0.0.1:7545", //部署本地ganache
      accounts: [
        "0x3088d1e71571b66bfa3a2deed4f02a404b9c143437b5072d3b63284a62212aa4",
      ],
    },
    lineaSepolia: {
      url: "https://rpc.sepolia.linea.build/",
      accounts: [
        //账户私钥
        "88dbd1a88ba8c9a078e31f06145f10c8b737a977060327c0e6360e706e659ed5",
      ],
    },
  },
};
