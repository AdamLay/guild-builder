import { AppBar, Button, Typography, Toolbar } from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";

export interface MainAppBarProps {
  title: string;
}

export default function MainAppBar(props: MainAppBarProps) {
  const rulesUrl = "https://olivier-mauras.gitlab.io/guilds/";
  return (
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
          {props.title}
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
  );
}
