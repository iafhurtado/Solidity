const hre = require("hardhat");
const USElection = require('./artifacts/contracts/USElection.sol/USElection.json')

const run = async function() {
		const provider = new hre.ethers.providers.InfuraProvider("ropsten", "40c2813049e44ec79cb4d7e0d18de173")
		
		const wallet = new hre.ethers.Wallet("b68ec1918def8fca4b1da06a4f34c3f459bad83c063d2162afd488215c27f065", provider)
		const balance = await wallet.getBalance();
	
		const electionContract = new hre.ethers.Contract("<Your Deployed Contract Address>", USElection.abi, wallet)
	
	const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
	console.log("State Result Submission Transaction:", transactionOhio.hash);
	const transactionReceipt = await transactionOhio.wait();
	if (transactionReceipt.status != 1) {
		console.log("Transaction was not successful")
		return 
	}

	const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
	console.log("Results submitted for Ohio", resultsSubmittedOhioNew);

	const currentLeader = await electionContract.currentLeader();
	console.log("Current leader", currentLeader);
}

run()