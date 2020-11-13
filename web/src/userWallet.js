
class userStore {
     
    constructor (stores) {
        this.isOneWallet = window.onewallet && window.onewallet.isOneWallet;
        this.onewallet = window.onewallet;
    }

    async signin(){
        const getAccount = await this.onewallet.getAccount();
        this.address = getAccount.address;
        this.isAuthorized = true;
        return Promise.resolve;
    }

}

export default userStore