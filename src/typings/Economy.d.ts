import { Leaderboard, Options } from '../Constants';

// Managers
import { DBManager } from './DBManager';
import { BalanceManager } from './BalanceManager';
import { BankManager } from './BankManager';
import { ShopManager } from './ShopManager';
import { ItemsManager } from './ItemsManager';

export declare interface Economy {
    options: Options;
    database: DBManager;

    balance: BalanceManager;
    bank: BankManager;
    shop: ShopManager;
    items: ItemsManager;
}

export declare class Economy {
    constructor(options: Options);

    leaderboard(
        guildID: string
    ): Promise<boolean|Leaderboard[]>;

    private init(): Promise<boolean>;
    private checkVersion(): Promise<boolean>;
}