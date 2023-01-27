import styled from "styled-components";

export const StyledForm = styled.form`
  padding: ${(props) => (props.variant === "comments" ? 0 : "10px")};
  width: 300px;
  div {
    position: relative;
    display: flex;
    width: 300px;
    margin: 5px 0;
    label {
      width: 100px;
    }
    input {
      width: 200px;
      margin: ${(props) => (props.variant === "comments" ? "10px 0" : 0)};
    }
  }
`;
