# On-Chain Guestbook dApp 📖✍️

<div align="center">

![Vercel Deployment](https://img.shields.io/vercel/deployment/Omega4T/BlockChainMessage?style=for-the-badge)
![GitHub License](https://img.shields.io/github/license/Omega4T/BlockChainMessage?style=for-the-badge)

</div>

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)
![Hardhat](https://img.shields.io/badge/Hardhat-FFF600?style=for-the-badge&logo=hardhat&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Ethers.js](https://img.shields.io/badge/Ethers.js-2C50A7?style=for-the-badge&logo=ethers&logoColor=white)

</div>

<div align="center">

**[View Live Demo](https://block-chain-message.vercel.app/)**

</div>
<br>

![photo_2025-09-18_11-46-24](https://github.com/user-attachments/assets/796459cd-a0e4-426f-9989-b01b436facba)

---

## 🚀 About The Project

This project is a full-stack decentralized application (dApp) that demonstrates a complete end-to-end Web3 development workflow. It functions as a simple, on-chain guestbook where users can connect their Ethereum wallet and write a message that is permanently and transparently stored on the Sepolia testnet blockchain.

This repository serves as a portfolio piece showcasing the integration of a smart contract backend with a modern React frontend.

### Core Features:
* **Wallet Connectivity:** Connects to user's MetaMask wallet.
* **On-Chain Data Reading:** Fetches and displays the current message from the smart contract.
* **On-Chain Data Writing:** Allows users to submit a new message via a blockchain transaction.
* **Real-time Transaction Feedback:** Provides UI updates for pending, successful, and failed transactions.

---

## 🛠️ Tech Stack

### Smart Contract (Backend)
* **Solidity:** For writing the smart contract logic.
* **Hardhat:** For the development environment, testing, and deployment scripts.
* **Alchemy:** For the RPC node connection to the Sepolia network.

### Frontend
* **React.js (Vite):** For building the interactive user interface.
* **Ethers.js:** For connecting the frontend to the user's wallet and the smart contract.
* **Tailwind CSS:** For utility-first styling.
* **Vercel:** For deployment and hosting.

---

## ⚙️ Getting Started

To run this project locally, you will need to run the backend (Hardhat node) and the frontend (Vite server) in separate terminals.

### Prerequisites
* Node.js (v18 or later recommended)
* An Ethereum wallet browser extension like MetaMask

### Installation & Local Setup

1.  **Clone the Repository**
    ```sh
    git clone [https://github.com/Omega4T/BlockChainMessage.git](https://github.com/Omega4T/BlockChainMessage.git)
    cd BlockChainMessage
    ```

2.  **Set Up the Backend (Smart Contract)**
    ```sh
    # Navigate to the smart contract directory
    cd smart-contract
    # Install dependencies
    npm install
    ```
    Create a `.env` file in this directory and add your Sepolia RPC URL and Private Key. This is needed for public testnet deployment.
    ```env
    SEPOLIA_URL="YOUR_RPC_URL"
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
    ```

3.  **Set Up the Frontend**
    ```sh
    # Navigate to the frontend directory from the root
    cd frontend 
    # Install dependencies
    npm install
    ```
    Create a `.env` file in this `frontend` directory for the contract address.
    ```env
    VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
    ```

4.  **Run the Application Locally**
    * **Terminal 1 (Run Blockchain):**
        ```sh
        cd smart-contract
        npx hardhat node
        ```
    * **Terminal 2 (Deploy Contract Locally):**
        ```sh
        cd smart-contract
        npx hardhat run scripts/deploy.js --network localhost
        ```
        *(Copy the deployed address and paste it into the frontend's `.env` file)*
    * **Terminal 3 (Run Frontend):**
        ```sh
        cd frontend
        npm run dev
        ```

---

## 📜 Deployed Contract on Sepolia

The smart contract is publicly deployed on the Sepolia Testnet.

**[View Contract on Etherscan](https://sepolia.etherscan.io/address/YOUR_SEPOLIA_CONTRACT_ADDRESS)**

---
