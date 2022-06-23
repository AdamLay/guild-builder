import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import ApiService from "../services/ApiService";
import Faction from "./models/faction";
import { GuildhallCard, GuildhallCards, GuildhallCardType } from "./models/guildhall";
import ModelCard from "./models/modelCard";

export interface AppState {
  factions: Faction[];
  loadingFactions: boolean;
  activeFactions: Faction[];
  modelCards: ModelCard[];
  guildhall: GuildhallCard[];
  selectedModelCards: ModelCard[];
}

const initialState: AppState = {
  factions: [],
  loadingFactions: true,
  activeFactions: [],
  modelCards: [],
  guildhall: [{ ...GuildhallCards[GuildhallCardType.GreatHall], selectionId: nanoid() }],
  selectedModelCards: [],
};

export const getFactions = createAsyncThunk("app/getFactions", async () => {
  const factions = await ApiService.getFactions();
  console.log("Loaded factions", factions);
  return factions;
});

export const getModelCards = createAsyncThunk("app/getModelCards", async (factionId: number) => {
  const modelCards = await ApiService.getModelCards(factionId);
  console.log("Loaded model cards", modelCards);
  return modelCards;
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectFaction(state, action: PayloadAction<Faction>) {
      state.activeFactions.push(action.payload);
    },

    addGuildhallCard(state, action: PayloadAction<GuildhallCard>) {
      state.guildhall.push({ ...action.payload, selectionId: nanoid() });
    },
    removeGuildhallCard(state, action: PayloadAction<string>) {
      const removeAt = state.guildhall.findIndex((x) => x.selectionId === action.payload);
      state.guildhall.splice(removeAt, 1);
    },

    selectModelCard(state, action: PayloadAction<ModelCard>) {
      state.selectedModelCards.push({
        ...action.payload,
        selectionId: nanoid(),
      });
    },
    removeModelCard(state, action: PayloadAction<string>) {
      const removeAt = state.selectedModelCards.findIndex((x) => x.selectionId === action.payload);
      state.selectedModelCards.splice(removeAt, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(getFactions.pending, (state) => {
      return { ...state, loadingFactions: true };
    });
    builder.addCase(getFactions.fulfilled, (state, action: PayloadAction<Faction[]>) => {
      return { ...state, loadingFactions: false, factions: action.payload };
    });

    builder.addCase(getModelCards.fulfilled, (state, action: PayloadAction<ModelCard[]>) => {
      state.modelCards.push(...action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { selectFaction, addGuildhallCard, removeGuildhallCard, selectModelCard, removeModelCard } =
  appSlice.actions;

export default appSlice.reducer;
