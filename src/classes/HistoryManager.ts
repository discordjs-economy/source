import {
  ActionType,
  EconomyUserHistory,
  ErrorObject,
  Options,
} from "../Constants";
import { DBManager } from "./DBManager";

export interface HistoryManager {
  options: Options;
  database: DBManager;
}

/**
 * Class that controls User History
 *
 * @class
 * @classdesc HistoryManager Class
 */
export class HistoryManager {
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
  }

  /**
   * Method that creates history object in user's history
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {ActionType} action Action
   * @param {number} amount Amount
   *
   * @returns {Promise<EconomyUserHistory>}
   */
  create(
    guildID: string,
    userID: string,
    action: ActionType,
    amount: number
  ): Promise<EconomyUserHistory> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      const history_data: EconomyUserHistory = {
        id: user.history.length + 1,
        type: action,
        amount: amount,
        date: Date.now(),
      };

      user.history.push(history_data);
      this.database.set(guildID, data);

      return res(history_data);
    });
  }

  /**
   * Method that removes history object from user's history
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} id History Object ID
   *
   * @returns {Promise<boolean|EconomyUserHistory[]>}
   */
  delete(
    guildID: string,
    userID: string,
    id: number
  ): Promise<ErrorObject | EconomyUserHistory[]> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      const history = await this.all(guildID, userID);
      if ("status" in history) {
        return res({
          status: false,
          message: "User History is empty!",
        });
      }

      const obj = history.find((x) => x.id === id);
      if (!obj) {
        return res({
          status: false,
          message: `History Object with ID ${id} is not found!`,
        });
      }

      user.history = user.history.filter((x) => x.id !== obj.id);
      this.database.set(guildID, data);

      return res(user.history);
    });
  }

  /**
   * Method that returns all the user's history
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<boolean|EconomyUserHistory[]>}
   */
  all(
    guildID: string,
    userID: string
  ): Promise<ErrorObject | EconomyUserHistory[]> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);

      if (!user) user = await this.database.createUser(guildID, userID);
      if (!user.history.length) {
        return res({
          status: false,
          message: "User History is empty!",
        });
      }

      return res(user.history);
    });
  }
}
