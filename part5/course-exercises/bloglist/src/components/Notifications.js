const Logout = ({ handleLogout }) => {
  return <button onClick={handleLogout}>logout</button>;
};

const Notifications = ({ notifications, userNotifications, handleLogout }) => {
  const style =
    notifications !== ""
      ? {
          fontSize: "20px",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "lightgrey",
          color: "green",
          border: "2px solid green",
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
      <div style={style}>{notifications}</div>
      <div style={styleUser}>
        {userNotifications}{" "}
        {handleLogout ? <Logout handleLogout={handleLogout} /> : null}
      </div>
    </>
  );
};

export default Notifications;
