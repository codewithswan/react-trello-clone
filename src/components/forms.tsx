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

export const IconButton = styled.button<{ width?: string, backgroundColor?: string, marginTop?: string }>`
  padding: 10px 5px 10px 5px;
  margin-top: ${props => props.marginTop ?? '16px'}px;
  font-size: 18px;
  color: ${colors.gray500};
  width: ${(props) => props.width ?? '100%'};
  background-color: ${(props) => props.backgroundColor ?? 'inherit'};
  text-align: left;
  border: none;
  cursor: pointer;
  border-radius: ${rounded.mid};

  :hover {
    background-color: ${colors.gray300};
  }
`