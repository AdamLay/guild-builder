import { Element } from "./enums";

export default interface ModelCard {
  selectionId?: string;
  id: number;
  factionId: number;
  name: string;
  keywords: string[];
  slots: number;
  unitNumber: number;

  might: number;
  healing: boolean;

  dex: number;
  ignoreDifficultTerrain: boolean;
  levitating: boolean;

  def: number;
  shield: boolean;

  will: number;

  heroicWounds?: number;

  rw: string[];

  abilities: Ability[];
  attacks: Attack[];
}

export interface Attack {
  id: number;
  cardId: number;
  name: string;
  attacks: number;
  aoE: boolean;
  minRange?: number;
  range: number;
  arc?: number;
  element?: Element;
}

export interface Ability {
  id: number;
  cardId: number;
  name: string;
  text: string;
  passive: boolean;
  fatigue: boolean;
  torment: boolean;
}