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

const StyledConfirmContainer = styled.div`
  display: flex;
`;

const StyledAddConfirmButton = styled.div`
  background-color: ${colors.gray900};
  color: ${colors.gray100};
  border-radius: ${rounded.mid};
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: ${colors.gray500};
  }
`;

const StyledCancelAddButton = styled.div`
  cursor: pointer;
  color: ${colors.gray500};

  :hover {
    color: ${colors.gray900};
  }
`;

const StyledAddTextArea = styled.textarea`
  border: none;
  outline: none;
  resize: vertical;
  width: 100%;
  height: 80px;
  font-size: 15px;
`;

function AddForm() {
  return (
    <div>
      <StyledCard>
        <StyledAddTextArea placeholder="Enter some text for this card"></StyledAddTextArea>
      </StyledCard>

      <StyledConfirmContainer>
        <StyledAddConfirmButton>Add Card</StyledAddConfirmButton>
        <StyledCancelAddButton>
          <i className="icofont-close-line icofont-2x"></i>
        </StyledCancelAddButton>
      </StyledConfirmContainer>
    </div>
  );
}

function App() {
  return (
    <StyledBoard>
      <StyledList>
        <ListHeading>To do</ListHeading>

        <StyledCard>Hello 1</StyledCard>
        <StyledCard>Hello 2</StyledCard>
        <StyledCard>Hello 3</StyledCard>

        <AddForm />
      </StyledList>
      <StyledList>
        <ListHeading>In Progress</ListHeading>

        <StyledCard>Hello 3</StyledCard>

        <AddForm />
      </StyledList>
    </StyledBoard>
  );
}

export default App;
