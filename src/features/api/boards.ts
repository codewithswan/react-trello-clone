export interface Card {
  text: string;
  description?: string
  id: string;
  index: number;
}

export interface List {
  id: string;
  cards: { [key: string]: Card };
  name: string;
  index: number;
}

export interface Board {
  id: string;
  lists: { [key: string]: List };
}

async function fetchBoards(): Promise<Board[]> {
  const result = await fetch("http://localhost:3001/boards");

  if (result.ok) {
    const boards = await result.json();
    return boards as Board[];
  } else {
    throw new Error(`We got an error ${result.status}`);
  }
}

async function createCard({
                            boardId,
                            cardText,
                            listId,
                          }: { boardId: string; cardText: string; listId: string }): Promise<Card> {
  const response = await fetch(`http://localhost:3001/boards/${boardId}/${listId}/cards`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: cardText,
    }),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`We got an error ${response.status}`);
  }
}

async function moveCard({
                          boardId,
                          sourceListId,
                          targetListId,
                          cardId,
                          targetIndex,
                        }: { boardId: string; sourceListId: string; targetListId: string; cardId: string; targetIndex: number }): Promise<any> {

  console.log('going to move card')

  const response = await fetch(`http://localhost:3001/boards/${boardId}/cards/${cardId}/position`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      targetListId, targetIndex, sourceListId,
    }),
  });

  if (response.ok) {
    return response.json();
  } else {
    console.log(response.statusText)
    throw new Error(`We got an error ${response.status}`);
  }
}

 async function updateCard({
                          boardId,
                          cardId,
                          attributes
                        }: { boardId: string; cardId: string; attributes: { text?: string; description?: string } }): Promise<any> {

  const response = await fetch(`http://localhost:3001/boards/${boardId}/cards/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attributes),
  });

  if (response.ok) {
    return response.json();
  } else {
    console.log(response.statusText)
    throw new Error(`We got an error ${response.status}`);
  }
}

export default {
  fetchBoards,
  createCard,
  moveCard,
  updateCard,
};
