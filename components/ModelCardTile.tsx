import { Divider, Paper, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Fragment } from "react";
import { Element, ForceColour, ForceForegroundColour } from "../data/models/enums";
import Faction from "../data/models/faction";
import ModelCard from "../data/models/modelCard";

export interface ModelCardTileProps {
  faction: Faction;
  modelCard: ModelCard;
}

export function ModelCardTile({ faction, modelCard }: ModelCardTileProps) {
  const unit = modelCard;
  return (
    <Paper>
      <div
        className="px-2 py-2 has-text-centered"
        style={{
          background: ForceColour[faction.force],
          color: ForceForegroundColour[faction.force],
        }}
      >
        <p className="title-font" style={{ fontSize: "1.05rem" }}>
          {unit.name} {unit.unitNumber > 1 ? `(${unit.unitNumber})` : null}{" "}
          {unit.slots > 1 ? `(${"*".repeat(unit.slots)})` : ""}
        </p>
        <p style={{ opacity: 0.8, fontSize: "0.9rem", fontWeight: 600, fontStyle: "italic" }}>
          {unit.keywords.join(", ")}
        </p>
      </div>
      <div
        className="is-flex p-2"
        style={{ fontWeight: 600, textAlign: "center", justifyContent: "space-evenly" }}
      >
        {unit.heroicWounds ? (
          <div>
            <p>HW</p>
            <p>{unit.heroicWounds}</p>
          </div>
        ) : null}
        <div>
          <p>Might</p>
          <p>{unit.might}</p>
        </div>
        <div>
          <p>Dex</p>
          <p>
            {unit.dex} {unit.ignoreDifficultTerrain && "(M)"} {unit.levitating && "(L)"}
          </p>
        </div>
        <div>
          <p>Def</p>
          <p>
            {unit.def} {unit.shield && "(S)"}
          </p>
        </div>
        <div>
          <p>Dex</p>
          <p>{unit.will}</p>
        </div>
      </div>
      <Divider />
      <Table>
        <TableBody>
          {unit.attacks.map((attack) => (
            <TableRow key={attack.id}>
              <TableCell>{attack.name}</TableCell>
              <TableCell style={{ fontWeight: 600 }}>
                {attack.attacks} {attack.aoE && " AoE "}
                ATK
                {attack.element && ` (${Element[attack.element]})`}
              </TableCell>
              <TableCell>
                {attack.arc && <p>{attack.arc}&deg;</p>}
                <p style={{ whiteSpace: "nowrap" }}>
                  {attack.minRange !== null && attack.minRange + "-"}
                  {attack.range}&quot;
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {unit.abilities.length > 0 &&
        unit.abilities.map((ability) => (
          <Fragment key={ability.id}>
            <div className="p-2 has-text-centered">
              <p style={{ fontWeight: 600 }}>
                {ability.name}
                {ability.passive ? " (P)" : ""}
                {ability.torment ? " (T)" : ""}
                {ability.fatigue ? " (F)" : ""}
              </p>
              <p>{ability.text}</p>
            </div>
            <Divider />
          </Fragment>
        ))}
      {unit.rw.length > 0 && (
        <div className="p-2">
          <span style={{ fontWeight: 600 }}>R/W: </span>
          <span>{unit.rw.join(", ")}.</span>
        </div>
      )}
    </Paper>
  );
}
