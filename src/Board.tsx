import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { List } from "./List";

import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";
import { BoardState, actions } from "./features/boardDetails";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import BoardDetails from "./CardDetail";
import { Card } from "./features/api/boards";

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
  // const editingCard: Card | undefined = useSelector((state: BoardState) => {
  //   if (!state.editingCard) {
  //     return undefined
  //   }
  //
  //   // kort 'n manier om vinnig 'n kaart te kry, maak nie saak watter lys dit in is nie
  //   // Dalk moet ek net die actual kaart stoor op editing card
  //   return
  // })
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(actions.fetchBoards());
  }, [appDispatch]);

  useEffect(() => {
    if (state.error) {
      toast.error(`🚨 ${state.error}`);
    }
  }, [state.error]);

  if (state.loading) {
    return <Spinner />;
  }

  return (
    <DragDropContext onDragEnd={(result: any) => appDispatch(actions.moveCard(result))}>
      <BoardDetails card={state.editingCard} onClose={() => appDispatch(actions.cancelEdit())} onSave={(attributes: { text: string }) => appDispatch(actions.updateCard(attributes))} />
      <StyledBoard>
        {Object.values(state.lists)
          .sort((a, b) => a.index - b.index)
          .map(l => (
            <List
              list={l}
              key={l.id}
              onStartAdd={() => appDispatch(actions.startAdd(l.id))}
              onCancel={() => appDispatch(actions.cancelAdd())}
              onAdd={text => appDispatch(actions.createCard(text))}
              isAdding={l.id === state.addingOnList}
              onStartEdit={(card:Card) => appDispatch(actions.startEdit({...card, listId: l.id}))}
              pendingCards={state.pendingCards}
            />
          ))}
      </StyledBoard>
    </DragDropContext>
  );
}
