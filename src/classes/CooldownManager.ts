import { BalanceObject, CooldownType, EconomyUserRewardObject, Options } from "../Constants";
import { DBManager } from "./DBManager";
import ms from '../ms';

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
        if(!this.options.DBName) this.options.DBName = 'economy';
 
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
     * @param {string} guildID Guild ID 
     * @param {string} userID User ID
     * 
     * @returns {Promise<boolean>} 
     */
    create(type: CooldownType, guildID: string, userID: string): Promise<boolean> {
        return new Promise(async (res, rej) => {
            var data = await this.database.get(guildID);
            if(!data) data = await this.database.createGuild(guildID);

            var user = data.users.find((x) => x.id === userID);
            if(!user) user = await this.database.createUser(guildID, userID);

            var day = Number(ms('1d'));
            var week = Number(ms('1w'));
            var hour = Number(ms('1h'));
            var now = Date.now();

            user.rewards[type].status = true;
            user.rewards[type].collectedAt = Date.now();
            user.rewards[type].collectAt = {
                value:  type === 'daily' ? now + day :
                        type === 'weekly' ? now + week :
                        type === 'work' ? now + hour : 0
            };

            var time =  type === 'daily' ? now + day :
                        type === 'weekly' ? now + week :
                        type === 'work' ? now + hour : 0;

            const timeout = setTimeout(async() => {
                await this.delete(type, guildID, userID);
            }, time);

            user.rewards[type].timeout = timeout;

            this.database.set(guildID, data);
            return res(true);
        });
    }

    /**
     * Method that Removes Cooldown.
     * 
     * @param {CooldownType} type Cooldown Type 
     * @param {string} guildID Guild ID 
     * @param {string} userID User ID
     * 
     * @returns {Promise<boolean>} 
     */
    delete(type: CooldownType, guildID: string, userID: string): Promise<boolean> {
        return new Promise(async (res, rej) => {
            var data = await this.database.get(guildID);
            if(!data) data = await this.database.createGuild(guildID);

            var user = data.users.find((x) => x.id === userID);
            if(!user) user = await this.database.createUser(guildID, userID);
            if(user.rewards[type].status === false) return res(false);

            user.rewards[type].status = false;
            user.rewards[type].collectedAt = null;
            user.rewards[type].collectAt = null;

            clearTimeout(user.rewards[type].timeout);
            user.rewards[type].timeout = null;

            this.database.set(guildID, data);
            return res(true);
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
    get(type: CooldownType, guildID: string, userID: string): Promise<EconomyUserRewardObject> {
        return new Promise(async (res, rej) => {
            var data = await this.database.get(guildID);
            if(!data) data = await this.database.createGuild(guildID);

            var user = data.users.find((x) => x.id === userID);
            if(!user) user = await this.database.createUser(guildID, userID);

            var cooldown = user.rewards[type];
            var parseMS = (ms: number) => {
                return {
                    days: Math.floor(ms / 86400000),
                    hours: Math.floor(ms / 3600000 % 24),
                    minutes: Math.floor(ms / 60000 % 60),
                    seconds: Math.floor(ms / 1000 % 60)
                };
            };

            var now = Date.now();
            var parsed = parseMS(cooldown.collectAt.value - now);
            var text = `${parsed.days} days, ${parsed.hours} hours, ${parsed.minutes} minutes, ${parsed.seconds} seconds`;

            return res({
                status: cooldown.status,
                collectedAt: typeof cooldown.collectedAt === 'number' ? cooldown.collectedAt : null,
                collectAt: typeof cooldown.collectAt === 'object' ? {
                    value: cooldown.collectAt.value - now,
                    pretty: text
                } : null,
                timeout: cooldown.timeout !== null ? cooldown.timeout : null
            });
        });
    }
}