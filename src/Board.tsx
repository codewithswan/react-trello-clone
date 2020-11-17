import React from "react";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { List } from "./List";

import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { BoardData } from "./state/types";
import { useAppDispatch } from "./state/store";

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

export function Board() {
  const state: BoardData = useSelector((state: BoardData) => state);
  const appDispatch = useAppDispatch();
  console.log("rendering ", state);

  return (
    <DragDropContext
      onDragEnd={(result: any) => appDispatch({ type: "dragEnd", result })}
    >
      <StyledBoard>
        {Object.values(state.lists)
          .sort((a, b) => a.index - b.index)
          .map((l) => (
            <List
              list={l}
              key={l.id}
              onStartAdd={() => appDispatch({ type: "startAdd", listId: l.id })}
              onCancel={() => appDispatch({ type: "addCancel" })}
              onAdd={(text) => appDispatch({ type: "confirmAdd", text })}
              isAdding={l.id === state.addingOnList}
            />
          ))}
      </StyledBoard>
    </DragDropContext>
  );
}
