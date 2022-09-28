# ZEROKAGE-Token-Issuance


- This project creates a 0KAGE token and mints 10m tokens to deployer
- This is part of triad of projects - refer to [ZEROKAGE-TOKEN-SUBGRAPH] (https://github.com/0kage-eth) for building a subgraph that listens to events emitted & [ZEROKAGE-TOKEN-FRONTEND] that builds a front end for token transfers, balances etc. 

---

## 0KAGE Token

- This will be used as standard token for all my projects 
- Fixed issuance of 10 million tokens
- Name: ZeroKage, Symbol: 0KAGE
- In this project
    - We create a ZeroKage Token contract that inherits from [OpenZeppelin ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
    - Deploy the script to a network 
    - Export deployed contract address and abi to SUBGRAPH and FRONT-END
    - Some basic tests in the [test](./test/) folder. I skipped tests here because its a standard ERC20 implementation


---

## STEPS for implementation

1. Clone the repo
    
    ```
    git clone https://github.com/0kage-eth/Zerokage-token-backend .
    ```

2. Review `ZeroKage.sol` - it is a simple ERC20 implementation that mints 10m 0KAGE tokens to deployer

3. Deploy the [01-deployZeroKage.ts](./deploy/01-deployZeroKage.ts). I've tagged 'ZeroKage' to isolate the deploy script

```
yarn hardhat deploy --tags ZeroKage
```

4. Once contract is deployed, run a script to export contract abi and contract address to front-end and contract address to subgraph project. 

I have used `REACT_CONTRACTS_FOLDER_PATH` and `SUBGRAPH_CONTRACTS_FOLDER_PATH` constants in the [helper-hardhat-config.ts](constants.ts) to specify path location. You might need to change this as per your file directories


```
$ yarn hardhat run scrips/publishContract network --network
```



