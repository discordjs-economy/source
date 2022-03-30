import { Leaderboard, Options } from "../Constants";

// Managers
import { BalanceManager } from "./BalanceManager";
import { RewardsManager } from "./RewardsManager";
import { HistoryManager } from "./HistoryManager";
import { ItemsManager } from "./ItemsManager";
import { BankManager } from "./BankManager";
import { ShopManager } from "./ShopManager";
import { DBManager } from "./DBManager";

// Other
import { request } from "undici";
import colors from "colors";

export interface Economy {
  options: Options;
  database: DBManager;
  version: String;

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
export class Economy {
  /**
   * @constructor
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
     * Module Version
     *
     * @type {String}
     */
    this.version = "1.1.5";

    /**
     * Balance Manager
     *
     * @type {BalanceManager}
     */
    this.balance = new BalanceManager(this.options);

    /**
     * Bank Manager
     *
     * @type {BankManager}
     */
    this.bank = new BankManager(this.options);

    /**
     * Shop Manager
     *
     * @type {ShopManager}
     */
    this.shop = new ShopManager(this.options);

    /**
     * Inventory Manager
     *
     * @type {ItemsManager}
     */
    this.items = new ItemsManager(this.options);

    /**
     * Rewards Manager
     *
     * @type {RewardsManager}
     */
    this.rewards = new RewardsManager(this.options);

    /**
     * History Manager
     *
     * @type {HistoryManager}
     */
    this.history = new HistoryManager(this.options);

    this.init();
  }

  /**
   * Method that Returns Guild Balance Leaderboard by Balance.
   *
   * @param {String} guildID Guild ID
   *
   * @returns {Promise<null|Leaderboard[]>}
   */
  leaderboard(guildID: string): Promise<null | Leaderboard[]> {
    return new Promise(async (res, rej) => {
      var data = await this.database.get(guildID);

      if (!data) data = await this.database.createGuild(guildID);
      if (!data.users.length) return res(null);

      var sortedTop = data.users.sort((a, b) => b.balance - a.balance);
      var top: Leaderboard[] = [];

      for (var user of sortedTop) {
        var userRank = sortedTop.findIndex((x) => x.id === user.id) + 1;

        top.push({
          userID: user.id,
          balance: user["balance"],
          bank: user["bank"],
          rank: userRank,
        });
      }

      return res(top);
    });
  }

  /**
   * Method that Initializing Module.
   *
   * @private
   * @returns {Promise<boolean>}
   */
  private async init(): Promise<boolean> {
    return new Promise(async (res, rej) => {
      const updater = await this.checkForUpdates();
      if (typeof updater === "string") {
        console.log(updater);
      }

      var economyOBJ = this.database.database.keys();
      var guildIDS: string[] = [];

      for (var name of economyOBJ) {
        var guildID = name.toString().slice("economy-".length);
        guildIDS.push(guildID);
      }

      for (var guildID of guildIDS) {
        var data = await this.database.get(guildID);

        if (!data) continue;
        if (!data.users) continue;

        for (var user of data.users) {
          if (user.inventory === undefined || !Array.isArray(user.inventory)) {
            user.inventory = [];
          }
        }

        this.database.set(guildID, data);
      }

      return res(true);
    });
  }

  /**
   * Method that checks module for an actual update.
   *
   * @private
   * @returns {Promise<boolean|String>}
   */
  private checkForUpdates(): Promise<boolean | string> {
    return new Promise(async (res, rej) => {
      const { version: current_version } = await (
        await import("../../package.json")
      ).default;

      const { "dist-tags": versions } = await (
        await request(
          "https://registry.npmjs.com/@badboy-discord/discordjs-economy"
        )
      ).body.json();

      if (versions.latest !== current_version) {
        const latest = versions.latest;
        const name = "@badboy-discord/discordjs-economy";
        const update_cmd = `npm install ${name}@latest`;
        const text = [
          "",
          `New version of "${colors.yellow(name)}" avaliable (v${latest})!`,
          "It is recommended to install because new version can contain fixes!",
          `To upgrade, please write "${colors.yellow(update_cmd)}"`,
          "",
        ].join("\n");

        return res(text);
      } else return res(true);
    });
  }
}

