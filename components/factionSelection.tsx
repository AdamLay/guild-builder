import { Box, Card, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectFaction } from "../data/appSlice";
import { Force, ForceColour, ForceForegroundColour } from "../data/models/enums";
import Faction from "../data/models/faction";
import { RootState, useAppDispatch } from "../data/store";
import { groupMap } from "../helpers";

export default function FactionSelection() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const appState = useSelector((state: RootState) => state.app);

  if (appState.loadingFactions) return <p>Loading...</p>;

  const onSelect = (faction: Faction) => {
    dispatch(selectFaction(faction));
  };

  return (
    <>
      <h1 className="has-text-centered mb-6" style={{ fontFamily: "Aclonica", fontSize: "48px" }}>
        Select a Faction!
      </h1>
      <Box sx={{ flexGrow: 1 }}>
        {groupMap(
          appState.factions,
          (x) => Force[x.force],
          (group, key) => {
            return (
              <Fragment key={key}>
                <h2 className="title-font mt-6" style={{ fontSize: "2rem" }}>
                  {key}
                </h2>
                <hr />
                <Grid container spacing={2}>
                  {group.map((faction) => (
                    <Grid item key={faction.id} xs={6}>
                      <FactionTile faction={faction} onSelect={onSelect} />
                    </Grid>
                  ))}
                </Grid>
              </Fragment>
            );
          }
        )}
      </Box>
    </>
  );
}

interface FactionTileProps {
  faction: Faction;
  onSelect: (faction: Faction) => void;
}

function FactionTile({ faction, onSelect }: FactionTileProps) {
  return (
    <Paper className="p-4 is-flex interactable" onClick={() => onSelect(faction)}>
      <div
        style={{ background: ForceColour[faction.force], borderRadius: "2rem", width: "2rem", height: "2rem" }}></div>
      <p className="title-font ml-4" style={{ fontSize: "1.5rem", flex: 1 }}>
        {faction.name}
      </p>
    </Paper>
  );
}
