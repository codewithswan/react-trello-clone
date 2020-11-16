import React from "react";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { List } from "./List";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { BoardData } from "./state/types";

export const StyledBoard = styled.div`
  display: flex;
  overflow-x: scroll;
  background-color: ${colors.lightBlue};
  height: 100vh;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: flex-start;
  color: ${colors.gray900};
`;

export default function Board() {
  const dispatch = useDispatch();
  const state = useSelector((s: BoardData) => s);

  return (
    <DragDropContext
      onDragEnd={(result: any) => dispatch({ type: "dragEnd", result })}
    >
      <StyledBoard>
        {Object.values(state.lists)
          .sort((a, b) => a.index - b.index)
          .map((l) => (
            <List
              list={l}
              key={l.id}
              onStartAdd={() => dispatch({ type: "startAdd", listId: l.id })}
              onCancel={() => dispatch({ type: "addCancel" })}
              onAdd={(text) => dispatch({ type: "confirmAdd", text })}
              isAdding={l.id === state.addingOnList}
            />
          ))}
      </StyledBoard>
    </DragDropContext>
  );
}
