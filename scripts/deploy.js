const hre = require("hardhat");

async function main() {
  const Hottlecap = await hre.ethers.getContractFactory("Hottlecap");
  const hottlecap = await Hottlecap.deploy();
  await hottlecap.waitForDeployment();
  console.log("Deployed to:", await hottlecap.getAddress());

  if (hre.network.name === "sepolia") {
    await new Promise(resolve => setTimeout(resolve, 30000));
    await hre.run("verify:verify", { address: await hottlecap.getAddress(), constructorArguments: [] });
  }
}

main().catch(console.error);