import React from "react";
import styled from "styled-components";
import { Board } from "./Board";
import { colors, rounded } from "./styles/constants";

// const StyledConfirmContainer = styled.div`
//   display: flex;
// `;

// const StyledAddConfirmButton = styled.div`
//   background-color: ${colors.gray900};
//   color: ${colors.gray100};
//   border-radius: ${rounded.mid};
//   cursor: pointer;
//   padding: 8px;

//   &:hover {
//     background-color: ${colors.gray500};
//   }
// `;

// const StyledCancelAddButton = styled.div`
//   cursor: pointer;
//   color: ${colors.gray500};

//   :hover {
//     color: ${colors.gray900};
//   }
// `;

// const StyledAddTextArea = styled.textarea`
//   border: none;
//   outline: none;
//   resize: vertical;
//   width: 100%;
//   height: 80px;
//   font-size: 15px;
// `;

// function AddForm() {
//   return (
//     <div>
//       <StyledCard>
//         <StyledAddTextArea placeholder="Enter some text for this card"></StyledAddTextArea>
//       </StyledCard>

//       <StyledConfirmContainer>
//         <StyledAddConfirmButton>Add Card</StyledAddConfirmButton>
//         <StyledCancelAddButton>
//           <i className="icofont-close-line icofont-2x"></i>
//         </StyledCancelAddButton>
//       </StyledConfirmContainer>
//     </div>
//   );
// }

function App() {
  return <Board />;
}

export default App;
