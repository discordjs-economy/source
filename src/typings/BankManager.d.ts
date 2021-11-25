import { Options, BalanceObject } from '../Constants';
import { DBManager } from './DBManager';

export declare interface BankManager {
    options: Options;
    database: DBManager;
}

export declare class BankManager {
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

    deposit(
        guildID: string,
        userID: string,
        amount: number
    ): Promise<BalanceObject>;

    withdraw(
        guildID: string,
        userID: string,
        amount: number
    ): Promise<BalanceObject>;
}