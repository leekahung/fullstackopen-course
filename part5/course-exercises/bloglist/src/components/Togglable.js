import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(
  (
    { buttonLabel, closeLabel = "cancel", buttonLocation = "bottom", children },
    refs
  ) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = { display: visible ? "" : "none" };
    const hideWhenVisible = { display: visible ? "none" : "" };

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
        <button style={hideWhenVisible} onClick={toggleVisibility}>
          {buttonLabel}
        </button>
        <div style={showWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>{closeLabel}</button>
        </div>
      </>
    ) : (
      <>
        <button onClick={toggleVisibility}>
          {visible ? closeLabel : buttonLabel}
        </button>
        <div style={showWhenVisible}>{children}</div>
      </>
    );
  }
);

export default Togglable;
