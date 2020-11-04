import { v4 } from "uuid";
import { BoardData } from "./data";
import { produce } from "immer";
import { DropResult } from "react-beautiful-dnd";
import { positionIndexedItem } from "./lib/positionIndexedItem";

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
  console.log("received action ", action);

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

    case "dragEnd": {
      if (!action.result.destination) {
        return state;
      }

      const targetListId = action.result.destination.droppableId;
      const targetIndex = action.result.destination.index;

      const sourceListId = action.result.source.droppableId;
      const sourceItem =
        state.lists[sourceListId].cards[action.result.draggableId];

      return produce(state, (s) => {
        if (sourceListId !== targetListId) {
          delete s.lists[sourceListId].cards[sourceItem.id];
        }

        const updatedCards = positionIndexedItem(
          s.lists[targetListId].cards,
          sourceItem,
          targetIndex
        );

        s.lists[targetListId].cards = updatedCards;
      });
    }
  }

  return state;
}
