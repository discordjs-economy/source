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
}

export interface EconomyUserRewardsData {
    daily: boolean;
    weekly: boolean;
    work: boolean;
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
    before: BalancePrettyObject;
    after: BalancePrettyObject;
}

export interface BalancePrettyObject {
    value: number;
    pretty: string;
}

export interface DepositObject {
    amount: number;
    balance: DepositPrettyObject;
    bank: DepositPrettyObject;
}

export interface DepositPrettyObject {
    before: PrettyObject;
    after: PrettyObject;
}

export interface PrettyObject {
    value: number;
    pretty: string;
}