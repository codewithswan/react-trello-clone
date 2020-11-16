import { v4 } from "uuid";
import { produce } from "immer";
import { positionIndexedItem } from "../../lib/positionIndexedItem";
import { BoardAction } from "../actions";
import { BoardData } from "../types";

export default function reducer(
  state: BoardData = {
    addingOnList: undefined,
    lists: {},
  },
  action: BoardAction
): BoardData {
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
