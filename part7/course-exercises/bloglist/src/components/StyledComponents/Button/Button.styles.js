import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 5px 15px;
  margin: ${(props) => (props.variant === "toggler" ? "2px 10px" : 0)};
  border-radius: 15px;
  border-style: none;
  cursor: pointer;
  &:active {
    background-color: rgb(255, 255, 255);
  }
`;
