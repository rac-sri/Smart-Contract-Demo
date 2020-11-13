import {Contract} from '@harmony-js/contract';
import fs from 'fs';

const initializeContract = ()=>{
    const contract = fs.readFileSync("../build/contracts/Counter.json" , { encoding: "UTF-8" });
    const abi = contract.abi;
    return abi;
}

export default initializeContract;