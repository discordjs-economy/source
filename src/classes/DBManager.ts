import { EconomyGuildData, EconomyUserData, Options } from "../Constants";
import Enmap from "enmap";

export interface DBManager {
  options: Options;
  database: Enmap<string, EconomyGuildData>;
}

/**
 * Class that controls Database
 *
 * @class
 * @classdesc Database Manager
 */
export class DBManager {
  /**
   * @constructor
   *
   * @param {Options} Options Module Options
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
     * @type {Enmap<string, EconomyGuildData>}
     */
    this.database = new Enmap({
      name: this.options.DBName,
      dataDir:
        this.options.DBPath !== undefined ? this.options.DBPath : undefined,
    });
  }

  /**
   * Method that Returns Economy Guild Data from Database
   *
   * @param {String} id Discord Guild ID
   * @returns {Promise<EconomyGuildData>}
   */
  get(id: string): Promise<EconomyGuildData> {
    return new Promise(async (res, rej) => {
      var data = this.database.fetch(`economy-${id}`);
      if (!data) data = await this.createGuild(id);

      return res(data);
    });
  }

  /**
   * Method that Changes Something from Database
   *
   * @param {String} id Discord Guild ID
   * @param {any} value Value to Set
   *
   * @returns {Promise<boolean>}
   */
  set(id: string, value: any): Promise<boolean> {
    return new Promise((res, rej) => {
      this.database.set(`economy-${id}`, value);

      return res(true);
    });
  }

  /**
   * Method that Sets Value to Key from Database
   *
   * @param {string} guildID Discord Guild ID
   * @param {string} userID Discord User ID
   * @param {string} key Property Name
   * @param {number} value Value to Set
   *
   * @returns {Promise<boolean>}
   */
  setProp(
    guildID: string,
    userID: string,
    key: string,
    value: number
  ): Promise<boolean> {
    return new Promise(async (res, rej) => {
      var data = this.database.fetch(`economy-${guildID}`);
      if (!data) data = await this.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.createUser(guildID, userID);

      user[key] = value;
      this.set(guildID, data);

      return res(true);
    });
  }

  /**
   * Method that Pushes Something from Database
   *
   * @param {id} id Discord Guild ID
   * @param {any} value Value to Push
   *
   * @returns {Promise<boolean>}
   */
  push(id: string, value: any): Promise<boolean> {
    return new Promise((res, rej) => {
      this.database.push(`economy-${id}`, value);

      return res(true);
    });
  }

  /**
   * Method that Adds Value to Key from Database
   *
   * @param {string} guildID Discord Guild ID
   * @param {string} userID Discord User ID
   * @param {string} key Property Name
   * @param {number} value Value to Set
   *
   * @returns {Promise<boolean>}
   */
  add(
    guildID: string,
    userID: string,
    key: string,
    value: number
  ): Promise<boolean> {
    return new Promise(async (res, rej) => {
      var data = this.database.fetch(`economy-${guildID}`);
      if (!data) data = await this.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.createUser(guildID, userID);

      user[key] += value;
      this.set(guildID, data);

      return res(true);
    });
  }

  /**
   * Method that Subtracts Value from Key from Database
   *
   * @param {string} guildID Discord Guild ID
   * @param {string} userID Discord User ID
   * @param {string} key Property Name
   * @param {number} value Value to Set
   *
   * @returns {Promise<boolean>}
   */
  subtract(
    guildID: string,
    userID: string,
    key: string,
    value: number
  ): Promise<boolean> {
    return new Promise(async (res, rej) => {
      var data = this.database.fetch(`economy-${guildID}`);
      if (!data) data = await this.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.createUser(guildID, userID);

      user[key] -= value;
      this.set(guildID, data);

      return res(true);
    });
  }

  /**
   * Method that Creates User Data
   *
   * @param {string} guildID Discord Guild ID
   * @param {string} userID Discord User ID
   *
   * @returns {Promise<EconomyUserData>}
   */
  createUser(guildID: string, userID: string): Promise<EconomyUserData> {
    return new Promise(async (res, rej) => {
      var data = this.database.fetch(`economy-${guildID}`);
      if (!data) data = await this.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (user) return res(user);

      data.users.push({
        id: userID,
        balance: 0,
        bank: 0,
        rewards: {
          daily: {
            amount: null,
            collectedAt: null,
            collectAt: null,
          },

          weekly: {
            amount: null,
            collectedAt: null,
            collectAt: null,
          },

          work: {
            amount: null,
            collectedAt: null,
            collectAt: null,
          },
        },
        inventory: [],
        history: [],
      });

      this.set(guildID, data);

      const newGuildData = this.database.fetch(`economy-${guildID}`);
      const newUserData = newGuildData.users.find((x) => x.id === userID)!;

      return res(newUserData);
    });
  }

  /**
   * Method that Creates Guild Data
   *
   * @param {string} guildID Discord Guild ID
   *
   * @returns {Promise<EconomyGuildData>}
   */
  createGuild(guildID: string): Promise<EconomyGuildData> {
    return new Promise(async (res, rej) => {
      var data = this.database.has(`economy-${guildID}`);

      if (data) return res(this.database.fetch(`economy-${guildID}`));
      else {
        this.database.set(`economy-${guildID}`, {
          users: [],
          shop: [],
        });

        const newGuildData = this.database.fetch(`economy-${guildID}`);
        return res(newGuildData);
      }
    });
  }
}
