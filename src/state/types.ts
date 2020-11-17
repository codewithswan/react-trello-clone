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
