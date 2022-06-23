import { ArcanistSchool } from "./spells";

export interface GuildhallCard {
  selectionId?: string;
  type: GuildhallCardType;
  name: string;
  text: string;
  effects: GuildhallEffect[];
}

export interface GuildhallEffect {
  type: GuildhallEffectType;
  modifier?: number;
  keyword?: string;
  school?: ArcanistSchool;
}

export enum GuildhallEffectType {
  Custom,
  Slot,
  Spell
}

export enum GuildhallCardType {
  GreatHall,
  Garrison,
  Stables,
  HeroicInspiration,
  BeastLair,
  ElementalArcanum,
  DruidcraftArcanum,
  AnimancyArcanum,
  NecromancyArcanum,
  DiplomaticDeal,
  ArcaneForge,
}

export const GuildhallCards = {
  [GuildhallCardType.GreatHall]: {
    type: GuildhallCardType.GreatHall,
    name: "Great Hall (Unique)",
    text: "+1 Guildhall Card\n+1 Hero Card Slot\n+2 Infantry Cards Slot",
    effects: [
      { type: GuildhallEffectType.Slot, modifier: 1, keyword: "Hero" },
      { type: GuildhallEffectType.Slot, modifier: 2, keyword: "Infantry" },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.Garrison]: {
    type: GuildhallCardType.Garrison,
    name: "Garrison",
    text: "+2 Infantry Cards Slot",
    effects: [
      { type: GuildhallEffectType.Slot, modifier: 2, keyword: "Infantry" },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.Stables]: {
    type: GuildhallCardType.Stables,
    name: "Stables",
    text: "+2 Cavalry Cards Slot",
    effects: [
      { type: GuildhallEffectType.Slot, modifier: 2, keyword: "Cavalry" },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.HeroicInspiration]: {
    type: GuildhallCardType.HeroicInspiration,
    name: "Heroic Inspiration",
    text: "+1 Hero Card Slot",
    effects: [
      { type: GuildhallEffectType.Slot, modifier: 1, keyword: "Hero" },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.BeastLair]: {
    type: GuildhallCardType.BeastLair,
    name: "Beast Lair",
    text: "+1 Heroic Mount Card Slot or +1 Heroic Beast card Slot",
    effects: [
      { type: GuildhallEffectType.Slot, modifier: 1, keyword: "Heroic Mount|Heroic Beast" },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.ElementalArcanum]: {
    type: GuildhallCardType.ElementalArcanum,
    name: "Elemental Arcanum",
    text: "Your Arcanists proficients in this school can cast any spell from its list",
    effects: [
      { type: GuildhallEffectType.Spell, school: ArcanistSchool.Elemental },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.DruidcraftArcanum]: {
    type: GuildhallCardType.DruidcraftArcanum,
    name: "Druidcraft Arcanum",
    text: "Your Arcanists proficients in this school can cast any spell from its list",
    effects: [
      { type: GuildhallEffectType.Spell, school: ArcanistSchool.Druidcraft },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.AnimancyArcanum]: {
    type: GuildhallCardType.AnimancyArcanum,
    name: "Animancy Arcanum",
    text: "Your Arcanists proficients in this school can cast any spell from its list",
    effects: [
      { type: GuildhallEffectType.Spell, school: ArcanistSchool.Animacy },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.NecromancyArcanum]: {
    type: GuildhallCardType.NecromancyArcanum,
    name: "Necromancy Arcanum",
    text: "Your Arcanists proficients in this school can cast any spell from its list",
    effects: [
      { type: GuildhallEffectType.Spell, school: ArcanistSchool.Necromancy },
    ] as GuildhallEffect[]
  },
  [GuildhallCardType.DiplomaticDeal]: {
    type: GuildhallCardType.DiplomaticDeal,
    name: "Diplomatic Deal",
    text: "+1 Hero from an adjacent Force.\nFrom now on your Guildhall cards who provide Guild Members let you choose model Cards from this faction as long as you have one Hero belonging to it.",
  },
  [GuildhallCardType.ArcaneForge]: {
    type: GuildhallCardType.ArcaneForge,
    name: "Arcane Forge (Unique)",
    text: "Equip your Heroic models with Artifacts cards. (Artifacts cards coming soon)",
  },
};
