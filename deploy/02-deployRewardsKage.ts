import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const deployRewardsKage = async (hre: HardhatRuntimeEnvironment) => {
    const { ethers, network, deployments, getNamedAccounts } = hre

    const { deploy, log } = deployments

    log("Deploying rKage Token contract....")
    log("-----------------------------------")

    const { deployer } = await getNamedAccounts()

    const chainId = (network.config.chainId || 31337).toString()

    const token = await deploy("rKage", {
        from: deployer,
        args: [],
        waitConfirmations: networkConfig[chainId].blockConfirmations,
        log: true,
    })

    if (!developmentChains.includes(network.name)) {
        log("Contract is being verified....")
        await verify(token.address, [])
    }
}

export default deployRewardsKage

deployRewardsKage.tags = ["all", "rKage"]
