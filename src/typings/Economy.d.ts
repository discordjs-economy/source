import { Leaderboard, Options } from "../Constants";

// Managers
import { DBManager } from "./DBManager";
import { BalanceManager } from "./BalanceManager";
import { BankManager } from "./BankManager";
import { ShopManager } from "./ShopManager";
import { ItemsManager } from "./ItemsManager";
import { RewardsManager } from "./RewardsManager";

export declare interface Economy {
  options: Options;
  database: DBManager;

  balance: BalanceManager;
  bank: BankManager;
  shop: ShopManager;
  items: ItemsManager;
  rewards: RewardsManager;
}

export declare class Economy {
  constructor(options: Options);

  leaderboard(guildID: string): Promise<null | Leaderboard[]>;

  private init(): Promise<boolean>;
  private checkVersion(): Promise<boolean>;
}
