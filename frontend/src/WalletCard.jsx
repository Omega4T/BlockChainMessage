import { useState, useEffect } from "react";
import { ethers } from "ethers";

function WalletCard() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  useEffect(() => {
  const checkExistingConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          accountChangedHandler(accounts[0]);
        }
      } catch (err) {
        console.error("Error checking for existing connection:", err);
      }
    }
  };

  checkExistingConnection();
}, []); 

  const connectWalletHandler = async () => {
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
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount);
  };

  const getAccountBalance = async (account) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      setUserBalance(ethers.formatEther(balance));
    } catch (err) {
      setErrorMessage("Failed to get balance");
      console.error(err);
    }
  };
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", accountChangedHandler);
  }

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "2rem",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Wallet Connected</h2>

      {!defaultAccount && (
        <button
          onClick={connectWalletHandler}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #007bff",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Connect Wallet
        </button>
      )}

      {defaultAccount && (
        <div>
          <h3 style={{ margin: "0.5rem 0" }}>Address:</h3>
          <p style={{ wordWrap: "break-word", fontFamily: "monospace" }}>
            {defaultAccount}
          </p>
          <h3 style={{ marginTop: "1rem" }}>Balance:</h3>
          <p>
            {userBalance
              ? `${parseFloat(userBalance).toFixed(4)} ETH`
              : "Loading..."}
          </p>
        </div>
      )}

      {errorMessage && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
      )}
    </div>
  );
}

export default WalletCard;