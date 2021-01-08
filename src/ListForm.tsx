import React, { useState } from "react";
import styled from "styled-components";
import { colors, widths } from "./styles/constants";
import { IconButton, SubmitButton } from "./components/forms";
import { StyledList } from "./components/lists";

const StyledCloseButton = styled.button`
  color: ${colors.gray500};
  border: none;
  background: none;

  :hover {
    color: ${colors.gray900};
  }
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
`;

export interface ListFormProps {
  onSubmit: (name: string) => void;
  onCancel: () => void;
  showForm: boolean;
  startAdd: () => void;
}

export function ListForm(props: ListFormProps) {
  const { onSubmit, onCancel, showForm, startAdd } = props;
  const [name, setName] = useState("");

  if (!showForm) {
    return (
      <IconButton onClick={startAdd} width={`${widths.list}px`} backgroundColor={"rgba(255,255,255,.4)"} marginTop="0px">
        <i className="icofont-plus icofont-1x"></i> Add a list
      </IconButton>
    );
  }

  return (
    <StyledList>
      <StyledInput type="text" value={name} onChange={e => setName(e.target.value)} />
      <SubmitButton
        onClick={() => {
          if (!name || !name.length) {
            return;
          }
          onSubmit(name || "");
        }}
      >
        Save
      </SubmitButton>
      <StyledCloseButton>
        <i className="icofont-close-line icofont-2x" onClick={onCancel}></i>
      </StyledCloseButton>
    </StyledList>
  );
}
