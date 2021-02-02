import detectEthereumProvider from "@metamask/detect-provider";

let ethAddress;
let isAuthorised = false;

const handleAccountsChanged = (accounts) => {
  if (accounts.length === 0) {
    console.error("Not found accounts");
  } else {
    ethAddress = accounts[0];

    console.log("Your address: ", ethAddress);
  }
};

export const signInMetamask = async () => {
  const provider = await detectEthereumProvider();

  // @ts-ignore
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?");
  }

  if (!provider) {
    console.error("Metamask not found");
    return;
  }

  // MetaMask events
  provider.on("accountsChanged", handleAccountsChanged);

  provider.on("disconnect", () => {
    console.log("disconnect");
    isAuthorised = false;
  });

  provider.on("chainIdChanged", (chainId) =>
    console.log("chainIdChanged", chainId)
  );

  provider
    .request({ method: "eth_requestAccounts" })
    .then(async (params) => {
      handleAccountsChanged(params);
      isAuthorised = true;
    })
    .catch((err) => {
      isAuthorised = false;

      if (err.code === 4001) {
        console.error("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    });
};
