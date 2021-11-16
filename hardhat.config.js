require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");

task("deploy-mainnet", "Deploys contract on a provided network")
    .addParam("privateKey", " Please provide the private key")
    .setAction(async ({privateKey}) => {
        const deployElectionContract = require("./scripts/deploy-with-param");
        await deployElectionContract(privateKey);
    });

subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
        await hre.run('print', { message: "Done!" })
        console.log(taskArgs.message);
    });

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/40c2813049e44ec79cb4d7e0d18de173",
    }
  },
	
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "CHIRAADNUI814XIT9ST36R63UFNBNDKBDY"
  }
};
