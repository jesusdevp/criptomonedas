import React from "react";
import styled from "@emotion/styled";

import useMoneda from "../hooks/useMoneda";

const Formulario = () => {
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
  return (
    <form>
      <SelectMonedas />
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
