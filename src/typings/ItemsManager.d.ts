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

/**
 * Class that controls Items from Shop
 *
 * @class
 * @classdesc Items Manager Class
 */
export declare class ItemsManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

  /**
   * Method that Buys an Item from Shop.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} itemID Item ID
   *
   * @returns {Promise<boolean|ErrorObject>}
   */
  buy(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<boolean | ErrorObject>;

  /**
   * Method that Sells an Item from Inventory.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} itemID Item ID
   *
   * @returns {Promise<boolean|ErrorObject>}
   */
  sell(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<boolean | ErrorObject>;

  /**
   * Method that Uses an Item from Inventory.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} itemID Item ID
   *
   * @returns {Promise<EconomyGuildShopItem|ErrorObject>}
   */
  use(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<EconomyGuildShopItem | ErrorObject>;

  /**
   * Method that Returns an Item Data from Inventory.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} itemID Item ID
   *
   * @returns {Promise<EconomyGuildShopItem|ErrorObject>}
   */
  get(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<EconomyGuildShopItem | ErrorObject>;

  /**
   * Method that Returns All the Items from Inventory.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<EconomyGuildShopItem[]|ErrorObject>}
   */
  all(
    guildID: string,
    userID: string
  ): Promise<EconomyGuildShopItem[] | ErrorObject>;
}
