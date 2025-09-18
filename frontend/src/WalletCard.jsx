function WalletCard({ errorMessage, defaultAccount, userBalance, connectWalletHandler }) {
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
