// Alamat kontrak dari hasil deployment Hardhat
export const contractAddress = "0xD38cDebabbde54D53f1E8699f93364c228Fb7Bfe";

// ABI dari file artifacts/contracts/BukuTamu.sol/BukuTamu.json
export const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "firstMessage",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newMessage",
        type: "string",
      },
    ],
    name: "setMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
