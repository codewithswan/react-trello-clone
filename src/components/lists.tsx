import styled from "styled-components";
import { colors, rounded, widths } from "../styles/constants";

export const StyledList = styled.div`
  background-color: ${colors.gray200};
  width: ${widths.list}px;
  border-radius: ${rounded.max};
  margin-right: 12px;
  padding: 10px;
  position: relative;
`;
