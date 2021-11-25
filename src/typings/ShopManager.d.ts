import { EconomyGuildShopItem, Options } from "../Constants";
import { DBManager } from "./DBManager";
import { BalanceManager } from "./BalanceManager";

export declare interface ShopManager {
    options: Options;
    database: DBManager;

    balance: BalanceManager;
}

export declare class ShopManager {
    constructor(options: Options);

    create(
        guildID: string,
        item: EconomyGuildShopItem
    ): Promise<EconomyGuildShopItem>;

    delete(
        guildID: string,
        itemID: number
    ): Promise<boolean>;

    update<K extends keyof EconomyGuildShopItem>(
        guildID: string,
        itemID: number,
        key: K,
        value: EconomyGuildShopItem[K]
    ): Promise<boolean | EconomyGuildShopItem>;

    all(
        guildID: string
    ): Promise<boolean | EconomyGuildShopItem>;
}