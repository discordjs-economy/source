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

export declare class Economy {
  constructor(options: Options);

  leaderboard(guildID: string): Promise<null | Leaderboard[]>;

  private init(): Promise<boolean>;
  private checkForUpdates(): Promise<boolean | string>;
}
