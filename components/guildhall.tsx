import { Grid, IconButton, Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { removeGuildhallCard } from "../data/appSlice";
import { GuildhallCardType } from "../data/models/guildhall";
import { RootState, useAppDispatch } from "../data/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { GuildhallCardSelectionModal } from "./GuildhallCardSelectionModal";
import AddIcon from "@mui/icons-material/Add";

export default function Guildhall() {
  const dispatch = useAppDispatch();
  const guildhall = useSelector((state: RootState) => state.app.guildhall);
  const [selectionOpen, setSelectionOpen] = useState(false);

  return (
    <>
      {/* <h1 className="has-text-centered mb-6" style={{ fontFamily: "Aclonica", fontSize: "48px" }}>
        Guildhall
      </h1> */}
      <Grid container spacing={2}>
        {guildhall.map((card) => (
          <Grid key={card.selectionId} item sm={4}>
            <Paper className="p-4">
              <div className="is-flex">
                <p className="title-font" style={{ fontSize: "1.5rem", flex: 1 }}>
                  {card.name}
                </p>
                {card.type !== GuildhallCardType.GreatHall && (
                  <IconButton
                    onClick={() => dispatch(removeGuildhallCard(card.selectionId as string))}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
              <hr />
              <p>{card.text}</p>
            </Paper>
          </Grid>
        ))}
        <Grid item sm={4}>
          <Paper
            className="p-4 is-flex interactable "
            style={{ fontWeight: 600, fontSize: "1.1rem" }}
            onClick={() => setSelectionOpen(true)}
          >
            <span style={{ flex: 1 }}>Add Guildhall Card</span>
            <AddIcon color="primary" />
          </Paper>
        </Grid>
      </Grid>

      <GuildhallCardSelectionModal open={selectionOpen} onClose={() => setSelectionOpen(false)} />
    </>
  );
}
