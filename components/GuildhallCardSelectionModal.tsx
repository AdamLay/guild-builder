import { Box, List, ListItemButton, ListItemText, Modal, Paper } from "@mui/material";
import { addGuildhallCard } from "../data/appSlice";
import { GuildhallCard, GuildhallCards, GuildhallCardType } from "../data/models/guildhall";
import { useAppDispatch } from "../data/store";

export interface GuildhallCardSelectionModalProps {
  open: boolean;
  onClose: any;
}

export function GuildhallCardSelectionModal(props: GuildhallCardSelectionModalProps) {
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
