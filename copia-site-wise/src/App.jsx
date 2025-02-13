import { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";

function App() {
  const [moedaDe, setMoedaDe] = useState("USD");
  const [moedaPara, setMoedaPara] = useState("BRL");
  const [cambio, setCambio] = useState(null);

  const consultaCambio = (from, to) => {
    api
      .get(`/json/last/${from}-${to}`)
      .then((response) => {
        setCambio(response.data);
        console.log("Dados do câmbio:", response.data);
      })
      .catch((err) => {
        console.error("Ops! Ocorreu um erro: " + err);
      });
  };

  // Chama a API quando moedaDe ou moedaPara mudar
  useEffect(() => {
    consultaCambio(moedaDe, moedaPara);
  }, [moedaDe, moedaPara]);

  return (
    <>
      <section className="navbar">
        <h1 className="wise-title">WISE</h1>
        {cambio && <p>Cotação Atual: {parseFloat(cambio?.[`${moedaDe}${moedaPara}`]?.bid)}</p>}
      </section>
    </>
  );
}

export default App;