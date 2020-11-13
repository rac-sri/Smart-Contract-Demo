import { Contract } from '@harmony-js/contract';
import initializeContract from './contract';
import userWallet from './userWallet';

let but = document.getElementById("inputtButton");

but.addEventListener("click",initWallet);

async function initWallet(){
    const wallet = new userWallet();
    await wallet.signin();
    const contract = await initializeContract();
    console.log(contract)
    const result = await contract.methods.getCount().call()
    console.log(result.toString())
}