export enum Force {
  Fortitude,
  Chaos,
  Corruption,
  Order,
  Wild,
}

export const ForceColour = {
  [Force.Fortitude]: "rgb(255,208,102)",
  [Force.Chaos]: "rgb(153,0,0)",
  [Force.Corruption]: "rgb(0,0,0)",
  [Force.Order]: "rgb(224,217,198)",
  [Force.Wild]: "rgb(106,168,79)",
}

export const ForceForegroundColour = {
  [Force.Fortitude]: "#000",
  [Force.Chaos]: "#FFF",
  [Force.Corruption]: "#FFF",
  [Force.Order]: "#000",
  [Force.Wild]: "#000",
}

export enum Element {
  Fire,
  Poison,
  Thunder,
  AquaticTerrain,
  Frost,
  Energy
}

export enum ElementEffect {
  Resistance,
  Weakness,
  Immunity,
}
