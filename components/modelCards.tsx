import { Box, Button, Grid } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import Faction from "../data/models/faction";
import { GuildhallEffect, GuildhallEffectType } from "../data/models/guildhall";
import ModelCard from "../data/models/modelCard";
import { RootState, useAppDispatch } from "../data/store";
import { groupMap } from "../helpers";
import { ModelCardSelectionModal } from "./ModelCardSelectionModal";
import { ModelCardTile } from "./ModelCardTile";

export default function ModelCards() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const appState = useSelector((state: RootState) => state.app);
  const factions = appState.factions;
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
    return modelCards.filter((modelCard) =>
      _.some(modelCard.keywords, (word) => word === slotName)
    );
  };

  const allSlotEffects = guildhall.reduce(
    (effects, card) =>
      effects.concat(card.effects.filter((x) => x.type === GuildhallEffectType.Slot)),
    [] as GuildhallEffect[]
  );

  // library: slotFilter(slot, modelCards)

  return (
    <Box sx={{ flexGrow: 1 }}>
      {groupMap(
        allSlotEffects,
        (x) => x.keyword as string,
        (slot, key) => (
          <Slot
            slot={key}
            factions={factions}
            available={_.sumBy(slot, (x) => x.modifier as number)}
            used={slotFilter(key, appState.selectedModelCards).length}
            selectedCards={slotFilter(key, appState.selectedModelCards)}
            library={slotFilter(key, modelCards)}
          />
        )
      )}
    </Box>
  );
}

interface SlotProps {
  slot: string;
  available: number;
  used: number;
  selectedCards: ModelCard[];
  library: ModelCard[];
  factions: Faction[];
}

function Slot(props: SlotProps) {
  const [selectionOpen, setSelectionOpen] = useState(false);
  return (
    <>
      <div className="is-flex mt-6">
        <h3 className="title-font is-size-4 is-flex-grow-1">
          {props.slot} {props.used}/{props.available}
        </h3>
        <Button variant="contained" onClick={() => setSelectionOpen(true)}>
          Add {props.slot}
        </Button>
      </div>
      <hr />

      <Grid container spacing={4}>
        {props.selectedCards.map((modelCard) => (
          <Grid key={modelCard.selectionId} item sm={4}>
            <ModelCardTile
              faction={props.factions.find((x) => x.id === modelCard.factionId) as Faction}
              modelCard={modelCard}
            />
          </Grid>
        ))}
      </Grid>
      <ModelCardSelectionModal
        open={selectionOpen}
        onClose={() => setSelectionOpen(false)}
        library={props.library}
      />
    </>
  );
}
