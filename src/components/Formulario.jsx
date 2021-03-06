import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Error from "./Error";
import PropTypes from "prop-types";

import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  //state del listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

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

  //Uso del submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    //validar si los campos estan llenos
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }

    //pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };
  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

//PropTypes
Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptomoneda: PropTypes.func.isRequired,
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
