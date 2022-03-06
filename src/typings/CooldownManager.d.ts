import { CooldownType, EconomyUserRewardObject, Options } from "../Constants";
import { DBManager } from "./DBManager";

export declare interface CooldownManager {
  options: Options;
  database: DBManager;
}

export declare class CooldownManager {
  constructor(options: Options);

  create(type: CooldownType, guildID: string, userID: string): Promise<boolean>;

  get(
    type: CooldownType,
    guildID: string,
    userID: string
  ): Promise<EconomyUserRewardObject>;
}
