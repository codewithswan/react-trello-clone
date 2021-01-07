import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors, rounded } from "./styles/constants";
import { SubmitButton } from "./components/forms";

const StyledTextArea = styled.textarea`
  border: 1px solid ${colors.gray300};
  width: 100%;
  height: 80px;
  font-size: 15px;
`;

const StyledCloseButton = styled.button`
  color: ${colors.gray500};
  border: none;
  background: none;

  :hover {
    color: ${colors.gray900};
  }
`;

const DescriptionLabel = styled.div`
  cursor: pointer;
  background-color: ${colors.gray200};
  border-radius: ${rounded.mid};
  padding: 20px;
  padding-bottom: 50px;
`

export interface DescriptionEditProps {
  description?: string
  onSubmit: (description: string ) => void
}

export function DescriptionEdit(props: DescriptionEditProps) {
  const { description: descriptionProp, onSubmit } = props
  const [editingDescription, setEditingDescription ] = useState(false)

  useEffect(() => {
    setDescription(descriptionProp)
  }, [descriptionProp])

  const [description, setDescription] = useState(descriptionProp)

  if (editingDescription) {
    return (
      <>
        <StyledTextArea onChange={(e) => setDescription(e.target.value)} value={description} />
        <SubmitButton onClick={() => {
          onSubmit(description || '');
          setEditingDescription(false)
        }}>Save</SubmitButton>
        <StyledCloseButton >
          <i className="icofont-close-line icofont-2x" onClick={() => setEditingDescription(false)}></i>
        </StyledCloseButton>
      </>
    )
  }

  return (<DescriptionLabel onClick={() => setEditingDescription(true)}>{description ? description : "Add a description..."}</DescriptionLabel>)
}