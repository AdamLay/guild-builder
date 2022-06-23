import { Box, List, ListItemButton, ListItemText, Modal, Paper } from "@mui/material";
import { selectModelCard } from "../data/appSlice";
import { GuildhallCard, GuildhallCards, GuildhallCardType } from "../data/models/guildhall";
import ModelCard from "../data/models/modelCard";
import { useAppDispatch } from "../data/store";

export interface ModelCardSelectionModalProps {
  open: boolean;
  onClose: any;
  library: ModelCard[];
}

export function ModelCardSelectionModal(props: ModelCardSelectionModalProps) {
  const dispatch = useAppDispatch();

  const selectCard = (card: ModelCard) => {
    dispatch(selectModelCard(card));
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
            {props.library.map((modelCard) => {
              return (
                <ListItemButton key={modelCard.id} onClick={() => selectCard(modelCard)}>
                  <ListItemText primary={modelCard.name} />
                </ListItemButton>
              );
            })}
          </List>
        </Paper>
      </Box>
    </Modal>
  );
}
