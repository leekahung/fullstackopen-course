import { useState, forwardRef, useImperativeHandle } from "react";
import { StyledButton } from "./StyledComponents/Button/Button.styles";

const Togglable = forwardRef(({ buttonLabel, closeLabel = "cancel", buttonLocation = "bottom", children }, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "" : "none" };
  const showWhenVisible = { display: visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return buttonLocation === "bottom" ? (
    <>
      <div style={showWhenVisible}>
        <StyledButton onClick={toggleVisibility} variant="toggler">
          {visible ? closeLabel : buttonLabel}
        </StyledButton>
      </div>
      <div style={hideWhenVisible}>
        {children}
        <StyledButton onClick={toggleVisibility} variant="toggler">
          {closeLabel}
        </StyledButton>
      </div>
    </>
  ) : (
    <>
      <StyledButton onClick={toggleVisibility} variant="toggler">
        {visible ? closeLabel : buttonLabel}
      </StyledButton>
      <div style={hideWhenVisible}>{children}</div>
    </>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
