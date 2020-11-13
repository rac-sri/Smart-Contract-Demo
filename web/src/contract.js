import hmy from './hmy';
import fs from 'fs';

const initializeContract = async (wallet)=>{
    let contract = fs.readFileSync("../build/contracts/Counter.json" , { encoding: "UTF-8" });
    contract = JSON.parse(contract)
    const abi = contract.abi;
    const contractAddress = contract.networks['2'].address;
    const contractInstance = hmy.contracts.createContract(abi,contractAddress);
    return contractInstance    
}

export default initializeContract;