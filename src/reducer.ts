import { v4 } from "uuid";
import { BoardData } from "./data";
import { produce } from "immer";
import { DropResult } from "react-beautiful-dnd";

interface StartAddAction {
  type: "startAdd";
  listId: string;
}

interface AddCancel {
  type: "addCancel";
}

interface ConfirmAddAction {
  type: "confirmAdd";
  text: string;
}

interface DragEndAction {
  type: "dragEnd";
  result: DropResult;
}

type BoardAction =
  | StartAddAction
  | AddCancel
  | ConfirmAddAction
  | DragEndAction;

export function reducer(state: BoardData, action: BoardAction): BoardData {
  switch (action.type) {
    case "startAdd":
      return produce(state, (s) => {
        s.addingOnList = action.listId;
      });

    case "addCancel":
      return produce(state, (s) => {
        s.addingOnList = undefined;
      });

    case "confirmAdd": {
      const newId = v4();
      const targetList = state.lists[state.addingOnList!];
      return produce(state, (s) => {
        s.addingOnList = undefined;
        s.lists[state.addingOnList!].cards[newId] = {
          id: newId,
          text: action.text,
          index: Object.keys(targetList).length,
        };
      });
    }
  }

  return state;
}
