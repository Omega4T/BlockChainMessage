import { useState, useEffect } from "react";

function BlockChainMessage({contract}) {
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [txStatus, setTxStatus] = useState("idle");
  const [txSuccessMessage, setTxSuccessMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      if (contract) { 
        try {
          const savedMessage = await contract.getMessage();
          setMessage(savedMessage);
        } catch (error) {
          console.error("Failed to fetch message:", error);
          setMessage("Could not fetch message from contract.");
        }
      } else {
        setMessage("Please connect your wallet to interact.");
      }
    };

    fetchMessage();
  }, [contract]); 

  async function handleSubmitMessage(event) {
    event.preventDefault();
    if (!contract || inputMessage.trim() === "") return;
    setTxStatus("idle");
    setTxSuccessMessage("");

    try {
      setTxStatus("pending");
      const tx = await contract.setMessage(inputMessage);

      await tx.wait();
      
      setTxStatus("success");
      setTxSuccessMessage("Transaction successful!");
      
      const savedMessage = await contract.getMessage();
      setMessage(savedMessage);
      setInputMessage("");

    } catch (error) {
      setTxStatus("error");
      console.error("Failed to send transaction:", error);
    }
  }

  useEffect(() => {
    if (txStatus === 'success') {
      const timer = setTimeout(() => {
        setTxStatus('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [txStatus]);

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
        <p style={{ color: "green", marginTop: "1rem" }}>{txSuccessMessage}</p>
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
