import React from "react";
import Modal from "react-modal";

import { Card as CardData } from "./features/api/boards";
import { H2 } from "./components/headings";

interface CardDetailProps {
  card?: CardData
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '800px',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.45)',
  }
};

export default function CardDetail(props: CardDetailProps) {
  const { card } = props

  if (!card) {
    return null
  }

  return <Modal
    isOpen
    contentLabel="Example Modal"
    style={customStyles}
  >

    <H2>{card.text}</H2>
  </Modal>;
}