import React from "react";
import styled from "styled-components";
import { colors, rounded } from "./styles/constants";

const StyledAddButton = styled.div`
  padding: 10px 5px 10px 5px;
  margin-top: 16px;
  font-size: 18px;
  color: ${colors.gray500};
  width: 100%;
  text-align: left;
  border: none;
  cursor: pointer;
  border-radius: ${rounded.mid};

  :hover {
    background-color: ${colors.gray300};
  }
`;

export const AddButton = ({ onClick }: { onClick: () => void }) => (
  <StyledAddButton onClick={onClick}>
    <i className="icofont-plus icofont-1x"></i> Add a card
  </StyledAddButton>
);
