require("@nomicfoundation/hardhat-toolbox");

// =======================================
task("block-number", "Prints an current block number")
.setAction(async (taskArgs,hre) => {
  const blockNumber=await hre.ethers.provider.getBlockNumber();
  console.log(`block number is : ${blockNumber}`)
});

  module.exports = {

  };