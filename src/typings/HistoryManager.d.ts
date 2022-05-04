import {
  ActionType,
  EconomyUserHistory,
  ErrorObject,
  Options,
} from "../Constants";
import { DBManager } from "./DBManager";

export declare interface HistoryManager {
  options: Options;
  database: DBManager;
}

/**
 * Class that controls User History
 *
 * @class
 * @classdesc HistoryManager Class
 */
export declare class HistoryManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

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
  ): Promise<EconomyUserHistory>;

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
  ): Promise<ErrorObject | EconomyUserHistory[]>;

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
  ): Promise<ErrorObject | EconomyUserHistory[]>;
}
