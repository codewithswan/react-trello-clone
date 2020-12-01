export interface Card {
  text: string;
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

export default {
  fetchBoards,
};
