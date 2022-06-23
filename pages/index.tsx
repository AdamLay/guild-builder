import type { NextPage } from "next";
import { useEffect } from "react";
import FactionSelection from "../components/factionSelection";
import Guildhall from "../components/guildhall";
import { getFactions } from "../data/appSlice";
import { useAppDispatch } from "../data/store";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFactions());
  }, []);

  return (
    <>
      <main className="container mt-6">
        <Guildhall />

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
