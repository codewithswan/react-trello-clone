import styled from 'styled-components'
import { colors, fontWeights, rounded, textSizes } from "../styles/constants";

export const HeadingInput = styled.input`
  font-size: ${textSizes.h2};
  font-weight: ${fontWeights.heading};
  border: none;
`

export const SubmitButton = styled.button`
  background-color: ${colors.gray900};
  color: ${colors.gray100};
  border-radius: ${rounded.mid};
  border: none;
  cursor: pointer;
  padding: 8px;

  &:hover {
    background-color: ${colors.gray500};
  }
`

export const IconButton = styled.button`
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
`