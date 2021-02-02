const { fromBech32 } = require('@harmony-js/crypto');
const defaults = {};

export class MathWallet {

	constructor(network, client) {
		console.log(network, client);
		this.isMathWallet = false;
	}

	 signIn() {
		if (!this.mathwallet) {
			this.initWallet();
		}

		this.mathwallet.getAccount().then((account) => {
			this.sessionType = `mathwallet`;

			this.address = account.address;
			this.isAuthorized = true;
			console.log(account.address, this.address);
			this.setBase16Address();
			return Promise.resolve();
		});
	}

	 signOut() {
		if (this.sessionType === 'mathwallet' && this.isMathWallet) {
			return this.mathwallet
				.forgetIdentity()
				.then(() => {
					this.sessionType = '';
					this.address = null;
					this.base16Address = null;
					this.isAuthorized = false;

					return Promise.resolve();
				})
				.catch((err) => {
					console.error(err.message);
				});
		}
	}

	 initWallet() {
		this.isMathWallet = window.harmony && window.harmony.isMathWallet;
		this.mathwallet = window.harmony;
		this.signIn();
	}


	 setBase16Address() {
		this.base16Address = fromBech32(this.address);
		console.log(this.base16Address);
	}

	 async signTransaction(txn) {
		console.log(this.isMathWallet);
		if (this.sessionType === 'mathwallet' && this.isMathWallet) {
			console.log(this.mathwallet);
			return this.mathwallet.signTransaction(txn);
		}
	}

	 attachToContract(contract) {
		contract.wallet.createAccount();

		if (contract.wallet.defaultSigner === '') {
			contract.wallet.defaultSigner = this.address;
		}

		contract.wallet.signTransaction = async (tx) => {
			try {
				tx.from = this.address;
				const signTx = await this.signTransaction(tx);
				console.log(signTx);
				return signTx;
			} catch (err) {
				if (err.type === 'locked') {
					alert(
						'Your MathWallet is locked! Please unlock it and try again!'
					);
					return Promise.reject();
				} else if (err.type === 'networkError') {
					await this.signIn();
					this.initWallet();

					try {
						tx.from = this.address;
						const signTx = await this.signTransaction(tx);
						return signTx;
					} catch (error) {
						return Promise.reject(error);
					}
				} else {
					alert(
						'An error occurred - please check that you have MathWallet installed and that it is properly configured!'
					);
					return Promise.reject();
				}
			}
		};

		return contract;
	}
}