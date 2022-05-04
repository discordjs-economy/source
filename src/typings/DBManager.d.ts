import { Options, EconomyGuildData, EconomyUserData } from "../Constants";
import Enmap from "enmap";

export declare interface DBManager {
  options: Options;
  database: Enmap<string, EconomyGuildData>;
}

/**
 * Class that controls Database
 *
 * @class
 * @classdesc Database Manager
 */
export declare class DBManager {
  /**
   * @constructor
   *
   * @param {Options} Options Module Options
   */
  constructor(options: Options);

  /**
   * Method that Returns Economy Guild Data from Database
   *
   * @param {string} id Discord Guild ID
   * @returns {Promise<EconomyGuildData>}
   */
  get(id: string): Promise<EconomyGuildData>;

  /**
   * Method that Changes Something from Database
   *
   * @param {string} id Discord Guild ID
   * @param {any} value Value to Set
   *
   * @returns {Promise<boolean>}
   */
  set(id: string, value: any): Promise<boolean>;

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
  ): Promise<boolean>;

  /**
   * Method that Pushes Something from Database
   *
   * @param {string} id Discord Guild ID
   * @param {any} value Value to Push
   *
   * @returns {Promise<boolean>}
   */
  push(id: string, value: any): Promise<boolean>;

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
  ): Promise<boolean>;

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
  ): Promise<boolean>;

  /**
   * Method that Creates User Data
   *
   * @param {string} guildID Discord Guild ID
   * @param {string} userID Discord User ID
   *
   * @returns {Promise<EconomyUserData>}
   */
  createUser(guildID: string, userID: string): Promise<EconomyUserData>;

  /**
   * Method that Creates Guild Data
   *
   * @param {string} guildID Discord Guild ID
   *
   * @returns {Promise<EconomyGuildData>}
   */
  createGuild(guildID: string): Promise<EconomyGuildData>;
}