/**
 * Module Options
 * @typedef {Object} Options
 * @prop {String} [DBName] Economy Database Name
 * @prop {String} [DBPath] Economy Database Path
 * @prop {Rewards} rewards Economy Rewards
 */

/**
 * Economy Rewards
 * @typedef {Object} Rewards
 * @prop {Number} daily Daily Reward
 * @prop {Number} weekly Weekly Reward
 * @prop {Number|Number[]} work Work Reward
 */

/**
 * Economy Guild Data
 * @typedef {Object} EconomyGuildData
 * @prop {EconomyUserData[]} users Guild Users Array
 * @prop {EconomyGuildShopItem} shop Guild Shop Array
 */

/**
 * Economy User Data
 * @typedef {Object} EconomyUserData
 * @prop {String} id User ID
 * @prop {Number} balance User Balance
 * @prop {Number} bank User Bank
 * @prop {EconomyUserRewardsData} rewards User Rewards
 * @prop {EconomyUserInventory[]} inventory User Inventory
 * @prop {EconomyUserHistory[]} history User History
 */

/**
 * Economy User Rewards Data
 * @typedef {Object} EconomyUserRewardsData
 * @prop {EconomyUserRewardObject} daily Daily Reward
 * @prop {EconomyUserRewardObject} weekly Weekly Reward
 * @prop {EconomyUserRewardObject} work Work Reward
 */

/**
 * Economy User Reward Object
 * @typedef {Object} EconomyUserRewardObject
 * @prop {Number} amount Amount
 * @prop {Number} [collectedAt] Collected At
 * @prop {Number} [collectAt] Collect At
 */

/**
 * Economy User Rewards Data
 * @typedef {Object} EconomyUserInventory
 * @prop {Number} itemID Item ID
 * @prop {String} name Item Name
 * @prop {String} [description] Item Description
 * @prop {Number} cost Item Cost
 * @prop {String} [role] Item Role
 * @prop {Number} date Date of Purchase
 */

/**
 * Economy Guild Shop Item
 * @typedef {Object} EconomyGuildShopItem
 * @prop {Number} [id] Item ID
 * @prop {String} name Item Name
 * @prop {String} [description] Item Description
 * @prop {Number} cost Item Cost
 * @prop {String} [role] Item Role
 */

/**
 * Balance Object for BalanceManager
 * @typedef {Object} BalanceObject
 * @prop {Number} amount Amount
 * @prop {BalancePrettyObject} balance User Balance Object
 */

/**
 * Pretty Object for BalanceObject
 * @typedef {Object} BalancePrettyObject
 * @prop {Number} before Balance Before
 * @prop {Number} after Balance After
 */

/**
 * Deposit Object for BankManager
 * @typedef {Object} DepositObject
 * @prop {Number} amount Amount
 * @prop {BalancePrettyObject} balance User Balance Object
 * @prop {DepositPrettyObject} bank User Bank Object
 */

/**
 * Pretty Object for BalanceObject
 * @typedef {Object} DepositPrettyObject
 * @prop {Number} before Before Deposit
 * @prop {Number} after After Deposit
 */

/**
 * Error Object
 * @typedef {Object} ErrorObject
 * @prop {boolean} status true or false
 * @prop {String} [message] Error Message
 * @prop {any} [data] Object with Data
 */

/**
 * Guild Leaderboard
 * @typedef {Object} Leaderboard
 * @prop {String} userID User ID
 * @prop {Number} balance User Balance
 * @prop {Number} bank User Bank
 * @prop {Number} rank User Rank in Leaderboard
 */

/**
 * Economy User History
 * @typedef {Object} EconomyUserHistory
 * @prop {Number} id ID of the Object
 * @prop {ActionType} type Action
 * @prop {Number} amount Amount
 * @prop {Number} date Date
 */

/**
 * * daily
 * * weekly
 * * work
 * @typedef {String} CooldownType
 */

/**
 * * daily
 * * weekly
 * * work
 * * buy
 * * sell
 * * add
 * * subtract
 * * set
 * * bank-add
 * * bank-subtract
 * * bank-set
 * @typedef {String} ActionType
 */
