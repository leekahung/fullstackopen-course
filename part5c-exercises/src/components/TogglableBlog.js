import { useState, forwardRef, useImperativeHandle } from "react";

const TogglableBlog = forwardRef(
  ({ buttonLabel, closeButtonLabel, children }, refs) => {
    const [visible, setVisible] = useState(false);

    const showWhenVisible = {
      display: visible ? "" : "none",
    };

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    useImperativeHandle(refs, () => {
      return { toggleVisibility };
    });

    return (
      <>
        <button onClick={toggleVisibility}>
          {visible ? closeButtonLabel : buttonLabel}
        </button>
        <div style={showWhenVisible}>{children}</div>
      </>
    );
  }
);

TogglableBlog.displayName = "TogglableBlog";

export default TogglableBlog;
