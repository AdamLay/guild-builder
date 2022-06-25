export interface Spell {
  id: number;
  school: SpellSchool;
  name: string;
  rank: number;
  roll?: number;
  aoE: boolean;
  vs?: Stat;
  range?: number;
  self: boolean;
  inVision: boolean;
  effect: string;
}

/*
c short Id { get; set; }
  
  public SpellSchool School { get; set; }
  
  [MaxLength(32)]
  public string Name { get; set; }
  
  public byte Rank { get; set; }
  public byte? Roll { get; set; }
  public bool AoE { get; set; }
  public Stat? Vs { get; set; }
  public byte? Range { get; set; }
  public bool Self { get; set; }
  public bool InVision { get; set; }
  
  [MaxLength(1024)]
  public string Effect { get; set; }
   */

export enum SpellSchool {
  Elemental,
  Animacy,
  Druidcraft,
  Necromancy
}

export enum Stat {
  Might,
  Dex,
  Def,
  Will
}