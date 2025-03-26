export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lockTime",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TXFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "TimeOver",
    type: "error",
  },
  {
    inputs: [],
    name: "foundFailWithMoreEth",
    type: "error",
  },
  {
    inputs: [],
    name: "foundFailWithTime",
    type: "error",
  },
  {
    inputs: [],
    name: "founded",
    type: "error",
  },
  {
    inputs: [],
    name: "getFoundFailWithNoReach",
    type: "error",
  },
  {
    inputs: [],
    name: "reFoundFailWithReach",
    type: "error",
  },
  {
    inputs: [],
    name: "reFoundWithNoBalance",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "txSucces",
    type: "event",
  },
  {
    inputs: [],
    name: "found",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getBalancOfAddr",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFounders",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLockTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTargetMoney",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "reFound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
