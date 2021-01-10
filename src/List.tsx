import React from "react";
import { AddForm } from "./AddForm";
import { Card } from "./Card";
import { Droppable } from "react-beautiful-dnd";
import { List as ListData, Card as CardData } from "./features/api/boards";
import { H1 } from "./components/headings";
import { IconButton } from "./components/forms";
import { StyledList } from "./components/lists";
import styled from "styled-components";

interface ListProps {
  isAdding: boolean;
  list: ListData;
  onStartAdd: () => void;
  onCancel: () => void;
  onAdd: (text: string) => void;
  pendingCards: { [key: string]: boolean };
  onStartEdit: (card: CardData) => void;
}

const MenuButtonContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
`;

export function List(props: ListProps) {
  const { list, onStartAdd, isAdding, onCancel, onAdd, pendingCards, onStartEdit } = props;

  return (
    <Droppable droppableId={list.id}>
      {(provided, snapshot) => (
        <StyledList ref={provided.innerRef}>
          <MenuButtonContainer>
            <IconButton onClick={onStartAdd} width={"30px"}>
              <i className="icofont-navigation-menu icofont-1x"></i>
            </IconButton>
          </MenuButtonContainer>
          <H1>{list.name}</H1>
          {Object.values(list.cards ?? {})
            .sort((a, b) => a.index - b.index)
            .map(card => (
              <Card card={card} isPending={pendingCards[card.id]} onStartEdit={onStartEdit} key={card.id} />
            ))}
          {provided.placeholder}
          {!isAdding && (
            <IconButton onClick={onStartAdd}>
              <i className="icofont-plus icofont-1x"></i> Add a card
            </IconButton>
          )}
          {isAdding && <AddForm onStartAdd={onStartAdd} onAdd={onAdd} onCancel={onCancel} />}
        </StyledList>
      )}
    </Droppable>
  );
}
