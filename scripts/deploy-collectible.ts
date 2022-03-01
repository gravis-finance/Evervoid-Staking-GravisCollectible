import hre, { ethers, network, upgrades } from "hardhat";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    const CollectibleStakingFactory = await ethers.getContractFactory(
        "CollectibleStaking"
    );

    const constructorArgs: [string] = [process.env.FUEL_ADDRESS!];

    const staking = await upgrades.deployProxy(
        CollectibleStakingFactory,
        constructorArgs
    );
    await staking.deployed();

    console.log("GravisStaking (proxy) deployed to:", staking.address);

    if (network.name !== "localhost" && network.name !== "hardhat") {
        console.log("Sleeping before verification...");
        await sleep(20000);

        await hre.run("verify:verify", {
            address: staking.address,
            constructorArguments: constructorArgs,
        });
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
