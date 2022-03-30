import { EconomyGuildShopItem, ErrorObject, Options } from "../Constants";
import { BalanceManager } from "./BalanceManager";
import { HistoryManager } from "./HistoryManager";
import { DBManager } from "./DBManager";

export declare interface ItemsManager {
  options: Options;
  database: DBManager;

  balance: BalanceManager;
  history: HistoryManager;
}

export declare class ItemsManager {
  constructor(options: Options);

  buy(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<boolean | ErrorObject>;

  sell(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<boolean | ErrorObject>;

  use(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<EconomyGuildShopItem | ErrorObject>;

  get(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<EconomyGuildShopItem | ErrorObject>;

  all(
    guildID: string,
    userID: string
  ): Promise<EconomyGuildShopItem[] | ErrorObject>;
}
