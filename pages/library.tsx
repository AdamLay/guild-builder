import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TableBody,
} from "@mui/material";
import type { NextPage } from "next";
import { RootState, useAppDispatch } from "../data/store";
import Faction from "../data/models/faction";
import ModelCard from "../data/models/modelCard";
import { ModelCardTile } from "../components/ModelCardTile";
import { useSelector } from "react-redux";
import { groupMap } from "../helpers";
import { SpellSchool, Stat } from "../data/models/spells";
import { Force } from "../data/models/enums";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MainAppBar from "../components/MainAppBar";
import { DataLoader } from "../components/DataLoader";

const Library: NextPage = () => {
  const dispatch = useAppDispatch();
  const appState = useSelector((state: RootState) => state.app);
  const factions = appState.factions;
  const spells = appState.spells;
  const modelCards = appState.modelCards;

  return (
    <>
      <MainAppBar title="Faction Card Library" />
      {appState.loading ? (
        <DataLoader />
      ) : (
        <main className="container mt-6">
          {groupMap(
            factions,
            (x) => x.force.toString(),
            (group, key) => (
              <Accordion key={key}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h2 className="title-font is-size-3 is-flex-grow-1">{Force[key as any]}</h2>
                </AccordionSummary>
                <AccordionDetails>
                  {group.map((faction) => (
                    <FactionGroup
                      key={faction.id}
                      library={modelCards.filter((x) => x.factionId === faction.id)}
                      faction={faction}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            )
          )}

          <h2 className="mt-6 title-font is-size-3 is-flex-grow-1">Spells</h2>
          {groupMap(
            spells,
            (x) => x.school.toString(),
            (group, key) => {
              return (
                <Accordion key={key}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h3 className="title-font is-size-4 is-flex-grow-1">
                      {SpellSchool[key as any]}
                    </h3>
                  </AccordionSummary>
                  <AccordionDetails>
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
                      <TableBody>
                        {group.map((spell) => (
                          <TableRow key={spell.id}>
                            <TableCell>{spell.name}</TableCell>
                            <TableCell>{spell.rank}</TableCell>
                            <TableCell>
                              {spell.roll ? `${spell.roll} ${spell.aoE ? " AoE " : ""} ATK` : "/"}
                            </TableCell>
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
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              );
            }
          )}
        </main>
      )}
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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h3 className="title-font is-size-4 is-flex-grow-1">{props.faction.name}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={4}>
          {props.library.map((modelCard) => (
            <Grid key={modelCard.id} item sm={4}>
              <ModelCardTile faction={props.faction} modelCard={modelCard} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
