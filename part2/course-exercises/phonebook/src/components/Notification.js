const Notification = ({ notification }) => {
  const style = {
    fontSize: "20px",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    backgroundColor: "lightgrey",
  };

  return notification.message === "" ? null : (
    <div
      style={
        notification.type === "message"
          ? { ...style, color: "green", border: "2px solid green" }
          : { ...style, color: "red", border: "2px solid red" }
      }
    >
      {notification.message}
    </div>
  );
};

export default Notification;
