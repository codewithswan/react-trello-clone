import React from "react";
import styled from "styled-components";
import { AddForm } from "./AddForm";
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
      {Object.values(list.cards).map((card) => (
        <Card card={card} key={card.id}></Card>
      ))}
      <AddForm />
    </StyledList>
  );
}
