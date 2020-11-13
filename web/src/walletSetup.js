import  hmy  from './hmy';
import { Wallet } from '@harmony-js/account';

export const options1 = { gasPrice: '0x3B9ACA00' };

export const options = { gasPrice: 1000000000, gasLimit: 6721900 };

export const options2 = { gasPrice: 1000000000, gasLimit: 21000 };

export const ONE = '000000000000000000';

export const connectToOneWallet = async (
  wallet
) => {

  let { address } = await window.onewallet.getAccount();
  let userAddress = hmy.crypto.getAddress(address).checksum;

  wallet.defaultSigner = userAddress;

  wallet.signTransaction = async tx => {
    try {
      tx.from = userAddress;

      const signTx = await window.onewallet.signTransaction(tx);

      return signTx;
    } catch (e) {
      throw "Something went wrong"
    }

    return null;
  };
};