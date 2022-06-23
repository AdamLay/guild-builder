import type { NextPage } from "next";
import { useEffect } from "react";
import FactionSelection from "../components/factionSelection";
import { getFactions } from "../data/appSlice";
import { useAppDispatch } from "../data/store";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //dispatch(());
  }, []);

  return (
    <>
      <main className="container mt-6">
        <h1 className="has-text-centered mb-6" style={{ fontFamily: "Aclonica", fontSize: "48px" }}>
          Guild Hall
        </h1>

        <FactionSelection />
      </main>
    </>
  );
};

export default Home;
