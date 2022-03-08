export interface Options {
  DBName?: string;
  DBPath?: string;
  rewards: Rewards;
}

interface Rewards {
  daily: number;
  weekly: number;
  work: number | number[];
}

export interface EconomyGuildData {
  users: EconomyUserData[];
  shop: EconomyGuildShopItem[];
}

export interface EconomyUserData {
  id: string;
  balance: number;
  bank: number;
  rewards: EconomyUserRewardsData;
  inventory: EconomyUserInventory[];
  history: EconomyUserHistory[];
}

export interface EconomyUserRewardsData {
  daily: EconomyUserRewardObject;
  weekly: EconomyUserRewardObject;
  work: EconomyUserRewardObject;
}

export interface EconomyUserRewardObject {
  amount: number;
  collectedAt?: number;
  collectAt?: number;
}

export interface EconomyUserInventory {
  itemID: number;
  name: string;
  description?: string;
  cost: number;
  role?: string;
  date: number;
}

export interface EconomyGuildShopItem {
  id?: number;
  name: string;
  description?: string;
  cost: number;
  role?: string;
}

export interface BalanceObject {
  amount: number;
  balance: BalancePrettyObject;
}

export interface BalancePrettyObject {
  before: number;
  after: number;
}

export interface DepositObject {
  amount: number;
  balance: BalancePrettyObject;
  bank: DepositPrettyObject;
}

export interface DepositPrettyObject {
  before: number;
  after: number;
}

export interface ErrorObject {
  status: boolean;
  message?: string;
  data?: any;
}

export interface Leaderboard {
  userID: string;
  balance: number;
  bank: number;
  rank: number;
}

export interface EconomyUserHistory {
  id: number;
  type: ActionType;
  amount: number;
  date: number;
}

export type CooldownType = "daily" | "weekly" | "work";
export type ActionType =
  | "daily"
  | "weekly"
  | "work"
  | "buy"
  | "sell"
  | "add"
  | "subtract"
  | "set"
  | "bank-add"
  | "bank-set"
  | "bank-subtract";
