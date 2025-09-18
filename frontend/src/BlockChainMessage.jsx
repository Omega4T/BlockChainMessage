import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./contractInfo";

function BlockChainMessage() {
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [_provider, setProvider] = useState(null);
  const [_signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [txStatus, setTxStatus] = useState("idle");

  useEffect(() => {

    async function init() {
      if (typeof window.ethereum !== "undefined") {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);

        const newSigner = await newProvider.getSigner();
        setSigner(newSigner);

        const newContract = new ethers.Contract(
          contractAddress,
          contractABI,
          newSigner
        );
        setContract(newContract);
      } else {
        alert("MetaMask not installed!");
      }
    }
    init();
  }, []);

  async function fetchMessage() {
    if (contract) {
      try {
        const savedMessage = await contract.getMessage();
        setMessage(savedMessage);
      } catch (error) {
        console.error("Failed to fetch message:", error);
      }
    }
  }

  useEffect(() => {
    fetchMessage();
  }, [contract]); 

  async function handleSubmitMessage(event) {
    event.preventDefault();
    if (contract && inputMessage.trim() !== "") {
      try {
        setTxStatus("pending");
        const tx = await contract.setMessage(inputMessage);

        await tx.wait();
        setTxStatus("success");
        fetchMessage();
        setInputMessage("");
        fetchMessage();
      } catch (error) {
        setTxStatus("error");
        console.error("Failed to send transaction:", error);
      }
    }
  }

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #007bff",
        borderRadius: "8px",
        marginTop: "2rem",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Blockchain Message (Sepolia)</h2>
      <div
        style={{
          backgroundColor: "#e9ecef",
          padding: "1rem",
          borderRadius: "4px",
          margin: "1rem 0",
        }}
      >
        <strong>Current Message:</strong>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "1.2rem",
            marginTop: "0.5rem",
          }}
        >
          "{message || "Loading..."}"
        </p>
      </div>
      <form onSubmit={handleSubmitMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type new message..."
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", boxSizing:"border-box" }}
          disabled={txStatus === "pending"}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
          }}
          disabled={txStatus === "pending"}
        >
          {txStatus === "pending"
            ? "Processing..."
            : "Send Message to Blockchain"}
        </button>
      </form>
      {txStatus === "success" && (
        <p style={{ color: "green", marginTop: "1rem" }}>Transaction Completed</p>
      )}
      {txStatus === "error" && (
        <p style={{ color: "red", marginTop: "1rem" }}>
          Transaction Failed. Please try again.
        </p>
      )}
    </div>
  );
}

export default BlockChainMessage;
