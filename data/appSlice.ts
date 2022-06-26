import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import ApiService from "../services/ApiService";
import Faction from "./models/faction";
import { GuildhallCard, GuildhallCards, GuildhallCardType } from "./models/guildhall";
import ModelCard from "./models/modelCard";
import { Spell } from "./models/spells";

export interface AppState {
  loading: boolean;
  factions: Faction[];
  activeFactions: Faction[];
  spells: Spell[];
  modelCards: ModelCard[];
  guildhall: GuildhallCard[];
  selectedModelCards: ModelCard[];
}

const initialState: AppState = {
  loading: true,
  factions: [],
  activeFactions: [],
  spells: [],
  modelCards: [],
  guildhall: [{ ...GuildhallCards[GuildhallCardType.GreatHall], selectionId: nanoid() }],
  selectedModelCards: [],
};

export const getFactions = createAsyncThunk("app/getFactions", async () => {
  const factions = await ApiService.getFactions();
  console.log("Loaded factions", factions);
  return factions;
});

export const getSpells = createAsyncThunk("app/getSpells", async () => {
  const spells = await ApiService.getSpells();
  console.log("Loaded factions", spells);
  return spells;
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
      const modelCard = action.payload;
      const isHero = modelCard.keywords.some(x => x === "Hero");

      if (isHero) {
        // Load the faction if not loaded
        const isFactionLoaded = state.activeFactions.some(x => x.id === modelCard.factionId);
        if (!isFactionLoaded) {
          const faction = state.factions.find(x => x.id === modelCard.factionId) as Faction;
          state.activeFactions.push(faction);
        }
      }

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
    builder.addCase(getFactions.fulfilled, (state, action: PayloadAction<Faction[]>) => {
      state.factions = action.payload;
      state.loading = isLoading(state);
    });
    builder.addCase(getSpells.fulfilled, (state, action: PayloadAction<Spell[]>) => {
      state.spells = action.payload;
      state.loading = isLoading(state);
    });
    builder.addCase(getModelCards.fulfilled, (state, action: PayloadAction<ModelCard[]>) => {
      state.modelCards = action.payload;
      state.loading = isLoading(state);
    });
  },
});

const isLoading = (state: AppState) => {
  return !state.modelCards.length || !state.factions.length || !state.spells.length;
}

// Action creators are generated for each case reducer function
export const { selectFaction, addGuildhallCard, removeGuildhallCard, selectModelCard, removeModelCard } =
  appSlice.actions;

export default appSlice.reducer;
