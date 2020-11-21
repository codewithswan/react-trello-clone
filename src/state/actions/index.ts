import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BoardData } from "../types";

export const fetchBoards = createAsyncThunk("fetchBoards", async (thunkAPI) => {
  const result = await fetch("http://localhost:3001/boards");

  if (result.ok) {
    const json = await result.json();
    return json;
  } else {
    console.error("We got an error!", result.status);
  }
});
