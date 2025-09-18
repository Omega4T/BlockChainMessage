
const hre = require("hardhat");

async function main() {
  const BlockChainMessageFactory = await hre.ethers.getContractFactory("BlockChainMessage");

  console.log("Deploying BlockChainMessage contract...");
  const blockChainMessage = await BlockChainMessageFactory.deploy("This is my first smart contract!");
  
  await blockChainMessage.waitForDeployment();

  console.log(`BlockChainMessage contract deployed to: ${blockChainMessage.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});