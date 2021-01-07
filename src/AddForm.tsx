import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { StyledCard } from "./Card";
import { SubmitButton } from "./components/forms";

const StyledConfirmContainer = styled.div`
  display: flex;
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

interface AddFormProps {
  onAdd: (text: string) => void;
  onCancel: () => void;
  onStartAdd: () => void;
}

export function AddForm(props: AddFormProps) {
  const { onAdd, onCancel } = props;

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleAddConfirm = useCallback(() => {
    const value = (textRef?.current?.value || "").trim();
    if (!value) {
      return;
    }

    onAdd(value);

    if (textRef?.current) {
      textRef.current.value = "";
    }
  }, [textRef, onAdd]);

  return (
    <div>
      <StyledCard>
        <StyledAddTextArea
          ref={textRef}
          placeholder="Enter some text for this card"
        ></StyledAddTextArea>
      </StyledCard>

      <StyledConfirmContainer>
        <SubmitButton onClick={handleAddConfirm}>
          Add Card
        </SubmitButton>
        <StyledCancelAddButton onClick={onCancel}>
          <i className="icofont-close-line icofont-2x"></i>
        </StyledCancelAddButton>
      </StyledConfirmContainer>
    </div>
  );
}
