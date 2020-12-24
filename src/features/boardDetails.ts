import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";

import boardsApi, { Board, Card } from "./api/boards";
import { positionIndexedItem } from "../lib/positionIndexedItem";

export interface BoardState extends Board {
  addingOnList?: string;
  error?: string;
  loading: boolean;
}

const initialState: BoardState = {
  lists: {},
  loading: false,
  id: "",
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
    dragEnd(state, action: PayloadAction<DropResult>) {
      if (!action.payload.destination) {
        return state;
      }

      const targetListId = action.payload.destination.droppableId;
      const targetIndex = action.payload.destination.index;

      const sourceListId = action.payload.source.droppableId;
      const sourceItem = state.lists[sourceListId].cards[action.payload.draggableId];

      if (sourceListId !== targetListId) {
        delete state.lists[sourceListId].cards[sourceItem.id];
      }

      const updatedCards = positionIndexedItem(state.lists[targetListId].cards, sourceItem, targetIndex);

      state.lists[targetListId].cards = updatedCards;
    },
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
      state.addingOnList = undefined;
      state.loading = false;
    },
    [createCard.rejected.toString()]: (state, action: PayloadAction<string>) => {
      state.error = "Error while saving card";
      state.loading = false;
    },
    [createCard.pending.toString()]: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
  },
});

export const actions = { ...boardDetailsSlice.actions, fetchBoards, createCard };

export default boardDetailsSlice.reducer;
