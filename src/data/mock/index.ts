import { User, Transaction, Wallet, Beneficiary } from "../../types";

export const mockUser: User = {
  id: "u1",
  name: "gzfdaniel179",
  email: "gzfdaniel@mystracoin.io",
  phone: "+1 (555) 012-3456",
  country: "United States",
  balance: 1200.50,
  balanceChange: 250.75
};

export const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "Transfer",
    amount: -200,
    currency: "USDT",
    usdEquivalent: -199.84,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    details: "Transfer to Mark"
  },
  {
    id: "tx2",
    type: "Deposit",
    amount: 0.0123,
    currency: "BTC",
    usdEquivalent: 768.55,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    details: "Crypto Deposit"
  },
  {
    id: "tx3",
    type: "Withdrawal",
    amount: -250,
    currency: "EUR",
    usdEquivalent: -267.10,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    details: "Bank Withdrawal"
  },
  {
    id: "tx4",
    type: "Deposit",
    amount: 500,
    currency: "USD",
    usdEquivalent: 500,
    status: "Pending",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    details: "Bank Deposit"
  },
  {
    id: "tx5",
    type: "Transfer",
    amount: -50,
    currency: "USDT",
    usdEquivalent: -49.95,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    details: "Transfer to Alice"
  },
  {
    id: "tx6",
    type: "Withdrawal",
    amount: -0.1,
    currency: "ETH",
    usdEquivalent: -360.50,
    status: "Failed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    details: "Crypto Withdrawal"
  },
  {
    id: "tx7",
    type: "Deposit",
    amount: 1000,
    currency: "USDT",
    usdEquivalent: 1000,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    details: "Crypto Deposit"
  },
  {
    id: "tx8",
    type: "Transfer",
    amount: 150,
    currency: "USD",
    usdEquivalent: 150,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    details: "Transfer from Bob"
  },
  {
    id: "tx9",
    type: "Withdrawal",
    amount: -100,
    currency: "USD",
    usdEquivalent: -100,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    details: "Card Payment"
  },
  {
    id: "tx10",
    type: "Deposit",
    amount: 0.05,
    currency: "ETH",
    usdEquivalent: 180.25,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    details: "Mining Reward"
  },
  {
    id: "tx11",
    type: "Transfer",
    amount: -300,
    currency: "USDT",
    usdEquivalent: -300,
    status: "Cancelled",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    details: "Transfer to Exchange"
  },
  {
    id: "tx12",
    type: "Deposit",
    amount: 200,
    currency: "EUR",
    usdEquivalent: 213.50,
    status: "Completed",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
    details: "Bank Deposit"
  }
];

export const mockWallets: Wallet[] = [
  { id: "w1", currency: "USD", name: "US Dollar", balance: 850.25, usdEquivalent: 850.25, change24h: 0 },
  { id: "w2", currency: "BTC", name: "Bitcoin", balance: 0.0145, usdEquivalent: 904.80, change24h: 2.3 },
  { id: "w3", currency: "ETH", name: "Ethereum", balance: 0.52, usdEquivalent: 1872.40, change24h: -1.1 },
  { id: "w4", currency: "USDT", name: "Tether", balance: 450.00, usdEquivalent: 450.00, change24h: 0 },
  { id: "w5", currency: "EUR", name: "Euro", balance: 320.00, usdEquivalent: 342.50, change24h: 0.5 }
];

export const mockBeneficiaries: Beneficiary[] = [
  { id: "b1", name: "Mark", initial: "M" },
  { id: "b2", name: "Alice", initial: "A" },
  { id: "b3", name: "Bob", initial: "B" },
  { id: "b4", name: "Sarah", initial: "S" },
  { id: "b5", name: "David", initial: "D" }
];