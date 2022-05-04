import { CooldownType, EconomyUserRewardObject, Options } from "../Constants";
import { DBManager } from "./DBManager";
import { ms } from "../ms";

export interface CooldownManager {
  options: Options;
  database: DBManager;
}

/**
 * Class that controls Cooldown System
 *
 * @class
 * @classdesc Cooldown Class
 */
export class CooldownManager {
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
   * Method that Creates Cooldown.
   *
   * @param {CooldownType} type Cooldown Type
   * @param {number} amount Amount
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<boolean>}
   */
  create(
    type: CooldownType,
    amount: number,
    guildID: string,
    userID: string
  ): Promise<boolean> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      var day = Number(ms("1d"));
      var week = Number(ms("1w"));
      var hour = Number(ms("1h"));
      var now = Date.now();

      user.rewards[type].amount = amount;
      user.rewards[type].collectedAt = Date.now();
      user.rewards[type].collectAt =
        type === "daily"
          ? now + day
          : type === "weekly"
          ? now + week
          : type === "work"
          ? now + hour
          : 0;

      this.database.set(guildID, data);
      res(true);
    });
  }

  /**
   * Method that Removes Cooldown.
   *
   * @param {CooldownType} type Cooldown Type
   * @param {string} guildID Guild ID
   * @param {string} userID User ID
   *
   * @returns {Promise<EconomyUserRewardObject>}
   */
  get(
    type: CooldownType,
    guildID: string,
    userID: string
  ): Promise<EconomyUserRewardObject> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);
      if (!data) data = await this.database.createGuild(guildID);

      var user = data.users.find((x) => x.id === userID);
      if (!user) user = await this.database.createUser(guildID, userID);

      var cooldown = user.rewards[type];
      return res({
        amount: cooldown.amount,

        collectedAt:
          typeof cooldown.collectedAt === "number"
            ? cooldown.collectedAt
            : null,

        collectAt:
          typeof cooldown.collectAt === "number" ? cooldown.collectAt : null,
      });
    });
  }
}
