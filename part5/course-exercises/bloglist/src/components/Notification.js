const Notification = ({ notification }) => {
  const style =
    notification !== ""
      ? {
          paddingBottom: "10px",
        }
      : {};

  return <div style={style}>{notification}</div>;
};

export default Notification;
