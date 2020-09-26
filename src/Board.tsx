import React from "react";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { List } from "./List";

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
  return (
    <StyledBoard>
      <List
        list={{
          name: "To do",
          cards: [
            {
              text: "hello 1",
            },
            {
              text: "hello 2",
            },
          ],
        }}
      />
    </StyledBoard>
  );
}
