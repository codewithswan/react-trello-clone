import { DropResult } from "react-beautiful-dnd";

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

export type BoardAction =
  | StartAddAction
  | AddCancel
  | ConfirmAddAction
  | DragEndAction;
