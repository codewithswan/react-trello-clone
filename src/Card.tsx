import React from "react";
import styled from "styled-components";
import { colors, rounded } from "./styles/constants";
import { CardData } from "./data";
import { Draggable } from "react-beautiful-dnd";

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
  return <Draggable key={card.id} draggableId={card.id} index={0}>
  {(provided) => (
    <StyledCard
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {card.text}
    </StyledCard>
  )}
</Draggable>
}
