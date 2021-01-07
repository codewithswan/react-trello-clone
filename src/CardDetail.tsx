import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";

import { Card as CardData } from "./features/api/boards";
import { HeadingInput } from "./components/forms";
import styled from "styled-components";
import { colors } from "./styles/constants";
import { H3 } from "./components/headings";
import { DescriptionEdit } from "./DescriptionEdit";

interface CardDetailProps {
  card?: CardData
  onSave: (attributes: { text?: string; description?: string }) => void
  onClose: () => void
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.45)",
  },
};

const StyledCloseButton = styled.button`
  cursor: pointer;
  color: ${colors.gray500};
  border: none;
  background: none;
  position: absolute;
  right: 10px;
  top: 10px;

  :hover {
    color: ${colors.gray900};
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const RightContainer = styled.div`
  width: 150px;
  margin-left: 30px;
`

const LeftContainer = styled.div`
  flex: 1;
`

export default function CardDetail(props: CardDetailProps) {
  const { card, onSave, onClose } = props;

  const [cardText, setCardText] = useState(card?.text);
  useEffect(() => {
    if (!card) {
      return;
    }

    setCardText(card?.text);
  }, [card]);

  const handleCardTextBlur = useCallback(() => {
    if (!cardText) {
      return;
    }

    onSave({ text: cardText });
  }, [cardText, onSave]);


  if (!card) {
    return null;
  }


  return <Modal
    isOpen
    contentLabel="Example Modal"
    style={customStyles}
  >
    <div>

    </div>
    <StyledCloseButton >
      <i className="icofont-close-line icofont-2x" onClick={onClose}></i>
    </StyledCloseButton>

    <HeadingInput value={cardText} onChange={e => setCardText(e.target.value)} onBlur={handleCardTextBlur} />

    <ContentContainer>
      <LeftContainer>
        <H3>Description</H3>
        <DescriptionEdit onSubmit={(description) => onSave({ description })} description={card.description}  />
      </LeftContainer>
      <RightContainer>
        <H3>Actions</H3>
      </RightContainer>
    </ContentContainer>
  </Modal>;
}