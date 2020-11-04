import { v4 } from "uuid";

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

const listId1 = v4();
const listId2 = v4();
const listId3 = v4();

const cardId1 = v4();
const cardId2 = v4();
const cardId3 = v4();
const cardId4 = v4();

export default {
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
