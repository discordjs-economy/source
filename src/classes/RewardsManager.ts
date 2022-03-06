import { BalanceObject, ErrorObject, Options } from "../Constants";
import { BalanceManager } from "./BalanceManager";
import { CooldownManager } from "./CooldownManager";
import { DBManager } from "./DBManager";

export interface RewardsManager {
  options: Options;
  database: DBManager;
  balance: BalanceManager;
  cooldowns: CooldownManager;
}

/**
 * Class that controls Rewards System
 *
 * @class
 * @classdesc Rewards Class
 */
export class RewardsManager {
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
     * Cooldown Manager
     *
     * @type {CooldownManager}
     */
    this.cooldowns = new CooldownManager(this.options);
  }

  /**
   * Method that Adds Daily Reward to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   *
   * @returns {Promise<BalanceObject>}
   */
  daily(guildID: string, userID: string): Promise<BalanceObject | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      var cooldown = await this.cooldowns.get("daily", guildID, userID);
      if (cooldown.collectAt > Date.now()) {
        return res({
          status: false,
          message: "Daily Cooldown is not over, try again later!",
          data: cooldown.collectAt,
        });
      }

      var balanceData = this.balance.add(
        guildID,
        userID,
        this.options.rewards.daily
      );

      this.cooldowns.create(
        "daily",
        this.options.rewards.daily,
        guildID,
        userID
      );

      return res(balanceData);
    });
  }

  /**
   * Method that Adds Weekly Reward to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   *
   * @returns {Promise<BalanceObject>}
   */
  weekly(
    guildID: string,
    userID: string
  ): Promise<BalanceObject | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      var cooldown = await this.cooldowns.get("weekly", guildID, userID);
      if (cooldown.collectAt > Date.now()) {
        return res({
          status: false,
          message: "Weekly Cooldown is not over, try again later!",
          data: cooldown.collectAt,
        });
      }

      var balanceData = this.balance.add(
        guildID,
        userID,
        this.options.rewards.weekly
      );

      this.cooldowns.create(
        "weekly",
        this.options.rewards.weekly,
        guildID,
        userID
      );

      return res(balanceData);
    });
  }

  /**
   * Method that Adds Work Reward to User.
   *
   * @param {String} guildID Guild ID
   * @param {String} userID User ID
   *
   * @returns {Promise<BalanceObject>}
   */
  work(guildID: string, userID: string): Promise<BalanceObject | ErrorObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      var cooldown = await this.cooldowns.get("work", guildID, userID);
      if (cooldown.collectAt > Date.now()) {
        return res({
          status: false,
          message: "Work Cooldown is not over, try again later!",
          data: cooldown.collectAt,
        });
      }

      var workReward = this.options.rewards.work;
      var toAdd: number = 0;

      if (Array.isArray(workReward)) {
        var min = workReward[0];
        var max = workReward[1];

        if (workReward.length === 1) toAdd = workReward[0];
        else toAdd = Math.floor(Math.random() * (min - max)) + max;
      } else toAdd = workReward;

      var balanceData = this.balance.add(guildID, userID, toAdd);
      this.cooldowns.create("work", toAdd, guildID, userID);

      return res(balanceData);
    });
  }
}
