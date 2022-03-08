import { BalanceObject, DepositObject, Options } from "../Constants";
import { DBManager } from "./DBManager";
import { HistoryManager } from "./HistoryManager";

export interface BankManager {
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
export class BankManager {
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
     * History Manager
     *
     * @type {HistoryManager}
     */
    this.history = new HistoryManager(this.options);
  }

  /**
   * Method that Adds Bank Balance to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} amount Amount to Add
   *
   * @returns {Promise<BalanceObject>}
   */
  add(guildID: string, userID: string, amount: number): Promise<BalanceObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      this.database.add(guildID, userID, "bank", amount);

      const newData = await this.database.get(guildID);
      const newUser = newData.users.find((x) => x.id === userID)!;

      this.history.create(guildID, userID, "bank-add", amount);

      return res({
        amount: amount,

        balance: {
          before: user.bank,
          after: newUser.bank,
        },
      });
    });
  }

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
  ): Promise<BalanceObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      this.database.subtract(guildID, userID, "bank", amount);

      const newData = await this.database.get(guildID);
      const newUser = newData.users.find((x) => x.id === userID)!;

      this.history.create(guildID, userID, "bank-subtract", amount);

      return res({
        amount: amount,

        balance: {
          before: user.bank,
          after: newUser.bank,
        },
      });
    });
  }

  /**
   * Method that Sets Bank Balance to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   * @param {Number} value Value to Set
   *
   * @returns {Promise<BalanceObject>}
   */
  set(guildID: string, userID: string, value: number): Promise<BalanceObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      this.database.setProp(guildID, userID, "bank", value);

      const newData = await this.database.get(guildID);
      const newUser = newData.users.find((x) => x.id === userID)!;

      this.history.create(guildID, userID, "bank-set", value);

      return res({
        amount: value,

        balance: {
          before: user.bank,
          after: newUser.bank,
        },
      });
    });
  }

  /**
   * Method that Returns User Bank.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   *
   * @returns {Promise<Number>}
   */
  get(guildID: string, userID: string): Promise<number> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      return res(user.bank);
    });
  }

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
  ): Promise<DepositObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      this.database.subtract(guildID, userID, "balance", amount);
      this.database.add(guildID, userID, "bank", amount);

      const newData = await this.database.get(guildID);
      const newUser = newData.users.find((x) => x.id === userID)!;

      return res({
        amount: amount,

        balance: {
          before: user.balance,
          after: newUser.balance,
        },

        bank: {
          before: user.bank,
          after: newUser.bank,
        },
      });
    });
  }

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
  ): Promise<DepositObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      this.database.subtract(guildID, userID, "bank", amount);
      this.database.add(guildID, userID, "balance", amount);

      const newData = await this.database.get(guildID);
      const newUser = newData.users.find((x) => x.id === userID)!;

      return res({
        amount: amount,

        balance: {
          before: user.balance,
          after: newUser.balance,
        },

        bank: {
          before: user.bank,
          after: newUser.bank,
        },
      });
    });
  }
}
