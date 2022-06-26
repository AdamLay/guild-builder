import Faction from "../data/models/faction";
import ModelCard from "../data/models/modelCard";
import { Spell } from "../data/models/spells";

export default class ApiService {
  private static baseUrl() {
    return "https://guilds-manager-ag.herokuapp.com/api";
  }

  public static async getFactions() {
    try {
      const res = await fetch(this.baseUrl() + "/factions");
      const data = await res.json();
      return data as Faction[];
    } catch {
      return factions;
    }
  }

  public static async getSpells() {
    const res = await fetch(this.baseUrl() + "/spells");
    const data = await res.json();
    return data as Spell[];
  }

  public static async getModelCards(factionId: number) {
    const transform = (cards: any) =>
      cards.map((x: any) => ({
        ...x,
        keywords: x.keywords.split(",").map((word: string) => word.trim()),
        rw: x.rw.length > 1 ? x.rw.split(",").map((word: string) => word.trim()) : [],
      })) as ModelCard[];
    try {
      const res = await fetch(this.baseUrl() + "/model-cards" + (factionId ? "?factionId=" + factionId : ""));
      const data = await res.json();
      return transform(data) as ModelCard[];
    } catch (e) {
      return transform(modelCards);
    }
  }
}

const factions: Faction[] = [
  { id: 1, name: "Dragonguard", force: 0 },
  { id: 2, name: "Lok-Badar Dwarves", force: 0 },
  { id: 3, name: "Orc Barbarians", force: 1 },
  { id: 4, name: "Fighter's Guild", force: 3 },
];

const modelCards = [
  {
    id: 1,
    factionId: 1,
    faction: null,
    name: "Dragonguard Shield",
    keywords: "Dragon, Infantry",
    slots: 1,
    unitNumber: 3,
    might: 3,
    healing: false,
    dex: 4,
    ignoreDifficultTerrain: false,
    levitating: false,
    will: 6,
    def: 5,
    shield: true,
    abilities: [],
    attacks: [],
    resistancesWeaknesses: [],
    isHero: false,
  },
  {
    id: 2,
    factionId: 1,
    faction: null,
    name: "Dragonguard Claw",
    keywords: "Dragon, Infantry",
    slots: 1,
    unitNumber: 3,
    might: 3,
    healing: false,
    dex: 4,
    ignoreDifficultTerrain: false,
    levitating: false,
    will: 6,
    def: 5,
    shield: false,
    abilities: [],
    attacks: [],
    resistancesWeaknesses: [],
    isHero: false,
  },
  {
    id: 3,
    factionId: 1,
    faction: null,
    name: "Dragonguard Knights",
    keywords: "Dragon, Large, Cavalry",
    slots: 1,
    unitNumber: 3,
    might: 4,
    healing: false,
    dex: 6,
    ignoreDifficultTerrain: false,
    levitating: false,
    will: 6,
    def: 5,
    shield: true,
    abilities: [],
    attacks: [],
    resistancesWeaknesses: [],
    isHero: false,
  },
  {
    id: 4,
    factionId: 1,
    faction: null,
    name: "Scramax The Battlemage",
    keywords: "Dragon, Hero, Arcanist",
    slots: 1,
    unitNumber: 1,
    might: 3,
    healing: false,
    dex: 4,
    ignoreDifficultTerrain: false,
    levitating: false,
    will: 7,
    def: 4,
    shield: false,
    abilities: [],
    attacks: [],
    resistancesWeaknesses: [],
    isHero: true,
  },
];
