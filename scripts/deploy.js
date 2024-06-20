const { ethers, run, network } = require("hardhat");
async function main() {
  const Lock = await ethers.getContractFactory("SimpleStorage");
  const SimpleStorage = await Lock.deploy();
  await SimpleStorage.deploymentTransaction().wait();
  console.log("SimpleStorage deployed to:", SimpleStorage.runner.address);
  console.log(network);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("verifying...");
    await SimpleStorage.deploymentTransaction().wait(6);
    await verify(SimpleStorage.runner.address, []);
  }
//   ----------------------------------------
    const currentValue=await SimpleStorage.retrieve();
    console.log("-------------------------------------")
    console.log(`current value is ${currentValue}`)

    const transectionResponce=await SimpleStorage.store(7)
    await transectionResponce.wait(1);
    const updatedValue=await SimpleStorage.retrieve();
    console.log(`updated value is ${updatedValue}`)
}
async function verify(contractAdderess, args) {
  console.log("verifying contracts...");
  try {
    await run("verify:verify", {
      address: contractAdderess,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("already verified");
    } else {
      console.log(error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
