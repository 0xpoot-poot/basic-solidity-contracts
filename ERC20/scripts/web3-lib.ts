import Web3 from 'web3';
import { Contract, ContractSendMethod, Options } from 'web3-eth-contract';

/**
 * Deploy the given contract using web3 / Remix environment.
 *
 * @param {string} contractName - Name of the contract to deploy (e.g., "MyToken").
 * @param {Array<any>} args - List of constructor parameters for the contract.
 * @param {string} [from] - The account used to send the transaction. Defaults to web3.eth.getAccounts()[0].
 * @param {number} [gas] - Gas limit for deployment. Defaults to 1,500,000.
 * @returns {Promise<Options>} The deployed contract’s 'options' object, which includes the address.
 * 
 * Security Considerations:
 * - Ensure only authorized addresses can call this deployment method.
 * - A malicious or unauthorized caller might burn gas or deploy unwanted contracts.
 * - Validate input parameters (especially if 'args' or 'contractName' come from user input).
 */
export async function deploy(
  contractName: string,
  args: any[],
  from?: string,
  gas?: number
): Promise<Options> {
  // Make sure 'web3Provider' is defined in your environment:
  // e.g., const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
  // or in Remix, it might be automatically exposed.
  if (typeof (window as any).web3Provider === 'undefined') {
    throw new Error('web3Provider is not defined in the global scope.');
  }

  const web3 = new Web3((window as any).web3Provider);

  console.log(`Deploying contract: ${contractName}`);

  // Attempt to load the contract's JSON artifact from Remix.
  // The artifact is expected to have "abi" and "data.bytecode.object".
  const artifactsPath = `browser/contracts/artifacts/${contractName}.json`;

  let metadata: any;
  try {
    const artifactContent = await remix.call('fileManager', 'getFile', artifactsPath);
    metadata = JSON.parse(artifactContent);
  } catch (err) {
    throw new Error(`Failed to load artifact for ${contractName} at path ${artifactsPath}: ${err}`);
  }

  // Check presence of necessary fields
  if (!metadata?.abi || !metadata?.data?.bytecode?.object) {
    throw new Error(`Artifact for ${contractName} is missing 'abi' or 'data.bytecode.object'`);
  }

  // If 'from' is undefined, use the first account in the provider
  const accounts = await web3.eth.getAccounts();
  const deployerAddress = from || accounts[0];

  // Provide a default gas limit if none specified
  const gasLimit = gas || 1_500_000;

  // Create a Contract instance from the ABI
  const contract: Contract = new web3.eth.Contract(metadata.abi);

  // Prepare the deployment transaction
  const contractSend: ContractSendMethod = contract.deploy({
    data: metadata.data.bytecode.object,
    arguments: args,
  });

  console.log(`Using deployer address: ${deployerAddress}`);
  console.log(`Using gas limit: ${gasLimit}`);

  // Send the transaction
  let newContractInstance;
  try {
    newContractInstance = await contractSend.send({
      from: deployerAddress,
      gas: gasLimit,
      // optionally you could set gasPrice here if you want
      // gasPrice: web3.utils.toWei('20', 'gwei'),
    });
  } catch (deployErr) {
    console.error(`Deployment of ${contractName} failed:`, deployErr);
    throw deployErr;
  }

  console.log(`${contractName} successfully deployed at address:`, newContractInstance.options.address);

  // Return the deployed contract’s options object
  return newContractInstance.options;
}

}
