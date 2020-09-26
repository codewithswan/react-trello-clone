import React from "react";
import styled from "styled-components";
import { colors, rounded } from "./styles/constants";

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

const StyledList = styled.div`
  background-color: ${colors.gray200};
  width: 276px;
  border-radius: ${rounded.max};
  margin-right: 12px;
  padding: 10px;
`;

const ListHeading = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const StyledCard = styled.div`
  background-color: ${colors.white};
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.4);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: ${rounded.mid};
`;

function App() {
  return (
    <StyledBoard>
      <StyledList>
        <ListHeading>To do</ListHeading>

        <StyledCard>Hello 1</StyledCard>
        <StyledCard>Hello 2</StyledCard>
        <StyledCard>Hello 3</StyledCard>
      </StyledList>
      <StyledList>
        <ListHeading>In Progress</ListHeading>

        <StyledCard>Hello 3</StyledCard>
      </StyledList>
    </StyledBoard>
  );
}

export default App;
