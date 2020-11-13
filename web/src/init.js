import {connectToOneWallet} from './walletSetup';
import initializeContract from './contract';
import userWallet from './userWallet';

let but = document.getElementById("inputtButton");

but.addEventListener("click",initWallet);

async function initWallet(){
    initializeContract();
    const wallet = new userWallet();
    await wallet.signin();
    const connectToWallet = await connectToOneWallet(wallet);
    return connectToWallet;
}