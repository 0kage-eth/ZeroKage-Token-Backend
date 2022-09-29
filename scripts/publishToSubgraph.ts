import { SUBGRAPH_FOLDER_PATH } from "../constants"
import * as fs from "fs"

const deploymentsDir = "./deployments"

/**
 * @notice function writes contract abi and address into a destination folder specified by user
 * @param contractName name of contract
 * @param network network name - localhost/goerli/mainnet etc
 * @param destinationFolder folder where abi & address will be updated
 */
const publishToSubgraph = async (
    contractName: string,
    network: string,
    destinationFolder: string
) => {
    const contractJson = fs.readFileSync(
        `${deploymentsDir}/${network}/${contractName}.json`,
        "utf8"
    )

    const contractObj = JSON.parse(contractJson)
    const contractAddress = contractObj.address
    const contractAbi = contractObj.abi

    const configPath = `${destinationFolder}/config/config.json`

    let configFileContents = "{}"
    let configFileObject = null

    console.log("Updating contract address to config.json")
    if (fs.existsSync(configPath)) {
        configFileContents = fs.readFileSync(configPath, "utf8")
    }
    configFileObject = JSON.parse(configFileContents)

    configFileObject[`${network}_${contractName}_address`] = contractAddress
    const folderPath = configPath.replace("/config.json", "")

    if (!fs.existsSync(folderPath)) {
        // create folder
        fs.mkdirSync(folderPath)
    }

    fs.writeFileSync(configPath, JSON.stringify(configFileObject))

    console.log("contract address updated successfully")

    console.log("Updating contract abi to /abi folder")

    if (!fs.existsSync(`SUBGRAPH_FOLDER_PATH/abis`)) {
        fs.mkdirSync(`${destinationFolder}/abis`)
    }

    fs.writeFileSync(
        `${destinationFolder}/abis/${network}_${contractName}`,
        JSON.stringify(contractAbi)
    )
    console.log("contract abi updated successfully")
}

/**
 * @notice script takes all current deployments in 'Deployments' folder
 * @notice and publishes contract addresses and abis to front-end
 * @notice and to subgraph folders, if they exist
 */

const main = async () => {
    const directories = fs.readdirSync(deploymentsDir)
    directories.map((dir) => {
        if (dir.indexOf("DS_Store") > 0) {
        } else {
            // since we know that the folder contains json file and chainid
            const files = fs.readdirSync(`${deploymentsDir}/${dir}`)
            let contractName = ""
            let chainId = ""
            files.map((file) => {
                if (file.indexOf(".json") > 0) {
                    // get contract name
                    contractName = file.replace(".json", "")
                }
                // if (file.indexOf("chainId") > 0) {
                //     chainId = fs.readFileSync(`${deploymentsDir}/${dir}/${file}`, "utf8")
                // }
            })
            // console.log(`Contract Name: ${contractName} ChainId: ${chainId}`)
            publishToSubgraph(contractName, dir, SUBGRAPH_FOLDER_PATH)
        }
    })
}

main()
    .then(() => {
        console.log("Address and ABI published successfully")

        process.exit(0)
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
