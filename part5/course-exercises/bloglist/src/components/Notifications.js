import PropTypes from "prop-types";

const Logout = ({ handleLogout }) => {
  return (
    <button id="logout-btn" onClick={handleLogout}>
      logout
    </button>
  );
};

const Notifications = ({ notifications, userStatus, handleLogout }) => {
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
    userStatus !== ""
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
        {userStatus}{" "}
        {handleLogout ? <Logout handleLogout={handleLogout} /> : null}
      </div>
    </>
  );
};

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

Notifications.propTypes = {
  notifications: PropTypes.object.isRequired,
  userStatus: PropTypes.string.isRequired,
  handleLogout: PropTypes.func,
};

export default Notifications;
