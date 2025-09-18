import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletCard from "./WalletCard";
import BlockChainMessage from "./BlockChainMessage";
import getContractInstance from "./services/contractService";
//=====================================
function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWalletHandler = async () => {
    setErrorMessage(null);
    if (window.ethereum) {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountChangedHandler(account[0]);
      } catch (err) {
        setErrorMessage("Failed to connect wallet");
        console.error(err);
      }
    } else {
      setErrorMessage("Please Install Metamask");
    }
  };

  const accountChangedHandler = (newAccount) => {
    if (Array.isArray(newAccount) && newAccount.length > 0) {
      setDefaultAccount(newAccount[0]);
    } else if (typeof newAccount === "string") {
      setDefaultAccount(newAccount);
    } else {
      setDefaultAccount(null);
      setUserBalance(null);
      setErrorMessage("Wallet disconnected.");
      setContract(null);
    }
  };

  const getAccountBalance = async (account) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      setUserBalance(ethers.formatEther(balance));
    } catch (err) {
      setErrorMessage("Failed to get balance.");
      console.error(err);
    }
  };

  useEffect(() => {
    const checkExistingConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            accountChangedHandler(accounts[0]);
          }
        } catch (err) {
          console.error("Error checking for existing connection:", err);
        }
      }
    }; checkExistingConnection();


    if(window.ethereum) {
      window.ethereum.on('accountsChanged', accountChangedHandler);
    }
    // Cleanup listener saat komponen unmount
    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener('accountsChanged', accountChangedHandler);
      }
    }
  }, []);

  useEffect(() => {
    const initContract = async () => {
      const contractInstance = await getContractInstance();
      setContract(contractInstance);
    };

    if (defaultAccount) {
      initContract();
      getAccountBalance(defaultAccount);
    } else {
      setContract(null); // Jika disconnect, hapus instance kontrak
    }
  }, [defaultAccount]);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: "2rem",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <WalletCard
          errorMessage={errorMessage}
          defaultAccount={defaultAccount}
          userBalance={userBalance}
          connectWalletHandler={connectWalletHandler}
        />
        <BlockChainMessage contract={contract} />
      </div>
    </div>
  );
}

export default App;
