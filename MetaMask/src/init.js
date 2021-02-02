import { signInMetamask } from "./walletStore";
import Web3 from "web3";
import fs from "fs";
let but = document.getElementById("inputtButton");

let web3;
let contract;

async function setupContract() {
  let contractFile = fs.readFileSync("../build/contracts/Counter.json", {
    encoding: "UTF-8",
  });
  contractFile = JSON.parse(contractFile);
  const abi = contractFile.abi;
  const contractAddress = contractFile.networks["2"].address;
  await signInMetamask();
  web3 = new Web3(window.web3.currentProvider);

  const contractInstance = new web3.eth.Contract(abi, contractAddress);
  contract = contractInstance;
}

but.addEventListener("click", demoInteraction);

async function demoInteraction() {
  await setupContract();
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  const increment = await contract.methods
    .addMoney()
    .send({ from: accounts[0], value: web3.utils.wei });
  console.log(increment);
}

const show = document.getElementById("showtoken");
show.addEventListener("click", showValue);

async function showValue() {
  await setupContract();
  const value = await contract.methods.getMoneyStored().call();
  console.log(value.toString());
  const para = document.createElement("p");
  para.innerHTML = value.toString();
  show.after(para);
}
