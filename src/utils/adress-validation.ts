import { ethers } from "ethers";

export const isValidEthAddress = (address: string): boolean => {
  return ethers.utils.isAddress(address);
}