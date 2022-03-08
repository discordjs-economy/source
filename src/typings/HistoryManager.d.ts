import {
  ActionType,
  EconomyUserHistory,
  ErrorObject,
  Options,
} from "../Constants";
import { DBManager } from "./DBManager";

export declare interface HistoryManager {
  options: Options;
  database: DBManager;
}

export declare class HistoryManager {
  constructor(options: Options);

  create(
    guildID: string,
    userID: string,
    action: ActionType,
    amount: number
  ): Promise<EconomyUserHistory>;

  delete(
    guildID: string,
    userID: string,
    id: number
  ): Promise<ErrorObject | EconomyUserHistory[]>;

  all(
    guildID: string,
    userID: string
  ): Promise<ErrorObject | EconomyUserHistory[]>;
}
