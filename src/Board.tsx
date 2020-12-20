import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { List } from "./List";

import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";
import { BoardState, actions } from "./features/boardDetails";
import { toast } from 'react-toastify';


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
  const state: BoardState = useSelector((state: BoardState) => state);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(actions.fetchBoards());
  }, [appDispatch]);

  useEffect(() => {
    if (state.error) {
      toast.error(`🚨 ${state.error}`)
    }
  }, [state.error])

  return (
    <DragDropContext
      onDragEnd={(result: any) => appDispatch(actions.dragEnd(result))}
    >
      <StyledBoard>
        {Object.values(state.lists)
          .sort((a, b) => a.index - b.index)
          .map((l) => (
            <List
              list={l}
              key={l.id}
              onStartAdd={() => appDispatch(actions.startAdd(l.id))}
              onCancel={() => appDispatch(actions.cancelAdd())}
              onAdd={(text) => appDispatch(actions.confirmAdd(text))}
              isAdding={l.id === state.addingOnList}
            />
          ))}
      </StyledBoard>
    </DragDropContext>
  );
}
