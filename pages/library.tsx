import {
  AppBar,
  Button,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { Fragment, useEffect } from "react";
import { getFactions, getModelCards, getSpells } from "../data/appSlice";
import { RootState, useAppDispatch } from "../data/store";
import ArticleIcon from "@mui/icons-material/Article";
import Faction from "../data/models/faction";
import ModelCard from "../data/models/modelCard";
import { ModelCardTile } from "../components/ModelCardTile";
import { useSelector } from "react-redux";
import { groupMap } from "../helpers";
import { SpellSchool, Stat } from "../data/models/spells";

const Library: NextPage = () => {
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

  const rulesUrl = "https://olivier-mauras.gitlab.io/guilds/";

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={props.onBackClick}
        >
          <BackIcon />
        </IconButton> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} className="title-font">
            Faction Card Library
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => window.open(rulesUrl, "_blank")}
            startIcon={<ArticleIcon />}
          >
            View Rules
          </Button>
        </Toolbar>
      </AppBar>
      <main className="container mt-6">
        {factions.map((faction) => (
          <FactionGroup
            key={faction.id}
            library={modelCards.filter((x) => x.factionId === faction.id)}
            faction={faction}
          />
        ))}
        <h2 className="mt-6 title-font is-size-3 is-flex-grow-1">Spells</h2>
        {groupMap(
          spells,
          (x) => x.school.toString(),
          (group, key) => {
            return (
              <Fragment key={key}>
                <h3 className="mt-6 title-font is-size-4 is-flex-grow-1">
                  {SpellSchool[key as any]}
                </h3>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Rank</TableCell>
                      <TableCell>Roll</TableCell>
                      <TableCell>Vs</TableCell>
                      <TableCell>Range</TableCell>
                      <TableCell>Effect</TableCell>
                    </TableRow>
                  </TableHead>
                  {group.map((spell) => (
                    <TableRow key={spell.id}>
                      <TableCell>{spell.name}</TableCell>
                      <TableCell>{spell.rank}</TableCell>
                      <TableCell>{spell.roll ? `${spell.roll} ${spell.aoE ? " AoE " : ""} ATK` : "/"}</TableCell>
                      <TableCell>{spell.vs ? Stat[spell.vs as any] : "/"}</TableCell>
                      <TableCell>
                        {spell.range
                          ? `${spell.range}"`
                          : spell.self
                          ? "Self"
                          : spell.inVision
                          ? "In Vision"
                          : "/"}
                      </TableCell>
                      <TableCell>{spell.effect}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </Fragment>
            );
          }
        )}
      </main>
    </>
  );
};

export default Library;

interface FactionGroupProps {
  library: ModelCard[];
  faction: Faction;
}

function FactionGroup(props: FactionGroupProps) {
  return (
    <>
      <div className="is-flex mt-6">
        <h3 className="title-font is-size-4 is-flex-grow-1">{props.faction.name}</h3>
      </div>
      <hr />

      <Grid container spacing={4}>
        {props.library.map((modelCard) => {
          return (
            <Grid key={modelCard.selectionId} item sm={4}>
              <ModelCardTile faction={props.faction} modelCard={modelCard} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
