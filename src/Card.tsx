import React from "react";
import styled from "styled-components";
import { colors, rounded } from "./styles/constants";
import { Draggable } from "react-beautiful-dnd";
import { Card as CardData } from "./features/api/boards";

export const StyledCard = styled.div<any>`
  background-color: ${props => props.isPending ? colors.gray300 : colors.white};
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.4);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: ${rounded.mid};
`;

interface CardProps {
  card: CardData
  isPending: boolean
}

export function Card(props: CardProps) {
  const { card, isPending } = props;
  return (
    <Draggable key={card.id} draggableId={card.id} index={card.index}>
      {(provided) => (
        <StyledCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isPending={isPending}
        >
          {card.text}
        </StyledCard>
      )}
    </Draggable>
  );
}
