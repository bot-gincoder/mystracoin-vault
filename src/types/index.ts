export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  balance: number;
  balanceChange: number;
}

export type TransactionStatus = "Completed" | "Pending" | "Failed" | "Cancelled";
export type TransactionType = "Deposit" | "Withdrawal" | "Transfer";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string;
  usdEquivalent: number;
  status: TransactionStatus;
  date: string;
  details: string; // e.g., "Transfer to Mark", "Crypto Deposit"
}

export interface Wallet {
  id: string;
  currency: string;
  name: string;
  balance: number;
  usdEquivalent: number;
  change24h: number;
}

export interface Beneficiary {
  id: string;
  name: string;
  initial: string;
}