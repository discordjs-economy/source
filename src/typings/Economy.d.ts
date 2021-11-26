import { Leaderboard, Options } from '../Constants';
import { DBManager } from './DBManager';
import { BalanceManager } from './BalanceManager';
import { BankManager } from './BankManager';
import { ShopManager } from './ShopManager';

export declare interface Economy {
    options: Options;
    database: DBManager;

    balance: BalanceManager;
    bank: BankManager;
    shop: ShopManager;
}

export declare class Economy {
    constructor(options: Options);

    leaderboard(
        guildID: string
    ): Promise<boolean|Leaderboard[]>;
}