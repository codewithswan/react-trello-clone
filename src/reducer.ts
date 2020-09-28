import { v4 } from "uuid";
import { BoardData } from "./data";

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
      return {
        ...state,
        addingOnList: action.listId,
      };

    case "addCancel":
      return {
        ...state,
        addingOnList: undefined,
      };
    case "confirmAdd": {
      const newId = v4();
      const targetList = state.lists[state.addingOnList!];

      return {
        ...state,
        lists: {
          ...state.lists,
          [targetList.id]: {
            ...targetList,
            cards: {
              ...targetList.cards,
              [newId]: {
                id: newId,
                text: action.text,
              },
            },
          },
        },
      };
    }
  }
}
