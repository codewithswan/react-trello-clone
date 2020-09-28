import React, { useReducer } from "react";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { List } from "./List";
import data from "./data";
import { reducer } from "./reducer";

export const StyledBoard = styled.div`
  display: flex;
  overflow-x: scroll;
  background-color: ${colors.lightBlue};
  height: 100vh;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: flex-start;
  color: ${colors.gray900};
`;

export function Board() {
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <StyledBoard>
      {Object.values(state.lists).map((l) => (
        <List
          list={l}
          key={l.id}
          onStartAdd={() => dispatch({ type: "startAdd", listId: l.id })}
          onCancel={() => dispatch({ type: "addCancel" })}
          isAdding={l.id === state.addingOnList}
        />
      ))}
    </StyledBoard>
  );
}
