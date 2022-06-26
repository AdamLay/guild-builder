import { RootState, useAppDispatch } from "../data/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getFactions, getModelCards, getSpells } from "../data/appSlice";
import CircularProgress from "@mui/material/CircularProgress";

export function DataLoader() {
  const dispatch = useAppDispatch();
  const appState = useSelector((state: RootState) => state.app);
  const factions = appState.factions;
  const spells = appState.spells;
  const modelCards = appState.modelCards;
  useEffect(() => {
    console.log("Load library...");

    if (factions.length === 0) {
      dispatch(getFactions());
    }
    if (spells.length === 0) {
      dispatch(getSpells());
    }
    if (modelCards.length === 0) {
      dispatch(getModelCards(null as any));
    }
  }, [factions, spells, modelCards]);

  return (
    <div className="has-text-centered m-6">
      <CircularProgress />
      <p>Loading...</p>
    </div>
  );
}
