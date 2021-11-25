import { Options } from "../Constants";

// Managers
import { BalanceManager } from "./BalanceManager";
import { BankManager } from './BankManager';
import { DBManager } from "./DBManager";
import { ShopManager } from "./ShopManager";

export interface Economy {
    options: Options;
    database: DBManager;

    balance: BalanceManager;
    bank: BankManager;
    shop: ShopManager;
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
        if(!this.options.DBName) this.options.DBName = 'economy';

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
    }
}

/**
 * Module Options
 * @typedef {Object} Options
 * @prop {string} [DBName] Economy Database Name
 * @prop {string} [DBPath] Economy Database Path
 * @prop {Rewards} rewards Economy Rewards
 */

/**
 * Economy Rewards
 * @typedef {Object} Rewards
 * @prop {number} daily Daily Reward
 * @prop {number} weekly Weekly Reward
 * @prop {number|number[]} work Work Reward
 */

/**
 * Economy Guild Data
 * @typedef {Object} EconomyGuildData
 * @prop {number} users Daily Reward
 * @prop {number} weekly Weekly Reward
 * @prop {number|number[]} work Work Reward
 */

/**
 * Economy User Data
 * @typedef {Object} EconomyUserData
 * @prop {string} id User ID
 * @prop {number} balance User Balance
 * @prop {number} bank User Bank
 * @prop {EconomyUserRewardsData} rewards User Rewards
 */

/**
 * Economy User Rewards Data
 * @typedef {Object} EconomyUserRewardsData
 * @prop {boolean} daily Daily Reward Collected
 * @prop {boolean} weekly Weekly Reward Collected
 * @prop {boolean} work Work Reward Collected
 */

/**
 * Economy Guild Shop Item
 * @typedef {Object} EconomyGuildShopItem
 * @prop {number} [name] Item ID
 * @prop {string} name Item Name
 * @prop {string} [description] Item Description
 * @prop {number} cost Item Cost
 * @prop {string} [role] Item Role
 */

/**
 * Balance Object for BalanceManager
 * @typedef {Object} BalanceObject
 * @prop {number} amount Amount
 * @prop {PrettyObject} oldBalance User Balance Before
 * @prop {PrettyObject} newBalance User Balance After
 */

/**
 * Deposit Object for BankManager
 * @typedef {Object} DepositObject
 * @prop {number} amount Amount
 * @prop {DepositPrettyObject} balance User Balance
 * @prop {DepositPrettyObject} bank User Bank
 */

/**
 * Pretty Object for BalanceObject
 * @typedef {Object} DepositPrettyObject
 * @prop {PrettyObject} old Before Deposit 
 * @prop {PrettyObject} new After Deposit
 */

/**
 * Pretty Object for BalanceObject
 * @typedef {Object} PrettyObject
 * @prop {number} original User Balance Before Formatting
 * @prop {string} pretty User Balance After Formatting
 */