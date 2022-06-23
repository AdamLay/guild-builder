import { Box, Grid, List, ListItemButton, ListItemText, Modal, Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addGuildhallCard } from "../data/appSlice";
import { GuildhallCard, GuildhallCards, GuildhallCardType } from "../data/models/guildhall";
import { RootState, useAppDispatch } from "../data/store";

export default function Guildhall() {
  const guildhall = useSelector((state: RootState) => state.app.guildhall);
  const [selectionOpen, setSelectionOpen] = useState(false);
  return (
    <div>
      <h1 className="has-text-centered mb-6" style={{ fontFamily: "Aclonica", fontSize: "48px" }}>
        Guildhall
      </h1>
      <Grid container spacing={2}>
        {guildhall.map((card) => (
          <Grid item xs={6}>
            <Paper className="p-4">
              <p className="title-font" style={{ fontSize: "1.5rem" }}>
                {card.name}
              </p>
              <hr />
              <pre>{card.text}</pre>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Paper className="p-4">
            <button className="button" onClick={() => setSelectionOpen(true)}>
              Add Guildhall Card
            </button>
          </Paper>
        </Grid>
      </Grid>

      <GuildhallCardSelectionModal open={selectionOpen} onClose={() => setSelectionOpen(false)} />
    </div>
  );
}

interface GuildhallCardSelectionModalProps {
  open: boolean;
  onClose: any;
}

function GuildhallCardSelectionModal(props: GuildhallCardSelectionModalProps) {
  const dispatch = useAppDispatch();

  const selectCard = (card: GuildhallCard) => {
    dispatch(addGuildhallCard(card));
    props.onClose();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>
        <Paper>
          <List>
            {Object.values(GuildhallCards).map((x: any) => {
              const card = x as GuildhallCard;
              return (
                <ListItemButton onClick={() => selectCard(card)}>
                  <ListItemText primary={card.name} secondary={card.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Modal>
  );
}
