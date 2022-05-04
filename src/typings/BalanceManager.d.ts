import { Options, BalanceObject, PrettyObject } from "../Constants";
import { HistoryManager } from "./HistoryManager";
import { DBManager } from "./DBManager";

export declare interface BalanceManager {
  options: Options;
  database: DBManager;
  history: HistoryManager;
}

/**
 * Class that controls Balance System
 *
 * @class
 * @classdesc Balance Class
 */
export declare class BalanceManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

  /**
   * Method that Adds Balance to User.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} amount Amount to Add
   *
   * @returns {Promise<BalanceObject>}
   */
  add(guildID: string, userID: string, amount: number): Promise<BalanceObject>;

  /**
   * Method that Subtracts Balance to User.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} amount Amount to Subtract
   *
   * @returns {Promise<BalanceObject>}
   */
  subtract(
    guildID: string,
    userID: string,
    amount: number
  ): Promise<BalanceObject>;

  /**
   * Method that Sets Balance to User.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   * @param {number} value Value to Set
   *
   * @returns {Promise<BalanceObject>}
   */
  set(guildID: string, userID: string, value: number): Promise<BalanceObject>;

  /**
   * Method that Returns User Balance.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<Number>}
   */
  get(guildID: string, userID: string): Promise<number>;
}
