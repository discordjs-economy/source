import { EconomyGuildShopItem, ErrorObject, Options } from "../Constants";
import { BalanceManager } from "./BalanceManager";
import { DBManager } from "./DBManager";
import { HistoryManager } from "./HistoryManager";

export interface ItemsManager {
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
export class ItemsManager {
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

    /**
     * History Manager
     *
     * @type {HistoryManager}
     */
    this.history = new HistoryManager(this.options);
  }

  /**
   * Method that Buys an Item from Shop.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} itemID Item ID
   *
   * @returns {Promise<boolean|ErrorObject>}
   */
  buy(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<boolean | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);

      if (!data) data = await this.database.createGuild(guildID);
      if (!data.shop.length) {
        return res({
          status: false,
          message: "Guild Shop is Empty!",
        });
      }

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      var item = data.shop.find((x) => x.id === itemID);
      if (!item) {
        return res({
          status: false,
          message: "Item Not Found in the Guild Shop!",
        });
      }

      if (user.balance < item.cost) {
        return res({
          status: false,
          message: "Balance is smaller than Item Cost!",
        });
      }

      this.balance.subtract(guildID, userID, item.cost);
      this.history.create(guildID, userID, "buy", item.cost);

      user.inventory.push({
        itemID: item.id,
        name: item.name,
        description: item?.description,
        cost: item.cost,
        role: item?.role,
        date: Date.now(),
      });

      this.database.set(guildID, data);

      return res(true);
    });
  }

  /**
   * Method that Sells an Item from Inventory.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} itemID Item ID
   *
   * @returns {Promise<boolean|ErrorObject>}
   */
  sell(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<boolean | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);

      if (!data) data = await this.database.createGuild(guildID);
      if (!data.shop.length) {
        return res({
          status: false,
          message: "Guild Shop is Empty!",
        });
      }

      var user = data.users.find((x) => x.id === userID);

      if (!user) user = await this.database.createUser(guildID, userID);
      if (!user.inventory.length) {
        return res({
          status: false,
          message: "User Inventory is Empty!",
        });
      }

      var item = data.shop.find((x) => x.id === itemID);
      if (!item) {
        return res({
          status: false,
          message: "Item Not Found in the Guild Shop!",
        });
      }

      user.inventory = user.inventory.filter((x) => x.itemID !== itemID);
      this.balance.add(guildID, userID, item.cost);
      this.history.create(guildID, userID, "sell", item.cost);
      this.database.set(guildID, data);

      return res(true);
    });
  }

  /**
   * Method that Uses an Item from Inventory.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} itemID Item ID
   *
   * @returns {Promise<EconomyGuildShopItem|ErrorObject>}
   */
  use(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<EconomyGuildShopItem | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);

      if (!data) data = await this.database.createGuild(guildID);
      if (!data.shop.length) {
        return res({
          status: false,
          message: "Guild Shop is Empty!",
        });
      }

      var user = data.users.find((x) => x.id === userID);

      if (!user) user = await this.database.createUser(guildID, userID);
      if (!user.inventory.length) {
        return res({
          status: false,
          message: "User Inventory is Empty!",
        });
      }

      var item = data.shop.find((x) => x.id === itemID);
      if (!item) {
        return res({
          status: false,
          message: "Item Not Found in the Guild Shop!",
        });
      }

      var itemInInventory = user.inventory.find((x) => x.itemID === itemID);
      if (!itemInInventory) {
        return res({
          status: false,
          message: "Item Not Found in User Inventory!",
        });
      }

      user.inventory = user.inventory.filter((x) => x.itemID !== itemID);
      this.database.set(guildID, data);

      return res(itemInInventory);
    });
  }

  /**
   * Method that Returns an Item Data from Inventory.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} itemID Item ID
   *
   * @returns {Promise<EconomyGuildShopItem|ErrorObject>}
   */
  get(
    guildID: string,
    userID: string,
    itemID: number
  ): Promise<EconomyGuildShopItem | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);

      if (!data) data = await this.database.createGuild(guildID);
      if (!data.shop.length) {
        return res({
          status: false,
          message: "Guild Shop is Empty!",
        });
      }

      var user = data.users.find((x) => x.id === userID);

      if (!user) user = await this.database.createUser(guildID, userID);
      if (!user.inventory.length) {
        return res({
          status: false,
          message: "User Inventory is Empty!",
        });
      }

      var item = data.shop.find((x) => x.id === itemID);
      if (!item) {
        return res({
          status: false,
          message: "Item Not Found in the Guild Shop!",
        });
      }

      var itemInInventory = user.inventory.find((x) => x.itemID === itemID);
      if (!itemInInventory) {
        return res({
          status: false,
          message: "Item Not Found in User Inventory!",
        });
      }

      return res(itemInInventory);
    });
  }

  /**
   * Method that Returns All the Items from Inventory.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   *
   * @returns {Promise<EconomyGuildShopItem[]|ErrorObject>}
   */
  all(
    guildID: string,
    userID: string
  ): Promise<EconomyGuildShopItem[] | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);

      if (!data) data = await this.database.createGuild(guildID);
      if (!data.shop.length) {
        return res({
          status: false,
          message: "Guild Shop is Empty!",
        });
      }

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);
      if (!user.inventory.length) {
        return res({
          status: false,
          message: "User Inventory is Empty!",
        });
      }

      return res(user.inventory);
    });
  }
}
