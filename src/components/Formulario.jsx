import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

const Formulario = () => {
  //state del listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);

  const MONEDAS = [
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
    { codigo: "COP", nombre: "Peso colombiano" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "CNY", nombre: "Renminbi" },
    { codigo: "RUB", nombre: "Rublo Ruso" },
  ];

  //utilizando useMonedas
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  //utlizando useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  //ejecutando llamado ala API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);
  return (
    <form>
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

//styled components

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 2s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;
export default Formulario;
