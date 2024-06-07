import { ethers } from "ethers";

export const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatValue = (value: string): string => {
  return new Intl.NumberFormat(navigator.language).format(ethers.utils.formatEther(value));
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
}
