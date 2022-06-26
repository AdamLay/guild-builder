import type { NextPage } from "next";
import Guildhall from "../components/guildhall";
import ModelCards from "../components/modelCards";
import { RootState, useAppDispatch } from "../data/store";
import { useSelector } from "react-redux";
import MainAppBar from "../components/MainAppBar";
import { DataLoader } from "../components/DataLoader";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.app.loading);

  return (
    <>
      <MainAppBar title="Guildhall" />
      {loading ? (
        <DataLoader />
      ) : (
        <main className="container mt-6">
          <Guildhall />

          <hr />

          <ModelCards />

          {/* <FactionSelection /> */}
        </main>
      )}

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
