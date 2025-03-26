import { ethers } from "./ethers.5.6.min.js";
import { abi, ContractAddress } from "./constans.js";
const connectBtn = document.querySelector("#connectBtn");
const foundBtn = document.querySelector("#foundBtn");
let walletBalance = 0;
async function connect() {
  try {
    if (window.ethereum) {
      await ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("已授权账户列表:", accounts);
      // await window.ethereum.request({
      //   method: "wallet_requestPermissions",
      //   params: [{ eth_accounts: {} }], // 权限描述对象‌:ml-citation{ref="3" data="citationList"}
      // });
      connectBtn.innerHTML = "connected!";
    } else {
      console.log("not support metamask");
    }
  } catch (error) {
    console.log(error);
  }
}

connectBtn.onclick = connect;

async function found() {
  let ethAmount = document.querySelector("#ethvalue").value;
  console.log(ethAmount);
  if (ethAmount * 1 == 0) return;
  try {
    if (window.ethereum) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      // console.log(signer);
      const contractFoundMe = new ethers.Contract(ContractAddress, abi, signer);
      const transationRespose = await contractFoundMe.found({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenTransation(transationRespose, provider); //监听交易事件
      console.log("done");
    }
  } catch (error) {
    console.log(error);
  }
}
foundBtn.onclick = found;

function listenTransation(transationRespose, provider) {
  console.log(`交易hash${transationRespose.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transationRespose.hash, (transationReceipt) => {
      console.log(`completed width ${transationReceipt.confirmations}`);
      resolve();
    });
  });
}

const getVBtn = document.querySelector("#getBtn");
getVBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await provider.getBalance(ContractAddress);
      walletBalance = ethers.utils.formatEther(balance);

      console.log(`balanc is ${walletBalance}`);
    } catch (error) {
      console.log(error);
    }
  }
};

document.querySelector("#withdraw").onclick = async () => {
  if (window.ethereum) {
    try {
      if (walletBalance == 0) {
        return;
      }
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractFoundMe = new ethers.Contract(ContractAddress, abi, signer);
      const transactionResponse = await contractFoundMe.getFound();
      // const owner = await contractFoundMe.getOwner();

      console.log(owner);
      await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  }
};
