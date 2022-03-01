import { ethers, upgrades } from "hardhat";

async function main() {
    const CollectibleStakingFactory = await ethers.getContractFactory(
        "CollectibleStakingFactory"
    );
    await upgrades.upgradeProxy(
        process.env.COLLECTIBLE_STAKING_ADDRESS!,
        CollectibleStakingFactory
    );
    console.log("CollectibleStaking upgraded");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
