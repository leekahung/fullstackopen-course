import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef(
  (
    { buttonLabel, closeLabel = "cancel", buttonLocation = "bottom", children },
    refs
  ) => {
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
        <div style={{ ...showWhenVisible, padding: "10px 0 0" }}>
          <button onClick={toggleVisibility}>
            {visible ? closeLabel : buttonLabel}
          </button>
        </div>
        <div style={hideWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>{closeLabel}</button>
        </div>
      </>
    ) : (
      <>
        <button onClick={toggleVisibility}>
          {visible ? closeLabel : buttonLabel}
        </button>
        <div style={hideWhenVisible}>{children}</div>
      </>
    );
  }
);

Togglable.displayName = "Togglable";

export default Togglable;
