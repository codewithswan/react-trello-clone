import { DropResult } from "react-beautiful-dnd";

export interface CardData {
  text: string;
  id: string;
  index: number;
}

export interface ListData {
  id: string;
  cards: { [key: string]: CardData };
  name: string;
  index: number;
}

export interface BoardData {
  addingOnList: string | undefined;
  lists: { [key: string]: ListData };
}

export interface StartAddAction {
  type: "startAdd";
  listId: string;
}

export interface AddCancel {
  type: "addCancel";
}

export interface ConfirmAddAction {
  type: "confirmAdd";
  text: string;
}

export interface DragEndAction {
  type: "dragEnd";
  result: DropResult;
}

export interface FetchBoardsSuccessAction {
  type: "fetchBoards/fulfilled";
  payload: BoardData[];
}

export type BoardAction =
  | StartAddAction
  | AddCancel
  | ConfirmAddAction
  | DragEndAction
  | FetchBoardsSuccessAction;
