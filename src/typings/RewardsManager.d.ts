import {
  BalanceObject,
  EconomyGuildShopItem,
  ErrorObject,
  Options,
} from "../Constants";
import { BalanceManager } from "./BalanceManager";
import { CooldownManager } from "./CooldownManager";
import { DBManager } from "./DBManager";

export interface RewardsManager {
  options: Options;
  database: DBManager;

  balance: BalanceManager;
  cooldowns: CooldownManager;
}

export declare class RewardsManager {
  constructor(options: Options);

  daily(guildID: string, userID: string): Promise<BalanceObject | ErrorObject>;
  weekly(guildID: string, userID: string): Promise<BalanceObject | ErrorObject>;
  work(guildID: string, userID: string): Promise<BalanceObject | ErrorObject>;
}
