import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import Guildhall from "../components/guildhall";
import ModelCards from "../components/modelCards";
import { getFactions, getModelCards } from "../data/appSlice";
import { useAppDispatch } from "../data/store";
import ArticleIcon from "@mui/icons-material/Article";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFactions());
    dispatch(getModelCards(null as any));
  }, []);

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
            Guildhall
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
        <Guildhall />

        <hr />

        <ModelCards />

        {/* <FactionSelection /> */}
      </main>

      <footer>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </>
  );
};

export default Home;
