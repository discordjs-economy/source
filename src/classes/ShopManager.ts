import { EconomyGuildShopItem, Options } from "../Constants";
import { DBManager } from "./DBManager";
import { BalanceManager } from "./BalanceManager";

export interface ShopManager {
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
export class ShopManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options) {
    /**
     * Module Options
     *
     * @type {Options}
     */
    this.options = options;
    if (!this.options.DBName) this.options.DBName = "economy";

    /**
     * Module Database
     *
     * @type {DBManager}
     */
    this.database = new DBManager(this.options);

    /**
     * Balance Manager
     *
     * @type {BalanceManager}
     */
    this.balance = new BalanceManager(this.options);
  }

  /**
   * Method that Creates Item for Shop
   *
   * @param {String} guildID Guild ID
   * @param {EconomyGuildShopItem} data
   *
   * @returns {Promise<EconomyGuildShopItem>}
   */
  create(
    guildID: string,
    item: EconomyGuildShopItem
  ): Promise<EconomyGuildShopItem> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var itemCheck = data.shop.find((x) => x.id === item.id);
      if (itemCheck) return res(itemCheck);

      var itemID = data.shop.length + 1;
      var itemData = {
        id: itemID,
        ...item,
      };

      data.shop.push(itemData);
      this.database.set(guildID, data);

      return res(itemData);
    });
  }

  /**
   * Method that Deletes Item from Shop
   *
   * @param {String} guildID Guild ID
   * @param {Number} itemID Item ID
   *
   * @returns {Promise<boolean>}
   */
  delete(guildID: string, itemID: number): Promise<boolean> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var item = data.shop.find((x) => x.id === itemID);
      if (!item) return res(false);

      data.shop.filter((x) => x.id !== itemID);
      this.database.set(guildID, data);

      return res(true);
    });
  }

  /**
   * Method that Change Something in Item from Shop
   *
   * @param {String} guildID Guild ID
   * @param {Number} itemID Item ID
   * @param {String} key Key to Change
   * @param {any} value Value to Change
   *
   * @returns {Promise<boolean | EconomyGuildShopItem>}
   */
  update<K extends keyof EconomyGuildShopItem>(
    guildID: string,
    itemID: number,
    key: K,
    value: EconomyGuildShopItem[K]
  ): Promise<boolean | EconomyGuildShopItem> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      if (key === "id") return rej("[DJS-Economy] Item ID cannot be changed!");

      const item = data.shop.find((x) => x.id === itemID);
      if (!item) return res(false);

      item[key] = value;
      this.database.set(guildID, data);

      return res(item);
    });
  }

  /**
   * Method that Returns All the Items from Shop
   *
   * @param {String} guildID Guild ID
   * @returns {Promise<boolean | EconomyGuildShopItem[]>}
   */
  all(guildID: string): Promise<boolean | EconomyGuildShopItem[]> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);

      if (!data) data = await this.database.createGuild(guildID);
      if (!data.shop.length) return res(false);

      return res(data.shop);
    });
  }
}
