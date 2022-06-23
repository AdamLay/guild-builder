import Faction from "../data/models/faction";
import ModelCard from "../data/models/modelCard";

export default class ApiService {
  private static baseUrl() {
    return "http://localhost:5041/api";
  }

  public static async getFactions() {
    const res = await fetch(this.baseUrl() + "/factions");
    const data = await res.json();
    return data as Faction[];
  }

  public static async getModelCards(factionId: number) {
    const res = await fetch(this.baseUrl() + "/model-cards?factionId=" + factionId);
    const data = await res.json();
    return data as ModelCard[];
  }
}
