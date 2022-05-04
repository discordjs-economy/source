import { EconomyGuildShopItem, Options } from "../Constants";
import { BalanceManager } from "./BalanceManager";
import { DBManager } from "./DBManager";

export declare interface ShopManager {
  options: Options;
  database: DBManager;

  balance: BalanceManager;
}

/**
 * Class that controls Balance System
 *
 * @class
 * @classdesc Balance Class
 */
export declare class ShopManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

  /**
   * Method that Creates Item for Shop
   *
   * @param {string} guildID Guild ID
   * @param {EconomyGuildShopItem} data
   *
   * @returns {Promise<EconomyGuildShopItem>}
   */
  create(
    guildID: string,
    item: EconomyGuildShopItem
  ): Promise<EconomyGuildShopItem>;

  /**
   * Method that Deletes Item from Shop
   *
   * @param {string} guildID Guild ID
   * @param {number} itemID Item ID
   *
   * @returns {Promise<boolean>}
   */
  delete(guildID: string, itemID: number): Promise<boolean>;

  /**
   * Method that Change Something in Item from Shop
   *
   * @param {string} guildID Guild ID
   * @param {number} itemID Item ID
   * @param {string} key Key to Change
   * @param {any} value Value to Change
   *
   * @returns {Promise<boolean | EconomyGuildShopItem>}
   */
  update<K extends keyof EconomyGuildShopItem>(
    guildID: string,
    itemID: number,
    key: K,
    value: EconomyGuildShopItem[K]
  ): Promise<boolean | EconomyGuildShopItem>;

  /**
   * Method that Returns All the Items from Shop
   *
   * @param {string} guildID Guild ID
   * @returns {Promise<boolean | EconomyGuildShopItem[]>}
   */
  all(guildID: string): Promise<boolean | EconomyGuildShopItem[]>;
}
