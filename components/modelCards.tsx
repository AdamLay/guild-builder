import { Box, Button, Card, Grid, Paper } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { selectFaction } from "../data/appSlice";
import { Force, ForceColour, ForceForegroundColour } from "../data/models/enums";
import Faction from "../data/models/faction";
import { GuildhallEffectType } from "../data/models/guildhall";
import ModelCard from "../data/models/modelCard";
import { RootState, useAppDispatch } from "../data/store";
import { groupMap } from "../helpers";
import { ModelCardSelectionModal } from "./ModelCardSelectionModal";

export default function ModelCards() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const appState = useSelector((state: RootState) => state.app);
  const guildhall = appState.guildhall;
  const modelCards = appState.modelCards;

  const getAvailableSlots = (slotName: string) => {
    return guildhall.reduce((slots, guildhallCard) => {
      const slotEffects = guildhallCard.effects.filter(
        (x) => x.type === GuildhallEffectType.Slot && x.keyword === slotName
      );

      return slots + _.sumBy(slotEffects, (x) => x.modifier || 0);
    }, 0);
  };

  const slotFilter = (slotName: string, modelCards: ModelCard[]) => {
    return modelCards.filter((modelCard) => _.some(modelCard.keywords, (word) => word === slotName));
  };

  return (
    <>
      <h1 className="has-text-centered mb-6" style={{ fontFamily: "Aclonica", fontSize: "48px" }}>
        Model Cards
      </h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {["Hero", "Infantry", "Cavalry"].map((slot) => (
            <Grid key={slot} item xs={3}>
              <Slot
                slot={slot}
                available={getAvailableSlots(slot)}
                used={slotFilter(slot, appState.selectedModelCards).length}
                selectedCards={slotFilter(slot, appState.selectedModelCards)}
                library={slotFilter(slot, modelCards)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

interface SlotProps {
  slot: string;
  available: number;
  used: number;
  selectedCards: ModelCard[];
  library: ModelCard[];
}

function Slot(props: SlotProps) {
  const [selectionOpen, setSelectionOpen] = useState(false);
  return (
    <>
      <Paper className="p-4 mb-4">
        <p>
          {props.slot} {props.used}/{props.available}
        </p>
      </Paper>
      <Button variant="contained" onClick={() => setSelectionOpen(true)}>
        Add {props.slot}
      </Button>
      {props.selectedCards.map((modelCard) => (
        <ModelCardTile faction={{ id: 1, name: "Dragonguard", force: Force.Fortitude }} modelCard={modelCard} />
      ))}
      <ModelCardSelectionModal open={selectionOpen} onClose={() => setSelectionOpen(false)} library={props.library} />
    </>
  );
}

interface ModelCardProps {
  faction: Faction;
  modelCard: ModelCard;
}

function ModelCardTile({ faction, modelCard }: ModelCardProps) {
  const unit = modelCard;
  return (
    <Paper>
      <div
        className="p-4"
        style={{ background: ForceColour[faction.force], color: ForceForegroundColour[faction.force] }}>
        <p className="title-font" style={{ fontSize: "1.05rem" }}>
          {unit.name} {unit.unitNumber > 1 ? `(${unit.unitNumber})` : null}
        </p>
        <p style={{ opacity: 0.8, fontSize: "0.9rem", fontWeight: 600, fontStyle: "italic" }}>{unit.keywords.join(", ")}</p>
      </div>
      <Grid container sx={{ fontWeight: 600, textAlign: "center" }} className="p-2">
        <Grid item xs={3}>
          <p>Might</p>
          <p>{unit.might}</p>
        </Grid>
        <Grid item xs={3}>
          <p>Dex</p>
          <p>
            {unit.dex} {unit.ignoreDifficultTerrain && "(M)"} {unit.levitating && "(L)"}
          </p>
        </Grid>
        <Grid item xs={3}>
          <p>Def</p>
          <p>
            {unit.def} {unit.shield && "(S)"}
          </p>
        </Grid>
        <Grid item xs={3}>
          <p>Dex</p>
          <p>{unit.will}</p>
        </Grid>
      </Grid>
    </Paper>
  );
}