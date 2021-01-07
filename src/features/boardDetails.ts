import {  createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";

import boardsApi, { Board, Card } from "./api/boards";
import { positionIndexedItem } from "../lib/positionIndexedItem";

export interface BoardState extends Board {
  addingOnList?: string;
  error?: string;
  loading: boolean;
  pendingCards: {
    [key: string]: boolean
  }
  editingCard?: Card & { listId: string}
}

const initialState: BoardState = {
  lists: {},
  loading: false,
  id: "",
  pendingCards: {}
};

export const fetchBoards = createAsyncThunk("boards/fetch", boardsApi.fetchBoards);

export const createCard = createAsyncThunk("cards/create", (text: string, { getState }) => {
  const { addingOnList, id } = getState() as BoardState;
  return boardsApi.createCard({
    boardId: id,
    cardText: text,
    listId: addingOnList!,
  });
});

export const moveCard = createAsyncThunk("cards/move", (dropResult: DropResult, { getState }) => {
  if (!dropResult.destination) {
    return;
  }


  const { id } = getState() as BoardState;
  const targetListId = dropResult.destination.droppableId;
  const targetIndex = dropResult.destination.index;
  const sourceListId = dropResult.source.droppableId;

  return boardsApi.moveCard({
    cardId: dropResult.draggableId,
    boardId: id,
    sourceListId,
    targetIndex,
    targetListId,
  });
});

export const updateCard = createAsyncThunk("cards/update", (attributes : { text?: string, description?: string }, { getState }) => {
  const { editingCard, id } = getState() as BoardState;
  if (!editingCard){
    return
  }


  return boardsApi.updateCard({
    boardId: id,
    cardId: editingCard?.id,
    attributes,
  });
});

export const archiveCard = createAsyncThunk("cards/archive", (_, { getState }) => {
  const { editingCard, id } = getState() as BoardState;
  if (!editingCard){
    return
  }


  return boardsApi.archiveCard({ cardId: editingCard.id, boardId: id });
});

const boardDetailsSlice = createSlice({
  name: "boardDetails",
  initialState,
  reducers: {
    startAdd(state, action: PayloadAction<string>) {
      state.addingOnList = action.payload;
    },
    cancelAdd(state) {
      state.addingOnList = undefined;
    },
    startEdit(state, action: PayloadAction<Card & { listId: string }>) {
      state.editingCard = action.payload;
      state.addingOnList = undefined;
    },
    cancelEdit(state) {
      state.editingCard = undefined
    }
  },
  extraReducers: {
    [fetchBoards.fulfilled.toString()]: (state, action: PayloadAction<Board[]>) => {
      const [defaultBoard] = action.payload;
      state.lists = defaultBoard.lists;
      state.id = defaultBoard.id;
      state.loading = false;
    },
    [fetchBoards.rejected.toString()]: (state, action: PayloadAction<string>) => {
      state.error = "Error while loading board data";
      state.loading = false;
    },
    [fetchBoards.pending.toString()]: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },

    [createCard.fulfilled.toString()]: (state, action: PayloadAction<Card>) => {
      state.lists[state.addingOnList!].cards[action.payload.id] = action.payload;
      state.loading = false;
    },
    [createCard.rejected.toString()]: (state, action: PayloadAction<string>) => {
      state.error = "Error while saving card";
    },

    [moveCard.fulfilled.toString()]: (state, action: { meta: { arg: DropResult }}) => {
      delete state.pendingCards[action.meta.arg.draggableId]
    },
    [moveCard.rejected.toString()]: (state, action: { meta: { arg: DropResult }}) => {
      state.error = "Error while moving card";
      delete state.pendingCards[action.meta.arg.draggableId]
    },
    [moveCard.pending.toString()]: (state, action: { meta: {arg: DropResult}}) => {
      const dropResult = action.meta.arg

      if (!dropResult.destination) {
        return
      }

      const targetListId = dropResult.destination.droppableId;
      const targetIndex = dropResult.destination.index;

      const sourceListId = dropResult.source.droppableId;
      const sourceItem = state.lists[sourceListId].cards[dropResult.draggableId];

      if (sourceListId !== targetListId) {
        delete state.lists[sourceListId].cards[sourceItem.id];
      }

      const updatedCards = positionIndexedItem(state.lists[targetListId].cards, sourceItem, targetIndex);

      state.lists[targetListId].cards = updatedCards;
      state.pendingCards[sourceItem.id] = true
    },

    [updateCard.fulfilled.toString()]: (state, action: { meta: {arg: { text?: string, description?: string }}}) => {
      if (!state.editingCard) {
        return
      }

      const { text, description } = action.meta.arg

      const card = state.lists[state.editingCard.listId].cards[state.editingCard.id]

      if (text) {
        card.text = text
      }

      if (description) {
        card.description = description
      }
    },


    [archiveCard.fulfilled.toString()]: (state) => {
      if (!state.editingCard) {
        return
      }

      delete state.lists[state.editingCard.listId].cards[state.editingCard.id]
      state.editingCard = undefined
    }
  },
});

export const actions = { ...boardDetailsSlice.actions, fetchBoards, createCard, moveCard, updateCard, archiveCard };

export default boardDetailsSlice.reducer;
