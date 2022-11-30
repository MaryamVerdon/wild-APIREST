import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wilder from "./components/Wilder";
import { useEffect, useState } from "react";
import axios from "axios";
import WilderForm from "./components/WilderForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Wilder as WilderType } from "./types/Wilder";

function App() {
  const [wilders, setWilders] = useState<WilderType[]>([]);
  const [error, setError] = useState("");
  const [animationParent] = useAutoAnimate<HTMLUListElement>();

  const loadWilders = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/wilders");
      setWilders(data);
    } catch (err) {
      console.error(err);
      setError("Cannot load wilders from the API");
    }
  };

  useEffect(() => {
    loadWilders();
  }, []);

  const addWilderToState = (newWilder: WilderType) => {
    const newList = [...wilders, newWilder];
    setWilders(newList);
  };

  return (
    <>
      <Header />
      <main className="container pb-8 bg-cream">
        <WilderForm onWilderCreated={addWilderToState} />
        {error && <div className="text-red-600">{error}</div>}
        <ul ref={animationParent}>
          {wilders.map((wilder, idx) => (
            <Wilder name={wilder.name} key={idx} />
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default App;
