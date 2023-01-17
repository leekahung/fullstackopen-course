const Logout = ({ handleLogout }) => {
  return <button onClick={handleLogout}>logout</button>;
};

const Notifications = ({ notifications, userNotifications, handleLogout }) => {
  const style =
    notifications.message !== ""
      ? {
          fontSize: "20px",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "lightgrey",
          borderRadius: "5px",
        }
      : { display: "none" };

  const styleUser =
    userNotifications !== ""
      ? {
          paddingBottom: "10px",
        }
      : { display: "none" };

  return (
    <>
      <div
        style={
          notifications.type === "error"
            ? { ...style, color: "red", border: "2px solid red" }
            : { ...style, color: "green", border: "2px solid green" }
        }
      >
        {notifications.message}
      </div>
      <div style={styleUser}>
        {userNotifications}{" "}
        {handleLogout ? <Logout handleLogout={handleLogout} /> : null}
      </div>
    </>
  );
};

export default Notifications;
