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
import Modal from 'react-modal';

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
      toast.error(`🚨 ${state.error}`);
    }
  }, [state.error]);

  if (state.loading) {
    return <Spinner />;
  }

  return (
    <DragDropContext onDragEnd={(result: any) => appDispatch(actions.moveCard(result))}>
        <Modal
          isOpen
          contentLabel="Example Modal"
        >

          <h2 >Hello</h2>
          {/*<button onClick={closeModal}>close</button>*/}
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
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
              onStartEdit={(id:string) => appDispatch(actions.startEdit(id))}
              pendingCards={state.pendingCards}
            />
          ))}
      </StyledBoard>
    </DragDropContext>
  );
}
