import { Options, BalanceObject, PrettyObject } from '../Constants';
import { DBManager } from './DBManager';

export declare interface BalanceManager {
    options: Options;
    database: DBManager;
}

export declare class BalanceManager {
    constructor(options: Options);

    add(
        guildID: string,
        userID: string,
        amount: number
    ): Promise<BalanceObject>;

    subtract(
        guildID: string,
        userID: string,
        amount: number
    ): Promise<BalanceObject>;

    set(
        guildID: string,
        userID: string,
        value: number
    ): Promise<BalanceObject>;
    
    get(
        guildID: string,
        userID: string
    ): Promise<PrettyObject>;
}