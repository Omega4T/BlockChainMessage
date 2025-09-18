import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../contractInfo';

const getContractInstance = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      return contract;
    }
    return null;
  } catch (error) {
    console.error("Failed to get contract instance:", error);
    return null;
  }
};

export default getContractInstance;