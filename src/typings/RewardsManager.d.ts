import {
  BalanceObject,
  EconomyGuildShopItem,
  ErrorObject,
  Options,
} from "../Constants";
import { CooldownManager } from "./CooldownManager";
import { HistoryManager } from "./HistoryManager";
import { BalanceManager } from "./BalanceManager";
import { DBManager } from "./DBManager";

export interface RewardsManager {
  options: Options;
  database: DBManager;

  balance: BalanceManager;
  cooldowns: CooldownManager;
  history: HistoryManager;
}

/**
 * Class that controls Rewards System
 *
 * @class
 * @classdesc Rewards Class
 */
export declare class RewardsManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

  /**
   * Method that Adds Daily Reward to User.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<BalanceObject|ErrorObject>}
   */
  daily(guildID: string, userID: string): Promise<BalanceObject | ErrorObject>;

  /**
   * Method that Adds Weekly Reward to User.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<BalanceObject|ErrorObject>}
   */
  weekly(guildID: string, userID: string): Promise<BalanceObject | ErrorObject>;

  /**
   * Method that Adds Work Reward to User.
   *
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<BalanceObject|ErrorObject>}
   */
  work(guildID: string, userID: string): Promise<BalanceObject | ErrorObject>;
}
