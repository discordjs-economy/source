import { Leaderboard, Options } from "../Constants";

// Managers
import { BalanceManager } from "./BalanceManager";
import { RewardsManager } from "./RewardsManager";
import { HistoryManager } from "./HistoryManager";
import { ItemsManager } from "./ItemsManager";
import { BankManager } from "./BankManager";
import { ShopManager } from "./ShopManager";
import { DBManager } from "./DBManager";

export declare interface Economy {
  options: Options;
  database: DBManager;

  balance: BalanceManager;
  bank: BankManager;
  shop: ShopManager;
  items: ItemsManager;
  rewards: RewardsManager;
  history: HistoryManager;
}

/**
 * Class that controls Economy System
 *
 * @class
 * @classdesc Economy Class
 */
export declare class Economy {
  /**
   * @constructor
   *
   * @param {Options} options Module Options
   */
  constructor(options: Options);

  /**
   * Method that Returns Guild Balance Leaderboard by Balance.
   *
   * @param {string} guildID Guild ID
   *
   * @returns {Promise<null|Leaderboard[]>}
   */
  leaderboard(guildID: string): Promise<null | Leaderboard[]>;

  /**
   * Method that Initializing Module.
   *
   * @private
   * @returns {Promise<boolean>}
   */
  private init(): Promise<boolean>;

  /**
   * Method that checks module for an actual update.
   *
   * @private
   * @returns {Promise<boolean|string>}
   */
  private checkForUpdates(): Promise<boolean | string>;
}
