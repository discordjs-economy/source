import { Options, BalanceObject, DepositObject } from "../Constants";
import { DBManager } from "./DBManager";
import { HistoryManager } from "./HistoryManager";

export declare interface BankManager {
  options: Options;
  database: DBManager;
  history: HistoryManager;
}

export declare class BankManager {
  constructor(options: Options);

  add(guildID: string, userID: string, amount: number): Promise<BalanceObject>;

  subtract(
    guildID: string,
    userID: string,
    amount: number
  ): Promise<BalanceObject>;

  set(guildID: string, userID: string, value: number): Promise<BalanceObject>;
  get(guildID: string, userID: string): Promise<number>;

  deposit(
    guildID: string,
    userID: string,
    amount: number
  ): Promise<DepositObject>;

  withdraw(
    guildID: string,
    userID: string,
    amount: number
  ): Promise<DepositObject>;
}
