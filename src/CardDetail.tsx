import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";

import { Card as CardData } from "./features/api/boards";
import { HeadingInput } from "./components/forms";
import styled from "styled-components";
import { colors } from "./styles/constants";

interface CardDetailProps {
  card?: CardData
  onSave: (attributes: { text: string }) => void
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
    <StyledCloseButton >
      <i className="icofont-close-line icofont-2x" onClick={onClose}></i>
    </StyledCloseButton>


    <HeadingInput value={cardText} onChange={e => setCardText(e.target.value)} onBlur={handleCardTextBlur} />
  </Modal>;
}