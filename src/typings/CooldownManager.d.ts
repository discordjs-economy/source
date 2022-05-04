import { CooldownType, EconomyUserRewardObject, Options } from "../Constants";
import { DBManager } from "./DBManager";

export declare interface CooldownManager {
  options: Options;
  database: DBManager;
}

/**
 * Class that controls Cooldown System
 *
 * @class
 * @classdesc Cooldown Class
 */
export declare class CooldownManager {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

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
  create(type: CooldownType, guildID: string, userID: string): Promise<boolean>;

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
  ): Promise<EconomyUserRewardObject>;
}
