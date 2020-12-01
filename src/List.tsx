import React from "react";
import styled from "styled-components";
import { AddButton } from "./AddButton";
import { AddForm } from "./AddForm";
import { Card } from "./Card";
import { colors, rounded } from "./styles/constants";
import { Droppable } from "react-beautiful-dnd";
import { List as ListData } from "./features/api/boards";

const StyledList = styled.div`
  background-color: ${colors.gray200};
  width: 276px;
  border-radius: ${rounded.max};
  margin-right: 12px;
  padding: 10px;
`;

const ListHeading = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

interface ListProps {
  isAdding: boolean;
  list: ListData;
  onStartAdd: () => void;
  onCancel: () => void;
  onAdd: (text: string) => void;
}

export function List(props: ListProps) {
  const { list, onStartAdd, isAdding, onCancel, onAdd } = props;

  return (
    <Droppable droppableId={list.id}>
      {(provided, snapshot) => (
        <StyledList ref={provided.innerRef}>
          <ListHeading>{list.name}</ListHeading>
          {Object.values(list.cards)
            .sort((a, b) => a.index - b.index)
            .map((card) => (
              <Card card={card} key={card.id}></Card>
            ))}
          {provided.placeholder}
          {!isAdding && <AddButton onClick={onStartAdd} />}
          {isAdding && (
            <AddForm
              onStartAdd={onStartAdd}
              onAdd={onAdd}
              onCancel={onCancel}
            />
          )}
        </StyledList>
      )}
    </Droppable>
  );
}
