import { Box, Grid, IconButton, List, ListItemButton, ListItemText, Modal, Paper } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addGuildhallCard, removeGuildhallCard } from "../data/appSlice";
import { GuildhallCard, GuildhallCards, GuildhallCardType } from "../data/models/guildhall";
import { RootState, useAppDispatch } from "../data/store";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Guildhall() {
  const dispatch = useAppDispatch();
  const guildhall = useSelector((state: RootState) => state.app.guildhall);
  const [selectionOpen, setSelectionOpen] = useState(false);
  return (
    <div>
      <h1 className="has-text-centered mb-6" style={{ fontFamily: "Aclonica", fontSize: "48px" }}>
        Guildhall
      </h1>
      <Grid container spacing={2}>
        {guildhall.map((card) => (
          <Grid key={card.selectionId} item xs={6}>
            <Paper className="p-4">
              <div className="is-flex">
                <p className="title-font" style={{ fontSize: "1.5rem", flex: 1 }}>
                  {card.name}
                </p>
                {card.type !== GuildhallCardType.GreatHall && (
                  <IconButton onClick={() => dispatch(removeGuildhallCard(card.selectionId as string))}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </div>
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
            {Object.values(GuildhallCards)
              .filter((x) => x.type !== GuildhallCardType.GreatHall)
              .map((x: any) => {
                const card = x as GuildhallCard;
                return (
                  <ListItemButton key={x.type} onClick={() => selectCard(card)}>
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
