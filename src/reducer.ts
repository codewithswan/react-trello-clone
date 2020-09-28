import { BoardData } from "./data";

interface StartAddAction {
  type: "startAdd";
  listId: string;
}

interface AddCancel {
  type: "addCancel";
}

type BoardAction = StartAddAction | AddCancel;

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
  }
}
