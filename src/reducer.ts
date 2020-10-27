import { v4 } from "uuid";
import { BoardData } from "./data";
import { produce } from "immer";

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

type BoardAction = StartAddAction | AddCancel | ConfirmAddAction;

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

      return produce(state, (s) => {
        s.addingOnList = undefined;
        s.lists[state.addingOnList!].cards[newId] = {
          id: newId,
          text: action.text,
        };
      });
    }
  }
}
