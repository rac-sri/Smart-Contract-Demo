import initializeContract from './contract';
import { MathWallet } from './walletStore';
import hmy from './hmy';

let but = document.getElementById("inputtButton");

but.addEventListener("click",initWallet);

async function initWallet(){
    const wallet = new MathWallet('testnet',hmy);
    await wallet.signIn();
    const unattachedContract = await initializeContract();
    console.log(contract)
    const contract = await wallet.attachToContract(unattachedContract)
    const result = await contract.methods.getCount().call()
    console.log(result.toString())
}