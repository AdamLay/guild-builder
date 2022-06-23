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

  abilities: any[];
  attacks: any[];
  resistancesWeaknesses: any[];
}