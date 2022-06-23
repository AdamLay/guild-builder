import { Force } from "./enums";

export default interface Faction {
  id: number;
  name: string;
  force: Force;
}