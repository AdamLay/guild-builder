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
import { groupMap, slotFilter } from "../helpers";
import { SpellSchool, Stat } from "../data/models/spells";
import { Force, ForceColour } from "../data/models/enums";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MainAppBar from "../components/MainAppBar";
import { DataLoader } from "../components/DataLoader";
import { useRouter } from "next/router";
import { selectModelCard } from "../data/appSlice";
import { GuildhallCard } from "../data/models/guildhall";

const Library: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { factions, activeFactions, spells, modelCards, loading, guildhall } = useSelector(
    (state: RootState) => state.app
  );
  const selectionMode = !!router.query["selection"];
  const slotBudget = parseInt(router.query["budget"] as any);
  const queryKeywords = router.query["keywords"];
  const keywords = Array.isArray(queryKeywords) ? queryKeywords : [queryKeywords as string];

  return (
    <>
      <MainAppBar title="Faction Card Library" />
      {loading ? (
        <DataLoader />
      ) : (
        <main className="container mt-6">
          {activeFactions.length > 0
            ? activeFactions.map((faction) => (
                <FactionGroup
                  key={faction.id}
                  library={modelCards.filter((x) => x.factionId === faction.id)}
                  faction={faction}
                  selectionMode={selectionMode}
                  keywords={keywords}
                  guildhall={guildhall}
                  slotBudget={slotBudget}
                />
              ))
            : groupMap(
                factions,
                (x) => x.force.toString(),
                (group, key) => (
                  <Accordion key={key} defaultExpanded={selectionMode}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="is-flex" style={{ alignItems: "center" }}>
                        <div
                          className="mr-4"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "100px",
                            backgroundColor: (ForceColour as any)[key] as string,
                          }}
                        ></div>
                        <h2 className="title-font is-size-3 is-flex-grow-1">{Force[key as any]}</h2>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {group.map((faction) => (
                        <FactionGroup
                          key={faction.id}
                          library={modelCards.filter((x) => x.factionId === faction.id)}
                          faction={faction}
                          selectionMode={selectionMode}
                          keywords={[router.query["keywords"]] as any}
                          guildhall={guildhall}
                          slotBudget={slotBudget}
                        />
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )
              )}

          {!selectionMode && (
            <>
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
                                  {spell.roll
                                    ? `${spell.roll} ${spell.aoE ? " AoE " : ""} ATK`
                                    : "/"}
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
            </>
          )}
        </main>
      )}
    </>
  );
};

export default Library;

interface FactionGroupProps {
  selectionMode: boolean;
  keywords: string[];
  library: ModelCard[];
  faction: Faction;
  guildhall: GuildhallCard[];
  slotBudget: number;
}

function FactionGroup(props: FactionGroupProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onModelCardSelected = (modelCard: ModelCard) => {
    dispatch(selectModelCard(modelCard));
    router.push("/");
  };
  const allowLegendary = props.guildhall.length >= 8;
  const displayLibrary = props.selectionMode
    ? slotFilter(props.keywords, props.library)
        .filter((x) => allowLegendary || !x.keywords.includes("Legendary Hero"))
        .filter((x) => x.slots <= props.slotBudget)
    : props.library;
  return (
    <Accordion defaultExpanded={props.selectionMode}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h3 className="title-font is-size-4 is-flex-grow-1">{props.faction.name}</h3>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={4}>
          {displayLibrary.map((modelCard) => (
            <Grid key={modelCard.id} item sm={4}>
              <ModelCardTile
                faction={props.faction}
                modelCard={modelCard}
                onClick={props.selectionMode ? onModelCardSelected : null}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
