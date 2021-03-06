import { Box, Button, Grid } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Faction from "../data/models/faction";
import { GuildhallEffect, GuildhallEffectType } from "../data/models/guildhall";
import ModelCard from "../data/models/modelCard";
import { RootState, useAppDispatch } from "../data/store";
import { groupMap, slotFilter } from "../helpers";
import { ModelCardTile } from "./ModelCardTile";

export default function ModelCards() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const appState = useSelector((state: RootState) => state.app);
  const factions = appState.factions;
  const guildhall = appState.guildhall;
  const modelCards = appState.modelCards;

  const allSlotEffects = guildhall.reduce(
    (effects, card) =>
      effects.concat(card.effects.filter((x) => x.type === GuildhallEffectType.Slot)),
    [] as GuildhallEffect[]
  );

  const isHeroSelected = appState.activeFactions.length > 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      {groupMap(
        allSlotEffects,
        (x) => (x.keywords || []).join("|"),
        (slot, keyStr) => {
          const key: string[] = keyStr.split("|");
          return (
            (isHeroSelected || key.includes("Hero")) && (
              <Slot
                key={keyStr}
                slot={key}
                factions={factions}
                available={_.sumBy(slot, (x) => x.modifier as number)}
                used={_.sumBy(slotFilter(key, appState.selectedModelCards), (x) => x.slots)}
                selectedCards={slotFilter(key, appState.selectedModelCards)}
                library={slotFilter(key, modelCards)}
              />
            )
          );
        }
      )}
    </Box>
  );
}

interface SlotProps {
  slot: string[];
  available: number;
  used: number;
  selectedCards: ModelCard[];
  library: ModelCard[];
  factions: Faction[];
}

function Slot(props: SlotProps) {
  const router = useRouter();
  return (
    <>
      <div className="is-flex mt-6">
        <h3 className="title-font is-size-4 is-flex-grow-1">
          {props.slot.join("/")} {props.used}/{props.available}
        </h3>
        {props.used < props.available && (
          <Button
            variant="contained"
            onClick={() =>
              router.push({
                pathname: "/library",
                query: {
                  selection: true,
                  keywords: props.slot,
                  budget: props.available - props.used,
                },
              })
            }
          >
            Add {props.slot}
          </Button>
        )}
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
    </>
  );
}
