import { Options, BalanceObject, DepositObject } from "../Constants";
import { HistoryManager } from "./HistoryManager";
import { DBManager } from "./DBManager";

export declare interface BankManager {
  options: Options;
  database: DBManager;
  history: HistoryManager;
}

/**
 * Class that controls Bank System
 *
 * @class
 * @classdesc Bank Class
 */
export declare class BankManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

  /**
   * Method that Adds Bank Balance to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} amount Amount to Add
   *
   * @returns {Promise<BalanceObject>}
   */
  add(guildID: string, userID: string, amount: number): Promise<BalanceObject>;

  /**
   * Method that Subtracts Bank Balance to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} amount Amount to Subtract
   *
   * @returns {Promise<BalanceObject>}
   */
  subtract(
    guildID: string,
    userID: string,
    amount: number
  ): Promise<BalanceObject>;

  /**
   * Method that Sets Bank Balance to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} value Value to Set
   *
   * @returns {Promise<BalanceObject>}
   */
  set(guildID: string, userID: string, value: number): Promise<BalanceObject>;

  /**
   * Method that Returns User Bank.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   *
   * @returns {Promise<Number>}
   */
  get(guildID: string, userID: string): Promise<number>;

  /**
   * Method that Deposits to Bank.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} amount Amount to Deposit
   *
   * @returns {Promise<BalanceObject>}
   */
  deposit(
    guildID: string,
    userID: string,
    amount: number
  ): Promise<DepositObject>;

  /**
   * Method that Withdraws from Bank.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} amount Amount to Withdraw
   *
   * @returns {Promise<BalanceObject>}
   */
  withdraw(
    guildID: string,
    userID: string,
    amount: number
  ): Promise<DepositObject>;
}
