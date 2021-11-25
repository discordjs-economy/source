import { Options, EconomyGuildData, EconomyUserData } from '../Constants';
import Enmap from 'enmap';

export declare interface DBManager {
    options: Options;
    database: Enmap<string, EconomyGuildData>;
}

export declare class DBManager {
    constructor(options: Options);

    get(
        id: string,
    ): Promise<EconomyGuildData>;

    set(
        id: string,
        value: any
    ): Promise<boolean>;

    setProp(
        guildID: string,
        userID: string,
        key: string,
        value: number
    ): Promise<boolean>;

    push(
        id: string,
        value: any
    ): Promise<boolean>;

    add(
        guildID: string,
        userID: string,
        key: string,
        value: number
    ): Promise<boolean>;

    subtract(
        guildID: string,
        userID: string,
        key: string,
        value: number
    ): Promise<boolean>;

    createUser(
        guildID: string,
        userID: string
    ): Promise<EconomyUserData>;

    createGuild(
        guildID: string
    ): Promise<EconomyGuildData>;
}