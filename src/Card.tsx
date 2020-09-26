import React from "react";
import styled from "styled-components";
import { colors, rounded } from "./styles/constants";
import { CardData } from "./data";

export const StyledCard = styled.div`
  background-color: ${colors.white};
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.4);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: ${rounded.mid};
`;

interface CardProps {
  card: CardData;
}

export function Card(props: CardProps) {
  const { card } = props;

  return <StyledCard>{card.text}</StyledCard>;
}
