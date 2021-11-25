import { BalanceObject, Options, PrettyObject } from "../Constants";
import { DBManager } from "./DBManager";

export interface BalanceManager {
    options: Options;
    database: DBManager;
}

/**
 * Class that controls Balance System
 *
 * @class
 * @classdesc Balance Class
 */
export class BalanceManager {
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
        if(!this.options.DBName) this.options.DBName = 'economy';
 
        /**
          * Module Database
          * 
          * @type {DBManager}
          */
        this.database = new DBManager(this.options);
    }

    /**
     * Method that Adds Balance to User.
     * 
     * @param {string} guildID Guild ID 
     * @param {string} userID User ID
     * @param {number} amount Amount to Add
     * 
     * @returns {Promise<BalanceObject>} 
     */
    add(guildID: string, userID: string, amount: number): Promise<BalanceObject> {
        return new Promise(async (res, rej) => {
            var data = await this.database.get(guildID);
            if(!data) data = await this.database.createGuild(guildID);

            var user = data.users.find((x) => x.id === userID);
            if(!user) user = await this.database.createUser(guildID, userID);

            this.database.add(guildID, userID, 'balance', amount);

            const newData = await this.database.get(guildID);
            const newUser = newData.users.find((x) => x.id === userID)!;

            return res({
                amount: amount,

                before: {
                    value: user['balance'],
                    pretty: user['balance'].toLocaleString('be')
                },

                after: {
                    value: newUser['balance'],
                    pretty: newUser['balance'].toLocaleString('be')
                }
            });
        });
    }

    /**
     * Method that Subtracts Balance to User.
     * 
     * @param {string} guildID Guild ID 
     * @param {string} userID User ID
     * @param {number} amount Amount to Subtract
     * 
     * @returns {Promise<BalanceObject>} 
     */
    subtract(guildID: string, userID: string, amount: number): Promise<BalanceObject> {
        return new Promise(async(res, rej) => {
            var data = await this.database.get(guildID);
            if(!data) data = await this.database.createGuild(guildID);

            var user = data.users.find((x) => x.id === userID);
            if(!user) user = await this.database.createUser(guildID, userID);

            this.database.subtract(guildID, userID, 'balance', amount);

            const newData = await this.database.get(guildID);
            const newUser = newData.users.find((x) => x.id === userID)!;

            return res({
                amount: amount,

                before: {
                    value: user['balance'],
                    pretty: user['balance'].toLocaleString('be')
                },

                after: {
                    value: newUser['balance'],
                    pretty: newUser['balance'].toLocaleString('be')
                }
            });
        });
    }

    /**
     * Method that Sets Balance to User.
     * 
     * @param {string} guildID Guild ID 
     * @param {string} userID User ID
     * @param {number} value Value to Set
     * 
     * @returns {Promise<BalanceObject>} 
     */
    set(guildID: string, userID: string, value: number): Promise<BalanceObject> {
        return new Promise(async(res, rej) => {
            var data = await this.database.get(guildID);
            if(!data) data = await this.database.createGuild(guildID);

            var user = data.users.find((x) => x.id === userID);
            if(!user) user = await this.database.createUser(guildID, userID);

            this.database.setProp(guildID, userID, 'balance', value);

            const newData = await this.database.get(guildID);
            const newUser = newData.users.find((x) => x.id === userID)!;

            return res({
                amount: value,

                before: {
                    value: user['balance'],
                    pretty: user['balance'].toLocaleString('be')
                },

                after: {
                    value: newUser['balance'],
                    pretty: newUser['balance'].toLocaleString('be')
                }
            });
        });
    }

    /**
     * Method that Returns User Balance.
     * 
     * @param {string} guildID Guild ID 
     * @param {string} userID User ID
     * 
     * @returns {Promise<PrettyObject>} 
     */
    get(guildID: string, userID: string): Promise<PrettyObject> {
        return new Promise(async(res, rej) => {
            var data = await this.database.get(guildID);
            if(!data) data = await this.database.createGuild(guildID);

            var user = data.users.find((x) => x.id === userID);
            if(!user) user = await this.database.createUser(guildID, userID);

            return res({
                value: user['balance'],
                pretty: user['balance'].toLocaleString('be')
            });
        });
    }
}