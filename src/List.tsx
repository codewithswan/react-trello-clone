import React from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { ListData } from "./data";
import { colors, rounded } from "./styles/constants";

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

interface ListProps {
  list: ListData;
}

export function List(props: ListProps) {
  const { list } = props;

  return (
    <StyledList>
      <ListHeading>{list.name}</ListHeading>
      {list.cards.map((card) => (
        <Card card={card}></Card>
      ))}
    </StyledList>
  );
}
