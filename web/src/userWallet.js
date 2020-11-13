import  hmy  from './hmy';

class userStore {
     
    constructor (stores) {
        this.isOneWallet = window.onewallet && window.onewallet.isOneWallet;
        this.onewallet = window.onewallet;
    }

    async signin(){
        const getAccount = await this.onewallet.getAccount();
        this.address = getAccount.address;
        this.isAuthorized = true;
        await this.connectToOneWallet(this.onewallet)
        return Promise.resolve;
    }

    connectToOneWallet = async (
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
        };
      };
}

export default userStore