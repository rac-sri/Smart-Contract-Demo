import fs from "fs";
import { MathWallet } from "./walletStore";
const { Harmony } = require("@harmony-js/core");
const { ChainType, ChainID } = require("@harmony-js/utils");
const { BN } = require("@harmony-js/crypto");
const { toWei } = require("@harmony-js/utils");

const hmy = new Harmony(
    // let's assume we deploy smart contract to this end-point URL
    "https://api.s0.b.hmny.io",
    {
        chainType: ChainType.Harmony,
        chainId: 2,
    }
);

const initializeContract = async () => {
    let contract = fs.readFileSync("../build/contracts/Counter.json", {
        encoding: "UTF-8",
    });
    contract = JSON.parse(contract);
    const abi = contract.abi;
    const contractAddress = contract.networks["2"].address;
    const contractInstance = hmy.contracts.createContract(abi, contractAddress);
    return contractInstance;
};

let but = document.getElementById("inputtButton");

but.addEventListener("click", initWallet);

async function initWallet() {
    const wallet = new MathWallet("testnet", hmy);
    await wallet.signIn();

    const unattachedContract = await initializeContract();
    const contract = await wallet.attachToContract(unattachedContract);
    const result = await contract.methods.getCount().call();
    console.log(result.toString());

    const one = new BN("1");
    let options = {
        gasPrice: 1000000000,
        gasLimit: 2100000,
        value: toWei(one, hmy.utils.Units.one),
    };

    const increment = await contract.methods.addMoney().send(options);
}

const show = document.getElementById("showtoken");
show.addEventListener("click", showValue);

async function showValue() {
    const contract = initializeContract();
    const value = await contract.methods.getMoneyStored().call();
    console.log(value.toString());
    const para = document.createElement("p");
    para.innerHTML = value.toString();
    show.after(para);
}
