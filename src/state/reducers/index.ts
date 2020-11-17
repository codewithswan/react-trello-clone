import { v4 } from "uuid";
import { produce } from "immer";
import { DropResult } from "react-beautiful-dnd";
import { positionIndexedItem } from "../../lib/positionIndexedItem";
import { BoardData } from "../types";

const listId1 = v4();
const listId2 = v4();
const listId3 = v4();

const cardId1 = v4();
const cardId2 = v4();
const cardId3 = v4();
const cardId4 = v4();

const initialData = {
  lists: {
    [listId1]: {
      id: listId1,
      name: "To Do",
      cards: {
        [cardId1]: { id: cardId1, text: "Build the UI", index: 0 },
        [cardId4]: { id: cardId4, text: "Deploy with CI/CD", index: 1 },
      },
      index: 0,
    },
    [listId2]: {
      id: listId2,
      name: "In Progress",
      cards: { [cardId2]: { id: cardId2, text: "Build the API", index: 0 } },
      index: 1,
    },
    [listId3]: {
      id: listId3,
      name: "Done",
      cards: { [cardId3]: { id: cardId3, text: "Set up the DB", index: 0 } },
      index: 2,
    },
  },
} as BoardData;

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

export default function reducer(
  state: BoardData = initialData,
  action: BoardAction
): BoardData {
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
